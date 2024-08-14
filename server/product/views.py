from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(["POST"])
def add_tea(request):
    tea_serializer = TeaSerializer(data=request.data)
    if tea_serializer.is_valid():
        tea_serializer.save()
        return Response(
            {
                "success": True,
                "message": "Successfuly added",
            }
        )
    return Response(
        {
            "success": False,
            "message": "Field Validation Error",
        }
    )


@api_view(["GET"])
def view_teas(request):
    teas = Tea.objects.all().order_by("-id")
    tea_serializer = TeaSerializer(teas, many=True)
    return Response({"success": True, "data": tea_serializer.data})
