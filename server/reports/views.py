from django.http import HttpResponse, JsonResponse
from django.core import serializers
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework import status
from user.models import *
from user.serializers import *
from service.models import *
from service.serializers import *
from product.models import *
from product.serializers import *

from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import datetime
import pytz
from django.db.models import Q, F, Case, When, CharField, Value
from django.db.models.aggregates import Count, Sum
from django.db.models.functions import Concat
from django.utils import timezone


@api_view(["GET", "POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def generate_all(request):
    employee_fullname = Concat(
        "employee__first_name",
        Value(" "),
        "employee__last_name",
        output_field=CharField(),
    )
    today = timezone.now()

    if request.method == "POST":
        search = request.data["search"]
        paid_choice = ["unpaid", "paid"]
        start_date = request.data["start_date"].split("T", maxsplit=1)[0]
        end_date = request.data["end_date"].split("T", maxsplit=1)[0]

        search_fields = (
            Q(
                employee__first_name__icontains=search,
                updated_at__date__range=(start_date, end_date),
            )
            | Q(
                employee__last_name__icontains=search,
                updated_at__date__range=(start_date, end_date),
            )
            | Q(
                id__icontains=search,
                updated_at__date__range=(start_date, end_date),
                is_paid=True,
            )
            | Q(
                customer_name__icontains=search,
                updated_at__date__range=(start_date, end_date),
            )
        )
        if search.lower() in paid_choice:
            is_paid = True if search == "paid" else False
            search_fields = Q(
                updated_at__date__range=(start_date, end_date), is_paid=is_paid
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
        Order.objects.filter(updated_at__date=today)
        .order_by("-id")
        .prefetch_related(
            "order_teas_total", "order_beverages_total", "order_meals_total", "employee"
        )
        .annotate(
            employee_fullname=employee_fullname,
        )
    )

    serializer = OrderSerializer(orders[:10], many=True)

    return Response({"success": False, "data": serializer.data})
