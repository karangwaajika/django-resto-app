from django.urls import path
from . import views

urlpatterns = [
    path("record_order", views.record_order, name="record_order"),
]
