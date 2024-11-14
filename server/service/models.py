from django.db import models
from django.contrib.auth.models import User
from product.models import *

# Create your models here.


class Order(models.Model):

    class OrderType(models.TextChoices):
        DINE_IN = 1, "Dine-in"
        ONLINE = 2, "Online"
        TAKEAWAY = 3, "Takeaway"

    employee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_paid = models.BooleanField(default=False)
    customer_name = models.CharField(max_length=250)
    cash = models.IntegerField(default=0)
    momo = models.IntegerField(default=0)
    order_type = models.CharField(max_length=50, choices=OrderType.choices)
    date_time = models.CharField(max_length=250)
    comment = models.CharField(max_length=500)
    sold_date = models.DateField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.customer_name


class TeaOrder(models.Model):
    tea = models.ForeignKey(
        Tea, on_delete=models.SET_NULL, related_name="tea_orders", null=True
    )
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, related_name="order_teas", null=True
    )
    qty = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    total_tea = models.IntegerField(default=0)
    sold_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.tea.name


class MealOrder(models.Model):
    meal = models.ForeignKey(
        Meal, on_delete=models.SET_NULL, related_name="meal_orders", null=True
    )
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, related_name="order_meals", null=True
    )
    plate_nbr = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    total_meal = models.IntegerField(default=0)
    sold_date = models.DateField(auto_now=True)


class BeverageOrder(models.Model):
    beverage = models.ForeignKey(
        Beverage, on_delete=models.SET_NULL, related_name="beverage_orders", null=True
    )
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, related_name="order_beverages", null=True
    )
    open_qty = models.IntegerField(default=0)
    left_qty = models.IntegerField(default=0)
    sold_qty = models.IntegerField(default=0, blank=True)
    price = models.IntegerField(default=0)
    total_beverage = models.IntegerField(default=0)
    sold_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.beverage.name
