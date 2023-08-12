from django.urls import path
from .views import UserRegistration , UserLogin ,ToDo , CreateToDo , DeleteTodo 


urlpatterns = [
    path("api/register/",UserRegistration.as_view(),name='user-registration'),
    path("api/login/",UserLogin.as_view(),name='user-login'),
    path("api/todo/", CreateToDo.as_view(),name='todo-list'),
    path("api/get-todo/",ToDo.as_view(),name='get-todo'),
    path("api/delete-todo/<int:id>/",DeleteTodo.as_view(),name='delete-todo'),
]