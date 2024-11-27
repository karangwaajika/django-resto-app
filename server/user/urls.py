from django.urls import path
from . import views

urlpatterns = [
    path("login", views.login, name="login"),
    path("protect_page", views.protect_page, name="protect_page"),
    path("add_employee", views.add_employee, name="add_employee"),
    path("view_employees", views.view_employees, name="views_employees"),
    path("update_role/<int:employee_id>", views.update_role, name="update_role"),
    path("activate_user/<int:employee_id>", views.activate_user, name="activate_user"),
    path("change_password", views.change_password, name="change_password"),
    path("logout_user/<int:user_id>", views.logout_user, name="logout_user"),
    path("update_user", views.update_user, name="update_user"),
]
