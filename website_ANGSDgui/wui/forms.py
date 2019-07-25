from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column, ButtonHolder, HTML
from django.core import validators
from django import forms
from . import choices

class UI_Form(forms.Form):
    # software path
    softwarePath = forms.CharField(required=False, 
            label="Software path", 
            widget=forms.TextInput(attrs={'placeholder':'output of "which $SOFTWARE" command'}))
    # pipeline name
    pipeline_name = forms.CharField(required=False,
            label="Pipeline name",
            validators=[
                validators.RegexValidator(regex='^[a-zA-Z0-9]*$', message='Please enter a valid pipeline name.'),],
            widget=forms.TextInput(attrs={'placeholder':'project1_pipeline'}))
    # input file name
    input_filename = forms.CharField(label="Input file name")
    # input file type
    input_filetype = forms.ChoiceField(choices=choices.fileTypes,label="Input file type")
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.helper = FormHelper
        self.helper.form_method = 'post' # use post method
        #self.helper.form_action = 'download/'
        self.helper.layout = Layout(
                Row(
                    Column('softwarePath', css_class='form-group col-md-6 mb-0'),
                    Column('pipeline_name', css_class='form-group col-md-6 mb-0'),
                    css_class='form-row'
                    ),
                Row(
                    Column('input_filename', css_class='form-group col-md-6 mb-0'),
                    Column('input_filetype', css_class='form-group col-md-6 mb-0'),
                    css_class='form-row'
                    ),
                ButtonHolder(
                    Submit('submit', 'Submit', css_class='btn-success'),
                    ),
        )

