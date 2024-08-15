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
from django.db.models import Q

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


@api_view(["GET", "POST"])
def view_teas(request):
    if request.method == "POST":
        search_fields = (
            Q(name__contains=request.data["search"])
            | Q(tea_type__contains=request.data["search"])
            | Q(price__contains=request.data["search"])
        )
        tea = Tea.objects.filter(search_fields).order_by("-id")
        tea_serializer = TeaSerializer(tea, many=True)
        return Response({"success": False, "data": tea_serializer.data})

    teas = Tea.objects.all().order_by("-id")
    tea_serializer = TeaSerializer(teas, many=True)
    return Response({"success": True, "data": tea_serializer.data})


@api_view(["POST"])
def update_tea(request, tea_id):
    try:
        tea = Tea.objects.get(pk=tea_id)
    except Tea.DoesNotExist:
        return Response({"success": False, "message": "Tea doesn't exist"})

    tea.name = request.data["name"]
    tea.price = request.data["price"]
    tea.tea_type = request.data["tea_type"]
    tea.save()
    return Response({"success": True, "message": "Tea Successfully updated!"})


@api_view(["DELETE"])
def delete_tea(request, tea_id):
    try:
        tea = Tea.objects.get(pk=tea_id)
    except Tea.DoesNotExist:
        return Response({"success": False, "message": "Tea doesn't exist"})
    tea.delete()
    return Response({"success": False, "message": "Tea Successfully Deleted!"})


@api_view(["POST"])
def add_meal(request):
    meal_serializer = MealSerializer(data=request.data)
    if meal_serializer.is_valid():
        meal_serializer.save()
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
