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
def record_order(request):
    return Response(
        {
            "success": True,
            "message": "Service App here!",
        }
    )
