from django.http import HttpResponse
from django.core.mail import send_mail, BadHeaderError
from django.shortcuts import render
from datetime import datetime
from .forms import UI_Form
from . import pipeline_generator as gen
from .models import Contact

input_filename = ""

def formPage(request):
    
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
            global input_filename
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

def downloadPage(request): # this page comes after sending the form successfully, includes download button
    return render(request, 'downloadpage.html') 


def downloadItem(request):
    #file_name = get_input_details(request).input_filename()
    global input_filename
    file_name = input_filename
    path_to_file = "../pipelines/"+file_name
    response = HttpResponse(content_type = 'text/x-shellscript')
    response['Content-Disposition'] = 'attachment; filename=%s' %file_name
    response['X-Sendfile'] = path_to_file
    return response


def get_document_url():
    return "../pipelines/" + input_filename + ".txt"


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


