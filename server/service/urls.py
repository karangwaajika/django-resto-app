from django.urls import path
from . import views

urlpatterns = [
    path("record_order", views.record_order, name="record_order"),
    path("get_last_order", views.get_last_order, name="get_last_order"),
    path("view_orders", views.view_orders, name="view_orders"),
    path("view_my_services", views.view_my_services, name="view_my_services"),
    path("approve_bill/<int:order_id>", views.approve_bill, name="approve_bill"),
    path("reorder", views.reorder, name="reorder"),
    path("edit_order/<int:order_id>", views.edit_order, name="edit_order"),
]
