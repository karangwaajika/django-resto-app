from django.contrib import admin
from .models import *


# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer_name",
        "sold_date",
        "employee",
        "created_at",
        "updated_at",
    )


admin.site.register(Order, OrderAdmin)


class BeverageOrderAdmin(admin.ModelAdmin):
    list_display = (
        "beverage",
        "open_qty",
        "left_qty",
        "sold_qty",
        "price",
        "total_beverage",
        "order",
    )


admin.site.register(BeverageOrder, BeverageOrderAdmin)


class TeaOrderAdmin(admin.ModelAdmin):
    list_display = ("tea", "qty", "price", "total_tea", "order")


admin.site.register(TeaOrder, TeaOrderAdmin)


class MealOrderAdmin(admin.ModelAdmin):
    list_display = ("meal", "plate_nbr", "price", "total_meal", "order")


admin.site.register(MealOrder, MealOrderAdmin)


class MealOrderTotalAdmin(admin.ModelAdmin):
    list_display = ("meal", "order")


admin.site.register(MealOrderTotal, MealOrderTotalAdmin)


class BeverageOrderTotalAdmin(admin.ModelAdmin):
    list_display = ("beverage", "order")


admin.site.register(BeverageOrderTotal, BeverageOrderTotalAdmin)


class TeaOrderTotalAdmin(admin.ModelAdmin):
    list_display = ("tea", "order")


admin.site.register(TeaOrderTotal, TeaOrderTotalAdmin)
