from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.conf import settings

# Create your views here.
@login_required(login_url=settings.LOGIN_URL)
def index(request):
    context = {
        'nilai' : range(6),
        'funcFetch' : 'itemMakananList()'
    }
    return render(request, 'index.html', context=context)

@login_required(login_url=settings.LOGIN_URL)
def minuman(request):
    context = {
        'nilai' : range(6),
        'funcFetch' : 'itemMinumanList()'
    }
    return render(request, 'minuman.html', context=context)

@login_required(login_url=settings.LOGIN_URL)
def minuman(request):
    return render(request, 'snack.html')

@login_required(login_url=settings.LOGIN_URL)
def minuman(request):
    return render(request, 'paket.html')