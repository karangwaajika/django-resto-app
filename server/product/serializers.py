from rest_framework import serializers
from .models import *
from django.core.exceptions import ValidationError

class TeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tea
        fields = "__all__"