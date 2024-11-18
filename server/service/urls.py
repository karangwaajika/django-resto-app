from django.urls import path
from . import views

urlpatterns = [
    path("record_order", views.record_order, name="record_order"),
    path("get_last_order", views.get_last_order, name="get_last_order"),
    path("view_orders", views.view_orders, name="view_orders"),
]
