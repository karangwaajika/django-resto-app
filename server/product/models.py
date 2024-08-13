from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.


class Tea(models.Model):

    class TeaType(models.TextChoices):
        TEA = "Tea", "Tea"
        COFFE = "Coffee", "Coffee"
        JUICE = "Juice", "Juice"

    name = models.CharField(max_length=100, unique=True)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    tea_type = models.CharField(max_length=50, choices=TeaType.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
