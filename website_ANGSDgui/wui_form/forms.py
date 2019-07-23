from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit
from django.core import validators
from django import forms
from . import choices

class UI_Form(forms.Form):
    softwarePath = forms.CharField(required=False, label="Software path:") # output of which $SOFTWARE
    pipeline_name = forms.CharField(required=False,
            label="Pipeline name:",
            validators=[
                validators.RegexValidator(regex='^[a-zA-Z0-9]*$', message='Please enter a valid pipeline name.'),
                ])
    input_filename = forms.CharField(label="Input file name:")
    input_filetype = forms.ChoiceField(choices=choices.fileTypes,label="Input file type:")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.helper = FormHelper
        self.helper.form_method = 'post' # use post method
        self.helper.layout = Layout(
                'softwarePath',
                'pipeline_name',
                'input_filename',
                'input_filetype',
                Submit('submit', 'Submit', css_class='btn-success')
        )
