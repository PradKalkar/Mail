# -------------- Imports -------------------- #

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError

# -------------- Views definition --------------- #

def index(request):

    # Authenticated users should view their inbox
    if (request.user.is_authenticated):
        render(request, "gmail/inbox.html")
    
    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


def login_view(request):
    if request.method == "POST":

        # Attempting to sign the user in
        email = request.POST["email"]
        password = request.POST["password"]

        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "gmail/login.html", {
                "message": "Invalid email and/or password."
            })

    # if request.method == "GET"
    else:
        return render(request, "gmail/login.html")


@csrf_exempt
@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))

def register(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]

        # Ensure that the password matches confirmation
        if password != confirmation:
            return render(request, "gmail/register.html", {
                "message": "Error: Passwords don't match!"
            })
        
        # Attempt to create a new user
        try:
            user = User.objects.create_user(email, email, password) # the username is equal to email here
            user.save()
        except IntegrityError as e:
            return render(request, "gmail/register.html", {
                "message": "Error: Email already taken!"
            })

        login(request, user)
        return HttpResponseRedirect(reverse("index"))

    else: 
        return render(request, "gmail/register.html")