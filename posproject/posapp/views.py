from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.conf import settings

# Create your views here.
@login_required(login_url=settings.LOGIN_URL)
def index(request):
    context = {
        'nilai': range(8),
        'funcFetch': 'itemMakananList()'
    }
    return render(request, 'index.html', context=context)

@login_required(login_url=settings.LOGIN_URL)
def minuman(request):
    context = {
        'nilai': range(8),
        'funcFetch': 'itemMinumanList()'
    }
    return render(request, 'minuman.html', context=context)

@login_required(login_url=settings.LOGIN_URL)
def snack(request):
    return render(request, 'snack.html')

@login_required(login_url=settings.LOGIN_URL)
def paket(request):
    return render(request, 'paket.html')