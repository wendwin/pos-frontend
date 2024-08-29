from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.conf import settings

# Create your views here.
@login_required(login_url=settings.LOGIN_URL)
def index(request):
    return render(request, 'index.html', {'nilai': range(8)})

@login_required(login_url=settings.LOGIN_URL)
def minuman(request):
    return render(request, 'minuman.html')

@login_required(login_url=settings.LOGIN_URL)
def minuman(request):
    return render(request, 'snack.html')

@login_required(login_url=settings.LOGIN_URL)
def minuman(request):
    return render(request, 'paket.html')