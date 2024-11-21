from service.models import *
from django.db import connection
from django.db.models import F, Case, When, CharField, Value
from django.db.models.aggregates import Sum, Count
from django.db.models.functions import Concat


def okay():
    employee_fullname = Concat(
        "employee__first_name",
        Value(" "),
        "employee__last_name",
        output_field=CharField(),
    )
    sum_tea = Sum("order_teas__total_tea", default=0)
    sum_beverage = Sum("order_beverages__total_beverage", default=0)
    sum_meal = Sum("order_meals__total_meal", default=0)

    orders = (
        Order.objects.all()
        .values("id", "customer_name", "date_time")
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
    print(orders)
    print("\n")
    print(connection.queries)


def run():
    order = Order.objects.get(pk = 7)
    sum_beverage = BeverageOrder.objects.filter(order = order).aggregate(sum = Sum('total_beverage'))
    
    print(sum_beverage)    
