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
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_role(request, employee_id):
    try:
        user = User.objects.get(pk=employee_id)
        user.is_staff = not (user.is_staff)
        user.save()
        return Response({"success": True, "message": "Role updated successfuly"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doesn't exist"})


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def activate_user(request, employee_id):
    try:
        user = User.objects.get(pk=employee_id)
        user.is_active = not (user.is_active)
        user.save()
        return Response({"success": True, "message": "Activation updated successfuly"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doesn't exist"})


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    try:
        user = User.objects.get(pk=request.data["employeeId"])
        user.set_password(request.data["password"])
        user.save()
        return Response({"success": True, "message": "Password updated successfuly"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doesn't exist"})


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def logout_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        token = Token.objects.get(user=user)
        # deleting a token makes user be inactive
        token.delete()
        return Response({"success": True, "message": "Logout successfuly"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doen't exist!!"})


@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def update_user(request):
    user_data = request.data
    first_name, last_name, username, password, user_id = user_data.values()
    try:
        user = User.objects.get(pk=user_id)
        user.first_name = first_name if first_name else user.first_name
        user.last_name = last_name if last_name else user.last_name
        user.username = username if username else user.username
        if password:
            user.set_password(request.data["password"])
        user.save()
        return Response({"success": True, "message": "User updated successfully"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doen't exist!!"})
    
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_user(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        user_serializer = UserSerializer(user)
        return Response({"success": True, "data": user_serializer.data})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User doen't exist!!"})
