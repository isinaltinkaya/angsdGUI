from django import forms
from . import choices

class UI_Form(forms.Form):
    pipeline_name = forms.CharField(required=False, label="Name of pipeline")
    input_filename = forms.CharField(label="Input file's name")
    input_filetype = forms.ChoiceField(choices=choices.filetype,label="File type of input")
