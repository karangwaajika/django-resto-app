from django.http import HttpResponse, JsonResponse
from django.core import serializers
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework import status
from .models import *
from product.models import *
from product.serializers import *
from .serializers import *
from user.models import *
from user.serializers import *
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import datetime
import pytz
from .operation import *
from django.db.models import Q, F, Case, When, CharField, Value
from django.db.models.aggregates import Sum, Count
from django.db.models.functions import Concat


# Create your views here.
@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_last_order(request):
    last_order = Order.objects.last()
    if last_order:
        return Response(
            {
                "success": True,
                "message": "Service App here!",
                "data": {"order_id": last_order.id + 1},
            }
        )
    return Response(
        {"success": True, "message": "Service App here!", "data": {"order_id": 1}}
    )


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def record_order(request):
    order_details = request.data
    order_id, order_type, customer_name, beverages, meals, teas = order_details.values()
    user = request.user
    dt_now = datetime.datetime.now(tz=pytz.UTC)
    date_today = dt_now.astimezone(pytz.timezone("Africa/Kigali"))

    # insert order
    add_order = Order.objects.create(
        employee=user,
        customer_name=customer_name,
        order_type=order_type,
        date_time=date_today,
        sold_date=date_today,
    )

    order = Order.objects.last()
    if len(beverages) > 0:
        for drink in beverages:
            beverage = Beverage.objects.get(pk=drink.get("beverageId"))

            if drink.get("beverageQty") > drink.get("beverageStockQty"):
                return Response(
                    {
                        "success": False,
                        "message": "The stock is not enough !!!",
                    }
                )

            # update stock
            operate = BeverageOperation(
                beverage=beverage,
                openQty=drink.get("beverageStockQty"),
                soldQty=drink.get("beverageQty"),
            )
            operate.update_beverage_stock()

            # insert beverage
            BeverageOrder.objects.create(
                beverage=beverage,
                order=order,
                open_qty=drink.get("beverageStockQty"),
                left_qty=drink.get("beverageStockQty") - drink.get("beverageQty"),
                sold_qty=drink.get("beverageQty"),
                price=drink.get("beveragePrice"),
                total_beverage=drink.get("beverageQty") * drink.get("beveragePrice"),
                sold_date=date_today,
            )

    if len(meals):
        for item in meals:
            meal = Meal.objects.get(pk=item.get("mealId"))

            # insert meal
            MealOrder.objects.create(
                meal=meal,
                order=order,
                plate_nbr=item.get("mealQty"),
                price=item.get("mealPrice"),
                total_meal=item.get("mealPrice") * item.get("mealQty"),
                sold_date=date_today,
            )

    if len(teas):
        for item in teas:
            tea = Tea.objects.get(pk=item.get("teaId"))

            # insert tea
            TeaOrder.objects.create(
                tea=tea,
                order=order,
                qty=item.get("teaQty"),
                price=item.get("teaPrice"),
                total_tea=item.get("teaPrice") * item.get("teaQty"),
                sold_date=date_today,
            )

    return Response(
        {
            "success": True,
            "message": "Order recorded successfully",
        }
    )


@api_view(["GET", "POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def view_orders(request):
    employee_fullname = Concat(
        "employee__first_name",
        Value(" "),
        "employee__last_name",
        output_field=CharField(),
    )
    sum_tea = Sum("order_teas__total_tea", default=0)
    sum_beverage = Sum("order_beverages__total_beverage", default=0)
    sum_meal = Sum("order_meals__total_meal", default=0)

    if request.method == "POST":
        # search inside order table and all items tables such as beverage, tea, and meal.
        search_fields = (
            Q(employee__first_name__icontains=request.data["search"])
            | Q(employee__last_name__icontains=request.data["search"])
            | Q(id__icontains=request.data["search"])
            | Q(customer_name__icontains=request.data["search"])
            | Q(order_teas__tea__name__icontains=request.data["search"])
            | Q(order_beverages__beverage__name__icontains=request.data["search"])
            | Q(order_meals__meal__name__icontains=request.data["search"])
        )
        orders = (
            Order.objects.all().order_by("-id")
            .filter(search_fields)
            .annotate(
                employee_fullname=employee_fullname,
                total_tea=sum_tea,
                total_meal=sum_meal,
                total_beverage=sum_beverage,
                overall_total=F("total_tea") + F("total_meal") + F("total_beverage"),
                amount_paid=F("cash") + F("momo"),
                amount_to_pay=Case(
                    When(
                        overall_total__gt=F("amount_paid"),
                        then=F("overall_total") - F("amount_paid"),
                    ),
                    default=F("overall_total"),
                ),
            )
        )

        serializer = OrderSerializer(orders, many=True)
        return Response({"success": True, "data": serializer.data})

    orders = Order.objects.all().order_by("-id").annotate(
        employee_fullname=employee_fullname,
        total_tea=sum_tea,
        total_meal=sum_meal,
        total_beverage=sum_beverage,
        overall_total=F("total_tea") + F("total_meal") + F("total_beverage"),
        amount_paid=F("cash") + F("momo"),
        amount_to_pay=Case(
            When(
                overall_total__gt=F("amount_paid"),
                then=F("overall_total") - F("amount_paid"),
            ),
            default=F("overall_total"),
        ),
    )

    serializer = OrderSerializer(orders, many=True)

    return Response({"success": True, "data": serializer.data})
