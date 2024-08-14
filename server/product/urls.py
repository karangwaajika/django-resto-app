from django.urls import path
from . import views

urlpatterns = [
    path("add_tea", views.add_tea, name="add_tea"),
    path("view_teas", views.view_teas, name="view_teas"),
]
