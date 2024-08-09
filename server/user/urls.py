from django.urls import path
from . import views

urlpatterns = [
    path("login", views.login, name="login"),
    path("protect_page", views.protect_page, name="protect_page"),
]
