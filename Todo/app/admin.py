from django.contrib import admin

# Register your models here.

from .models import UserModel,TodoModel

admin.site.register(UserModel)
admin.site.register(TodoModel)

