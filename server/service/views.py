from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework import status
from .models import *
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.
@api_view(["GET"])
def get_last_order(request):
    last_order = Order.objects.last()
    if last_order:
        return Response(
            {
                "success": True,
                "message": "Service App here!",
                "data": {"order_id": last_order.id},
            }
        )
    return Response(
        {"success": True, "message": "Service App here!", "data": {"order_id": 1}}
    )


@api_view(["POST"])
def record_order(request):
    return Response(
        {
            "success": True,
            "message": "Service App here!",
        }
    )
