from rest_framework import serializers , validators
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserModel
        fields = ("id","username","email","password")
        extra_kwargs = {'password':{'write_only':True}}


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TodoModel
        fields = ("id","username","title")
        validators = [
            validators.UniqueTogetherValidator(
                queryset=models.TodoModel.objects.all(),
                fields=("username", "title"),
                message="This todo already exists for this user."
            )
        ]