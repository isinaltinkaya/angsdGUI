from django.urls import path
from . import views

urlpatterns = [
    path('', views.formPage),
    path('download/', views.downloadPage),
    path('about/', views.about),
    path('contact/', views.contactPage, name='contact'),
]

