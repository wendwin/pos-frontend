from django.urls import path
from posapp import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('', views.index, name='home'),
    path('minuman/', views.index, name='minuman'),
    path('snack/', views.index, name='snack'),
    path('paket/', views.index, name='paket'),
    path('login/', LoginView.as_view(), name='login'),  
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
]