from django.http import HttpResponse
from django.shortcuts import render
from datetime import datetime
from .forms import UI_Form
from . import pipeline_generator as gen

def get_input_details(request):
    
    if request.method == 'POST':
        form = UI_Form(request.POST)
        if form.is_valid():
            # if softwarePath is given
            if form.cleaned_data['softwarePath']:
                softwarePath = form.cleaned_data['softwarePath']
            else:
                softwarePath = "angsd"
            # if pipeline_name is given 
            if form.cleaned_data['pipeline_name']:
                # pipeline_name_daymonthyear-hourminutesecond
                pipeline_name = form.cleaned_data['pipeline_name'] + datetime.now().strftime('_%d%m%Y-%H%M%S')
            else:
                # ANGSDgui_pipeline_daymonthyear-hourminutesecond
                pipeline_name = "ANGSDgui_pipeline" + datetime.now().strftime('_%d%m%Y-%H%M%S')
            
            input_filename = form.cleaned_data['input_filename']
            input_filetype = form.cleaned_data['input_filetype']
            
            outFile = gen.WriteOutFile(pipeline_name)
            outFile.setPath(softwarePath)
            outFile.create() # create outfile bash header and angsd command
            outFile.add(outFile.getInput(input_filetype))
            outFile.add(input_filename)
    else:
        form = UI_Form()
    
    return render(request, 'form.html', {'form': form})
