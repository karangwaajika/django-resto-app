from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.


class Tea(models.Model):

    class TeaType(models.TextChoices):
        TEA = "Tea", "Tea"
        COFFE = "Coffee", "Coffee"
        JUICE = "Juice", "Juice"
        SMOOTHIES = "Smoothies", "Smoothies"

    name = models.CharField(max_length=100, unique=True)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    tea_type = models.CharField(max_length=50, choices=TeaType.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Meal(models.Model):
    class MealType(models.TextChoices):

        SALAD = "Salad", "Salad"
        SOUP = "Soup", "Soup"
        FRIED = "Fried", "Fried"
        STEWED_DISH = "Stewed_Dish", "Stewed Dish"
        BBQ = "BBQ", "BBQ"
        BURGER = "Burger", "Burger"
        HOT_DOG = "Hot_Dog", "Hot Dog"
        PIZZA = "Pizza", "Pizza"
        LOADED_FRIES = "Loaded_Fries", "Loaded Fries"
        WRAP = "Wrap", "Wrap"
        SIDE = "Side", "Side"
        FAMILY_REAL = "Family_Deal", "Family Deal"
        SNACK = "Snack", "Snack"

    name = models.CharField(max_length=150, unique=True)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    meal_type = models.CharField(max_length=50, choices=MealType.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Beverage(models.Model):
    class BeverageType(models.TextChoices):

        WATER = "Water", "Water"
        BEER = "Beer", "Beer"
        SODA = "Soda", "Soda"
        WINE = "Wine", "Wine"

    name = models.CharField(max_length=150, unique=True)
    beverage_type = models.CharField(max_length=50, choices=BeverageType.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class BeverageStock(models.Model):
    beverage = models.OneToOneField(Beverage, on_delete=models.CASCADE)
    price = models.IntegerField(default=0)
    qty = models.IntegerField(default=0)
    purchase_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.beverage.name
