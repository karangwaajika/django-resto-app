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
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.db.models import Q

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
    serializer_user = UserSerializer(request.user)
    return Response(
        {
            "success": True,
            "message": "Successfuly added",
            "user": serializer_user.data,
        }
    )


@api_view(["POST"])
def add_employee(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data["username"])
        user.set_password(request.data["password"])
        user.save()
        token = Token.objects.create(user=user)

        return Response(
            {
                "success": True,
                "message": "Successfuly added",
                "token": token.key,
                "user": serializer.data,
            }
        )
    return Response(
        {
            "success": False,
            "message": serializer.errors,
        }
    )


@api_view(["POST"])
def view_employees(request):
    search_fields = (
        Q(username__icontains=request.data["search"], is_superuser=False)
        | Q(first_name__icontains=request.data["search"], is_superuser=False)
        | Q(last_name__icontains=request.data["search"], is_superuser=False)
        | Q(email__icontains=request.data["search"], is_superuser=False)
    )
    users = User.objects.filter(search_fields).reverse()
    serializer = UserSerializer(users, many=True)

    return Response({"success": True, "data": serializer.data})


@api_view(["GET"])
def update_role(request, employee_id):
    try:
        user = User.objects.get(pk=employee_id)
        user.is_staff = not (user.is_staff)
        user.save()
        return Response({"success": True, "message": "Role updated successfuly"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doesn't exist"})


@api_view(["GET"])
def activate_user(request, employee_id):
    try:
        user = User.objects.get(pk=employee_id)
        user.is_active = not (user.is_active)
        user.save()
        return Response({"success": True, "message": "Activation updated successfuly"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doesn't exist"})
