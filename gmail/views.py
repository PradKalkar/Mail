# -------------- Imports -------------------- #

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


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
