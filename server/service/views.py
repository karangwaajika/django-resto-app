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
from django.db.models.aggregates import Count, Sum
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
    Order.objects.create(
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
            # insert beverage total
            BeverageOrderTotal.objects.create(
                beverage=beverage,
                order=order,
                total_qty=drink.get("beverageQty"),
                sold_price=drink.get("beveragePrice"),
                total_amount=drink.get("beverageQty") * drink.get("beveragePrice"),
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
            # insert meal total
            MealOrderTotal.objects.create(
                meal=meal,
                order=order,
                total_qty=item.get("mealQty"),
                total_amount=item.get("mealPrice") * item.get("mealQty"),
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
            # insert tea total
            TeaOrderTotal.objects.create(
                tea=tea,
                order=order,
                total_qty=item.get("teaQty"),
                total_amount=item.get("teaPrice") * item.get("teaQty"),
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

    if request.method == "POST" and request.data["search"]:
        # search inside order table and all items tables such as beverage, tea, and meal.
        search_fields = (
            Q(employee__first_name__icontains=request.data["search"])
            | Q(employee__last_name__icontains=request.data["search"])
            | Q(id__icontains=request.data["search"])
            | Q(customer_name__icontains=request.data["search"])
        )
        orders = (
            Order.objects.filter(search_fields)
            .order_by("-id")
            .prefetch_related(
                "order_teas_total",
                "order_beverages_total",
                "order_meals_total",
                "employee",
            )
            .annotate(
                employee_fullname=employee_fullname,
            )
        )

        serializer = OrderSerializer(orders, many=True)
        return Response({"success": True, "data": serializer.data})

    orders = (
        Order.objects.all()
        .order_by("-id")
        .prefetch_related(
            "order_teas_total", "order_beverages_total", "order_meals_total"
        )
        .annotate(
            employee_fullname=employee_fullname,
        )
    )

    serializer = OrderSerializer(orders, many=True)

    return Response({"success": True, "data": serializer.data})


@api_view(["GET", "POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def approve_bill(request, order_id):
    if request.method == "POST":
        cash, momo, customer_name, comment = request.data.values()

        order = Order.objects.get(pk=order_id)

        order.cash += int(cash)
        order.momo += int(momo)

        if cash == 0 and momo == 0:
            return Response(
                {
                    "success": True,
                    "message": "Comment's recorded successfuly",
                }
            )

        if order.cash + order.momo < order.overall_total:
            order.customer_name = customer_name
            order.comment = comment
            order.save()

            return Response(
                {
                    "success": False,
                    "message": "Paid but Still in debt",
                }
            )
        if order.cash + order.momo > order.overall_total:
            return Response(
                {
                    "success": False,
                    "message": "Amount is greater than expected",
                }
            )
        order.customer_name = customer_name
        order.comment = comment
        order.is_paid = True
        order.save()

        return Response(
            {
                "success": True,
                "message": "Approved Payment Successfuly",
            }
        )
    employee_fullname = Concat(
        "employee__first_name",
        Value(" "),
        "employee__last_name",
        output_field=CharField(),
    )

    order = (
        Order.objects.prefetch_related(
            "order_teas", "order_beverages", "order_meals", "employee"
        )
        .annotate(
            employee_fullname=employee_fullname,
        )
        .get(pk=order_id)
    )

    order_serializer = OrderSerializer(order)

    return Response(
        {
            "success": True,
            "data": order_serializer.data,
        }
    )


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def reorder(request):
    order_details = request.data
    order_id, order_type, customer_name, beverages, meals, teas = order_details.values()
    user = request.user
    dt_now = datetime.datetime.now(tz=pytz.UTC)
    date_today = dt_now.astimezone(pytz.timezone("Africa/Kigali"))

    # update order
    order = Order.objects.get(pk=order_id)
    order.employee = user
    order.customer_name = customer_name
    order.order_type = order_type

    order.save()

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

            # check if it is a new beverage order
            try:
                beverage_order = BeverageOrder.objects.filter(
                    order=order, beverage=beverage
                )[:1]
                beverage_order_total = BeverageOrderTotal.objects.get(
                    order=order, beverage=beverage
                )
                beverage_order_total.total_qty += drink.get("beverageQty")
                beverage_order_total.total_amount += drink.get(
                    "beverageQty"
                ) * drink.get("beveragePrice")
                beverage_order_total.save()

            except BeverageOrder.DoesNotExist:

                # insert beverage total
                BeverageOrderTotal.objects.create(
                    beverage=beverage,
                    order=order,
                    total_qty=drink.get("beverageQty"),
                    sold_price=drink.get("beveragePrice"),
                    total_amount=drink.get("beverageQty") * drink.get("beveragePrice"),
                )
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

            # check if it is a new meal order
            try:
                meal_order = MealOrder.objects.filter(order=order, meal=meal)[:1]
                meal_order_total = MealOrderTotal.objects.get(order=order, meal=meal)
                meal_order_total.total_qty += item.get("mealQty")
                meal_order_total.total_amount += item.get("mealQty") * item.get(
                    "mealPrice"
                )
                meal_order_total.save()

            except MealOrder.DoesNotExist:

                # insert meal total
                MealOrderTotal.objects.create(
                    meal=meal,
                    order=order,
                    total_qty=item.get("mealQty"),
                    total_amount=item.get("mealQty") * item.get("mealPrice"),
                )
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

            # check if it is a new tea order
            try:
                tea_order = TeaOrder.objects.filter(order=order, tea=tea)[:1]
                tea_order_total = TeaOrderTotal.objects.get(order=order, tea=tea)
                tea_order_total.total_qty += item.get("teaQty")
                tea_order_total.total_amount += item.get("teaQty") * item.get(
                    "teaPrice"
                )
                tea_order_total.save()

            except TeaOrder.DoesNotExist:

                # insert tea total
                TeaOrderTotal.objects.create(
                    tea=tea,
                    order=order,
                    total_qty=item.get("teaQty"),
                    total_amount=item.get("teaQty") * item.get("teaPrice"),
                )

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
            "message": "Re-order recorded successfully",
        }
    )


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_order(request, order_id):
    order_details = request.data
    item, item_type, action = order_details.values()
    order = Order.objects.get(pk=order_id)

    if item_type == "beverage":
        beverage = Beverage.objects.get(pk=item.get("beverage").get("id"))
        beverage_stock = BeverageStock.objects.get(beverage=beverage)
        try:
            old_beverage_order = BeverageOrder.objects.get(pk=item.get("id"))
            old_beverage_order_total = BeverageOrderTotal.objects.get(
                order=order, beverage=beverage
            )
            # for decreaming beverage qty
            if action == "decreament":
                # check if no change has happened.
                if item.get("sold_qty") == old_beverage_order.sold_qty:
                    return Response(
                        {
                            "success": False,
                            "message": "You didn't take any action",
                        }
                    )
                # update beverage stock
                beverage_stock.qty += int(item.get("sold_qty"))
                beverage_stock.save()
                # update beverage order
                old_beverage_order.sold_qty -= int(item.get("sold_qty"))
                old_beverage_order.total_beverage -= (
                    int(item.get("sold_qty")) * old_beverage_order.price
                )
                old_beverage_order.save()
                # update beverage order total
                old_beverage_order_total.total_qty -= int(item.get("sold_qty"))
                old_beverage_order_total.total_amount -= (
                    int(item.get("sold_qty")) * old_beverage_order_total.sold_price
                )
                old_beverage_order_total.save()

            # for deleting the whole beverage
            else:

                # update beverage stock
                beverage_stock.qty += int(item.get("sold_qty"))
                beverage_stock.save()
                # delete beverage order
                old_beverage_order.delete()
                # delete beverage total
                if old_beverage_order_total.total_qty == 1:
                    old_beverage_order_total.delete()
                else:
                    # update beverage order total
                    old_beverage_order_total.total_qty -= int(item.get("sold_qty"))
                    old_beverage_order_total.total_amount -= (
                        int(item.get("sold_qty")) * old_beverage_order_total.sold_price
                    )
                    old_beverage_order_total.save()

        except BeverageOrder.DoesNotExist or BeverageOrderTotal.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "Beverage order doesn't exist",
                }
            )
    if item_type == "meal":
        meal = Meal.objects.get(pk=item.get("meal").get("id"))
        try:
            old_meal_order = MealOrder.objects.get(pk=item.get("id"))
            old_meal_order_total = MealOrderTotal.objects.get(order=order, meal=meal)
            # for decreaming plate qty
            if action == "decreament":
                # check if no change has happened.
                if item.get("plate_nbr") == old_meal_order.plate_nbr:
                    return Response(
                        {
                            "success": False,
                            "message": "You didn't take any action",
                        }
                    )

                # update meal order
                old_meal_order.plate_nbr -= int(item.get("plate_nbr"))
                old_meal_order.total_meal -= (
                    int(item.get("plate_nbr")) * old_meal_order.price
                )
                old_meal_order.save()
                # update meal order total
                old_meal_order_total.total_qty -= int(item.get("plate_nbr"))
                old_meal_order_total.total_amount -= (
                    int(item.get("plate_nbr")) * old_meal_order.price
                )
                old_meal_order_total.save()

            # for deleting the whole meal
            else:

                # delete meal order
                old_meal_order.delete()
                # delete meal total
                if old_meal_order_total.total_qty == 1:
                    old_meal_order_total.delete()
                else:
                    # update meal order total
                    old_meal_order_total.total_qty -= int(item.get("plate_nbr"))
                    old_meal_order_total.total_amount -= (
                        int(item.get("plate_nbr")) * old_meal_order_total.sold_price
                    )
                    old_meal_order_total.save()

        except MealOrder.DoesNotExist or MealOrderTotal.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "Meal order doesn't exist",
                }
            )

    return Response(
        {
            "success": True,
            "message": "Edit Order recorded successfully",
        }
    )
