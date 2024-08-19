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


@api_view(["GET", "POST"])
def view_meals(request):
    if request.method == "POST":
        search_fields = (
            Q(name__contains=request.data["search"])
            | Q(meal_type__contains=request.data["search"])
            | Q(price__contains=request.data["search"])
        )
        meal = Meal.objects.filter(search_fields).order_by("-id")
        meal_serializer = MealSerializer(meal, many=True)
        return Response({"success": False, "data": meal_serializer.data})

    meals = Meal.objects.all().order_by("-id")
    meal_serializer = MealSerializer(meals, many=True)
    return Response({"success": True, "data": meal_serializer.data})


@api_view(["POST"])
def update_meal(request, meal_id):
    try:
        meal = Meal.objects.get(pk=meal_id)
    except Meal.DoesNotExist:
        return Response({"success": False, "message": "Meal doesn't exist"})

    meal.name = request.data["name"]
    meal.price = request.data["price"]
    meal.meal_type = request.data["meal_type"]
    meal.save()
    return Response({"success": True, "message": "Meal Successfully updated!"})


@api_view(["DELETE"])
def delete_meal(request, meal_id):
    try:
        meal = Meal.objects.get(pk=meal_id)
    except Meal.DoesNotExist:
        return Response({"success": False, "message": "Meal doesn't exist"})
    meal.delete()
    return Response({"success": False, "message": "Meal Successfully Deleted!"})


@api_view(["POST"])
def add_beverage(request):
    beverage_serializer = BeverageSerializer(data=request.data)
    if beverage_serializer.is_valid():
        beverage_serializer.save()
        return Response(
            {"success": True, "message": "Beverage Brand Successfully Added!"}
        )

    return Response({"success": False, "message": "Field Validation Error"})


@api_view(["POST", "GET"])
def purchase_beverage(request):
    if request.method == "POST":
        beverage_serializer = BeverageStockSerializer(data=request.data)
        if beverage_serializer.is_valid():
            beverage_serializer.save()
            return Response(
                {"success": True, "message": "Beverage Stock Successfully Added!"}
            )
        # if a beverage is already in the database, add qty to old one and update price
        try:
            beverage_stock = BeverageStock.objects.get(
                beverage=request.data["beverage"]
            )
            beverage_stock.qty += int(request.data["qty"])
            beverage_stock.price = request.data["price"]
            beverage_stock.save()
            return Response({"success": True, "message": "Stock Updated Successfully!"})
        except BeverageStock.DoesNotExist:
            return Response({"success": False, "message": "Field Validation Error"})

    beverage = Beverage.objects.values("id", "name").all().order_by("-id")
    return Response({"success": True, "data": beverage})


@api_view(["POST"])
def view_beverages(request):
    search_fields = (
        Q(beverage__name__contains=request.data["search"])
        | Q(beverage__beverage_type__contains=request.data["search"])
        | Q(price__contains=request.data["search"])
        | Q(qty__contains=request.data["search"])
    )
    beverage_stocks = BeverageStock.objects.filter(search_fields).reverse()
    beverage_stock_serializer = BeverageStockSerializer(beverage_stocks, many=True)

    return Response({"success": True, "data": beverage_stock_serializer.data})


@api_view(["POST"])
def update_beverage(request, beverage_id):
    try:
        beverage = Beverage.objects.get(pk=beverage_id)
        beverage.name = request.data["name"]
        beverage.beverage_type = request.data["beverage_type"]
        beverage.save()

        beverage_stock = BeverageStock.objects.get(beverage=beverage_id)
        beverage_stock.qty = request.data["qty"]
        beverage_stock.price = request.data["price"]
        beverage_stock.save()
        return Response({"success": True, "message": "Beverage Updated Successfully"})

    except Beverage.DoesNotExist:
        return Response({"success": False, "message": "Beverage doesn't exist"})
