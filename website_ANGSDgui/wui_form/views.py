from django.shortcuts import render
from django.http import HttpResponse
from .forms import UI_Form
from . import pipeline_generator as gen

def get_input_details(request):
    
    if request.method == 'POST':
        form = UI_Form(request.POST)
        if form.is_valid():
            
            pipeline_name = form.cleaned_data['pipeline_name']
            input_filename = form.cleaned_data['input_filename']
            input_filetype = form.cleaned_data['input_filetype']
            print(pipeline_name,input_filename,input_filetype)
            gen.touch_outFile(pipeline_name)
            gen.get_input(input_filename,input_filetype)
    
    else:
        form = UI_Form()
    
    return render(request, 'form.html', {'form': form})
