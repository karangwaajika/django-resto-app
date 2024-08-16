from django.urls import path
from . import views

urlpatterns = [
    path("add_tea", views.add_tea, name="add_tea"),
    path("view_teas", views.view_teas, name="view_teas"),
    path("update_tea/<int:tea_id>", views.update_tea, name="update_tea"),
    path("delete_tea/<int:tea_id>", views.delete_tea, name="delete_tea"),
    path("add_meal", views.add_meal, name="add_meal"),
    path("view_meals", views.view_meals, name="view_meals"),
    path("update_meal/<int:meal_id>", views.update_meal, name="update_meal"),
    path("delete_meal/<int:meal_id>", views.delete_meal, name="delete_meal"),
    path("add_beverage", views.add_beverage, name="add_beverage"),
    path("purchase_beverage", views.purchase_beverage, name="purchase_beverage"),
]
