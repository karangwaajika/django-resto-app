from rest_framework import serializers
from .models import *
from product.serializers import *


class TeaOrderSerializer(serializers.ModelSerializer):
    tea = TeaSerializer()

    class Meta:
        model = TeaOrder
        fields = "__all__"


class BeverageOrderSerializer(serializers.ModelSerializer):
    beverage = BeverageSerializer()

    class Meta:
        model = BeverageOrder
        fields = "__all__"


class MealOrderSerializer(serializers.ModelSerializer):
    meal = MealSerializer()

    class Meta:
        model = MealOrder
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):

    total_tea = serializers.IntegerField()
    total_meal = serializers.IntegerField()
    total_beverage = serializers.IntegerField()
    overall_total = serializers.IntegerField()
    amount_paid = serializers.IntegerField()
    amount_to_pay = serializers.IntegerField()
    order_beverages = BeverageOrderSerializer(read_only=True, many=True)
    order_teas = TeaOrderSerializer(read_only=True, many=True)
    order_meals = MealOrderSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = "__all__"
