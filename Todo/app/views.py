from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import UserModel , TodoModel
from .serializers import UserSerializer , TodoSerializer
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password



class UserRegistration (APIView):
    permission_classes = [AllowAny]


    def post(self , request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Successfully registered",'success':True ,'user':serializer.data} , status=status.HTTP_201_CREATED)
        return Response({"message":serializer.errors,'success':False },status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
    

class UserLogin (APIView):
    permission_classes = [AllowAny]


    def post(self , request):
        username= request.data.get('username')
        password= request.data.get('password')

        try:
            user = UserModel.objects.get(username = username)
            
        except UserModel.DoesNotExist:
            return Response({'message':'User doesnot exist','success':False}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

       
        if check_password(password,user.password):
           

            serializer = UserSerializer(user)    
            
            return Response({'message':'Successfully Logged In','success':True,'user':serializer.data}, status=status.HTTP_200_OK)
        return Response({'message':'invalid credentials','success':False},status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
    


class CreateToDo(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        username = request.data.get('username')
 
        try:
            todo = UserModel.objects.get(username = username)

        except UserModel.DoesNotExist:
            return Response({'message':'User Todo list doesnot exist'}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        

        if todo:
            serializer = TodoSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"Successfully added new todo",'success':True} , status=status.HTTP_201_CREATED) 
            return Response({"message":"This todo already exists for this user."} ,status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
       
        



class ToDo(APIView):
    permission_classes = [AllowAny]


    def post(self , request):
        username = request.data.get('username')
        print(username)

        try:
            todo = UserModel.objects.get(username=username)

        except UserModel.DoesNotExist:
            return Response({'message':'User Todo list doesnot exist'}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        

        if todo:
            todos = TodoModel.objects.filter(username=username)
            serializer = TodoSerializer(todos , many=True)
            return Response({'message':' success','data':serializer.data}, status=status.HTTP_200_OK)
        



class DeleteTodo(APIView):

    def delete(self,request,id):
        try:
            todo = TodoModel.objects.get(id=id)
            todo.delete()
            return Response({'message':'Task deleted successfully'},status=status.HTTP_202_ACCEPTED)
        except TodoModel.DoesNotExist:
            return Response({'message':'Task not found'},status=status.HTTP_204_NO_CONTENT)
    





