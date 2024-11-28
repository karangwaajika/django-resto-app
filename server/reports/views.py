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


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def report(request):

    return Response(
        {"success": True, "message": "Reports App here!", "data": {"order_id": 1}}
    )
