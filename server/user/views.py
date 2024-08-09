from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(["POST"])
def login(request):
    try:
        user = User.objects.get(username=request.data["username"])
    except User.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "User doesn't exist",
            }
        )
    if not user.check_password(request.data["password"]):
        return Response(
            {
                "success": False,
                "message": "Password incorrect",
            }
        )

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response(
        {
            "success": True,
            "message": "Successfuly added",
            "token": token.key,
            "user": serializer.data,
        }
    )


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def protect_page(request):
    return Response("the user with email {} is authenticated".format(request.user.email))
