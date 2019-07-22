from django.shortcuts import render
from django.http import HttpResponse
from .forms import UI_Form
from . import pipeline_generator as gen
from datetime import datetime

def get_input_details(request):
    
    if request.method == 'POST':
        form = UI_Form(request.POST)
        if form.is_valid():
            if form.cleaned_data['pipeline_name']:
                # pipeline_name_daymonthyear-hourminutesecond
                pipeline_name = form.cleaned_data['pipeline_name'] + datetime.now().strftime('_%d%m%Y-%H%M%S')
            else:
                # ANGSDgui_pipeline_daymonthyear-hourminutesecond
                pipeline_name = "ANGSDgui_pipeline" + datetime.now().strftime('_%d%m%Y-%H%M%S')
            outFile = gen.WriteOutFile(pipeline_name)
            outFile.create() # create empty outfile
            input_filename = form.cleaned_data['input_filename']
            input_filetype = form.cleaned_data['input_filetype']
            outFile.write(input_filetype)
    else:
        form = UI_Form()
    
    return render(request, 'form.html', {'form': form})
