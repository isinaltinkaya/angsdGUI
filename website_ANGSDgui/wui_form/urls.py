from django.conf.urls import url
from . import views

#urlpatterns = [
#    path('', views.get_input_details),
#    path('download', views.download),
#]

urlpatterns = [
     url(r'^$', views.get_input_details, name='formpage'),
     url(r'^download$', views.download, name='downloadpage'),  
]
