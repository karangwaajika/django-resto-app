from service.models import *
from django.db import connection
from django.db.models import F, Case, When, CharField, Value
from django.db.models.aggregates import Sum, Count, Avg, Max
from django.db.models.functions import Concat


def run():
    employee_fullname = Concat(
        "employee__first_name",
        Value(" "),
        "employee__last_name",
        output_field=CharField(),
    )
    sum_tea = TeaOrder.objects.aggregate(Sum('total_tea'),default=0)
    sum_beverage = Sum("order_beverages__total_beverage", default=0)
    sum_meal = Sum("order_meals__total_meal", default=0)
    
    orders = Order.objects.annotate(
        employee_fullname=employee_fullname,
        total_tea=Sum('order_meals__total_meal', default=0),
        total_meal=Sum('order_meals__total_meal', default=0),
        total_beverage=Sum('order_beverages__total_beverage', default=0),
        overall_total=F('total_tea') + F('total_meal') + F('total_beverage'),
        amount_paid=F('cash') + F('momo'),
        amount_to_pay=Case(
            When(
                overall_total__gt=F('amount_paid'),
                then=F('overall_total') - F('amount_paid'),
            ),
            default=F('overall_total'),
        ),
    ).annotate(
        employee_fullname=employee_fullname,
        total_tea=sum_tea,
        total_meal=Sum('order_meals__total_meal', default=0),
        total_beverage=Sum('order_beverages__total_beverage', default=0),
        overall_total=F('total_tea') + F('total_meal') + F('total_beverage'),
        amount_paid=F('cash') + F('momo'),
        amount_to_pay=Case(
            When(
                overall_total__gt=F('amount_paid'),
                then=F('overall_total') - F('amount_paid'),
            ),
            default=F('overall_total'),
        ),
    )
    print(orders.values('id', 'total_tea', 'total_meal'))
    print("\n")
    # print(connection.queries)


# def run():
#     order = Order.objects.get(pk = 7)
#     sum_beverage = BeverageOrder.objects.filter(order = order).aggregate(sum = Sum('total_beverage'))

#     print(sum_beverage)
