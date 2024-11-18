from rest_framework import serializers
from .models import *


class OrderSerializer(serializers.ModelSerializer):
    employee_fullname = serializers.CharField()
    total_tea = serializers.IntegerField()
    total_meal = serializers.IntegerField()
    total_beverage = serializers.IntegerField()
    overall_total = serializers.IntegerField()
    amount_paid = serializers.IntegerField()
    amount_to_pay = serializers.IntegerField()

    class Meta:
        model = Order
        fields = "__all__"
