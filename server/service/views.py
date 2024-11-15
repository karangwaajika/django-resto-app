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
from user.models import *
from user.serializers import *
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import datetime


# Create your views here.
@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_last_order(request):
    last_order = Order.objects.last()
    user = UserSerializer(request.user)
    if last_order:
        return Response(
            {
                "success": True,
                "message": "Service App here!",
                "data": {"order_id": last_order.id},
            }
        )
    return Response(
        {"success": True, "message": "Service App here!", "user":{"info":user.data} ,"data": {"order_id": 1}}
    )


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def record_order(request):
    order_details = request.data
    order_id, order_type,customer_name,beverages, meals, teas = order_details.values()
    date_today = datetime.datetime.now()
    
    return Response(
        {
            "success": True,
            "message": "Service App here!",
        }
    )
