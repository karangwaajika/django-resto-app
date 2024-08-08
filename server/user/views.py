from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token

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
