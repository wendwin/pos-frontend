from django.urls import path
from posapp import views

urlpatterns = [
    path('', views.index, name='home'),
]