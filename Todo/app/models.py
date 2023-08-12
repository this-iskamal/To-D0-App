from django.db import models
from django.contrib.auth.hashers import make_password




# Create your models here.



class UserModel(models.Model):
    username = models.CharField(max_length=32,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=32)
   


    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)
    


class TodoModel(models.Model):
    username = models.CharField(max_length=32)
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)


