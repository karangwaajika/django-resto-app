from django.contrib import admin
from .models import *

# Register your models here.


class TeaAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "tea_type")


admin.site.register(Tea, TeaAdmin)


class MealAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "meal_type")


admin.site.register(Meal, MealAdmin)


class BeverageAdmin(admin.ModelAdmin):
    list_display = ("name", "beverage_type")


admin.site.register(Beverage, BeverageAdmin)


class BeverageStockAdmin(admin.ModelAdmin):
    list_display = ("beverage", "price", "qty")


admin.site.register(BeverageStock, BeverageStockAdmin)
