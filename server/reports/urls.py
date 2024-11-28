from django.urls import path
from . import views

urlpatterns = [path("generate_all", views.generate_all, name="report")]
