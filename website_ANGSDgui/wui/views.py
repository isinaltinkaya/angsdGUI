from django.http import HttpResponse
from django.core.mail import send_mail, BadHeaderError
from django.shortcuts import render
from datetime import datetime
from .models import Contact

input_filename = ""

def formPage(request):
    return render(request, 'form.html')

def downloadPage(request): # this page comes after sending the form successfully, includes download button
    return render(request, 'downloadpage.html')

# contact us
def contactPage(request):
    return render(request, 'contact.html')

def contact(request):
    if request.method == 'POST':
        email_r = request.POST.get('email')
        subject_r = request.POST.get('subject')
        message_r = request.POST.get('message')
        c = Contact(email=email_r, subject=subject_r, message=message_r)
        c.save()
        send_mail(subject_r, message_r, email_r, ['isinaltinkaya@gmail.com'])
        return render(request, 'thank.html')
    else:
        return render(request, 'contact.html')

def about(request):
    return render(request, 'about.html')
