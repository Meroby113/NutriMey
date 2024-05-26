from django.shortcuts import render

def home(request):
    return render(request, 'index.html',)

def register(request):
    return render(request, 'register.html')

def login(request):
    return render(request, 'login.html')

def contact(request):
    return render(request, 'contact.html')

def userPage(request):
    return render(request, 'userPage.html')

def userForm(request):
    return render(request, 'userForm.html')
