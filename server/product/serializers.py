from rest_framework import serializers
from .models import *
from django.core.exceptions import ValidationError


class TeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tea
        fields = "__all__"


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"


class BeverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beverage
        fields = "__all__"


class BeverageStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeverageStock
        fields = "__all__"
