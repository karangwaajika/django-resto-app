from rest_framework import serializers
from user.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"        
        extra_kwargs = {"password": {"write_only": True}}
    
    def validate(self, attrs):
        password = attrs.get("password", "")
        if len(password) < 3:
            raise serializers.ValidationError("Password must be at least 3 characters")
        return attrs
    