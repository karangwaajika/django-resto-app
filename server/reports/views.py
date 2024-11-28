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

    if request.data["search"]:
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
            "order_teas_total", "order_beverages_total", "order_meals_total","employee"
        )
        .annotate(
            employee_fullname=employee_fullname,
        )
    )

    serializer = OrderSerializer(orders[:10], many=True)

    return Response({"success": False, "data": serializer.data})
