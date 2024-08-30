from django.urls import path
from posapp import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('', views.index, name='home'),
    path('minuman/', views.minuman, name='minuman'),
    path('snack/', views.snack, name='snack'),
    path('paket/', views.paket, name='paket'),
    path('login/', LoginView.as_view(), name='login'),  
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
]