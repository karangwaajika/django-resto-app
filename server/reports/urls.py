from django.urls import path
from . import views

urlpatterns = [
    path("generate_all", views.generate_all, name="report"),
    path("waiter_report/<int:user_id>", views.waiter_report, name="waiter-report"),
    path("unpaid_report", views.unpaid_report, name="unpaid_report"),
]
