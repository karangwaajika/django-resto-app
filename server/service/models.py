from django.db import models
from django.contrib.auth.models import User
from product.models import *

# Create your models here.


class Order(models.Model):

    class OrderType(models.TextChoices):
        DINE_IN = "1", "Dine-in"
        ONLINE = "2", "Online"
        TAKEAWAY = "3", "Takeaway"

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

    @property
    def total_tea(self):
        teas = self.order_teas.all()
        total = sum([item.total_tea for item in teas])
        return total

    @property
    def total_beverage(self):
        beverages = self.order_beverages.all()
        total = sum([item.total_beverage for item in beverages])
        return total

    @property
    def total_meal(self):
        meals = self.order_meals.all()
        total = sum([item.total_meal for item in meals])
        return total

    @property
    def overall_total(self):
        return self.total_meal + self.total_beverage + self.total_tea

    @property
    def amount_paid(self):
        return self.cash + self.momo

    @property
    def amount_to_pay(self):
        if self.overall_total > self.amount_paid:
            return self.overall_total - self.amount_paid
        return self.overall_total


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
    sold_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tea.name


class TeaOrderTotal(models.Model):
    tea = models.ForeignKey(Tea, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, null=True, related_name="order_teas_total"
    )
    total_amount = models.IntegerField(default=0, blank=True)
    total_qty = models.IntegerField(default=0, blank=True)


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
    sold_date = models.DateTimeField(auto_now=True)


class MealOrderTotal(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, null=True, related_name="order_meals_total"
    )
    total_amount = models.IntegerField(default=0, blank=True)
    total_qty = models.IntegerField(default=0, blank=True)


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
    sold_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.beverage.name


class BeverageOrderTotal(models.Model):
    beverage = models.ForeignKey(Beverage, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(
        Order,
        on_delete=models.SET_NULL,
        null=True,
        related_name="order_beverages_total",
    )
    sold_price = models.IntegerField(default=0, blank=True)
    total_amount = models.IntegerField(default=0, blank=True)
    total_qty = models.IntegerField(default=0, blank=True)
