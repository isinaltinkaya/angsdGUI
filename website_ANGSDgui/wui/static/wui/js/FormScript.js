// enable strict mode to write a better code
"use strict";

// define initial variables
var CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n";
var OutField = document.getElementById("code");

// step 1
var PipelineName = document.getElementById("pipelineName");
var YourPipelineName = document.getElementById("yourPipelineName");
var Analysis = document.getElementById("analysis");  

// step 2
var Step2Div = document.getElementById("step-2-div");

// step 3
var Step3Div = document.getElementById("step-3-div");

// define selection attributes
var InfileTypes = {
    " ":"",
    "bam/bamlist":" -bam",
    "cram":" -bam",
    "mpileup":" -pileup",
    "vcf":" -vcf-gl",
    "bcf":" -vcf-gl",
    "glf.gz":" -glf",
    "glf10_text":" -glf10_text",
    "beagle":" -beagle",
};

// define functions for step1 inputs

// get and write pipeline name on code block header
var getPipelineName = function(){
    if(PipelineName.value){
        YourPipelineName.innerHTML = PipelineName.value;
    }else{
        YourPipelineName.innerHTML = "";
    }
}

// clear all childs of div
var clearDiv = function(Div){
    var child = Div.lastElementChild;
    while (child){
        Div.removeChild(child);
        child = Div.lastElementChild;
    }
}

// enable new popovers
var enableNewPops = function(){
    $('[data-toggle="popover"]').popover({html:true});   
}

// dynamic popover
var createPopover = function(Pop, Title, Content){
    Pop.href = "#";
    Pop.setAttribute("data-toggle", "popover");
    Pop.setAttribute("data-trigger", "focus");
    Pop.setAttribute("title", "");
    Pop.setAttribute("data-content", Content);
    Pop.setAttribute("data-original-title", Title);
    var InfileTypePopI = document.createElement('i');
    InfileTypePopI.classList.add("QuestionMark", "fa", "fa-question-circle");
    Pop.appendChild(InfileTypePopI);
}

// dynamic label
var createLabel = function(Label, ForName, LabelText, Required){
    Label.setAttribute("for", ForName);
    Label.classList.add("col-form-label", "form-control-label");
    Label.innerHTML = LabelText;
    if (Required == "Required"){
        Label.classList.add("requiredField");
        Label.innerHTML = LabelText + '<span class="asteriskField">*</span>';
    }
}

// dynamic input
var createInput = function(Input, InputId, Required){
    Input.id = InputId;
    Input.classList.add("textInput", "form-control");
    Input.setAttribute("type", "text");
    Input.setAttribute("name", InputId);
    Input.setAttribute("oninput", "rewriteCode();");
    Input.setAttribute("onpaste", "rewriteCode();");
    if (Required == "Required"){
        Input.setAttribute("required", "required");
    }
}

// dynamic select
var createSelect = function(Select, SelectId, OptionList, Required){
    Select.id = SelectId;
    Select.classList.add("select", "form-control");
    Select.setAttribute("name", SelectId);
    Select.setAttribute("onChange", "rewriteCode();");
    if (Required == "Required"){
        Select.setAttribute("required", "required");
    }
    //Select.required = true;
    Select.length = 0;
    for (var key in OptionList) {
        Select.options[Select.options.length] = new Option(key, OptionList[key]);
    }
}

// add item to a specific div
var addFormItem = function(DivId, ObjectPop, ObjectLabel, ObjectName){
    var Div1 = document.createElement('div');
    Div1.classList.add("formItem");
    var DocumentFragment = document.createDocumentFragment();
    DocumentFragment.appendChild(Div1);
    Div1.appendChild(ObjectPop);
    Div1.appendChild(ObjectLabel);
    Div1.appendChild(ObjectName);
    DivId.appendChild(DocumentFragment);
}

// call required software
var callSoftware = function(Software){
    
    if (Software == "realSFS"){

        var realSFS = document.getElementById("realSFS");
        if (realSFS){
            return getSoftwarePath(Software); 
        }
        /*
        if realSFS input does not exist
        create realSFS path input
        */
        var realSFS = document.createElement('input');
        createInput(realSFS, "realSFS");
        var realSFSLabel = document.createElement('label');
        createLabel(realSFSLabel, realSFS.id, " Path of realSFS ");
        var realSFSPop = document.createElement('a');
        createPopover(
                realSFSPop, 
                "Path of realSFS Software", 
                "Path of realSFS in your file system. For Linux, it can be found with command <code>which realSFS</code>. <br /> e.g. <code>/usr/bin/angsd/misc/realSFS</code>"
        );
        addFormItem(Step2Div, realSFSPop, realSFSLabel, realSFS);

        // enable new popovers
        enableNewPops();

    } else if (Software == "angsd"){
        

    }
}


// define functions for step2 inputs
var getInfileType = function(){

    var InfileType = document.getElementById("infileType");

    // if element exists
    if (InfileType){

        if (InfileType.value){
            // special cases require functions
            if (InfileType.value == "saf"){
                dorealSFS();
                return getSoftwarePath("realSFS");
            }
            return InfileType.value;
        }
        return "";
    }
    return "";
}


var getSoftwarePath = function(Software){

    var SoftwarePath = document.getElementById(Software);

    if(SoftwarePath){

        if(SoftwarePath.value){
            return SoftwarePath.value + " ";
        }
        return Software + " ";
    }
    return Software + " ";
}


var dorealSFS = function(){
    
    callSoftware("realSFS");

    var realSFS_Region = document.getElementById("realSFS_Region");
    if (realSFS_Region){
        return; 
    }

    // create region input
    var realSFS_Region = document.createElement('input');
    createInput(realSFS_Region, "realSFS_Region");
    var realSFS_RegionLabel = document.createElement('label');
    createLabel(realSFS_RegionLabel, realSFS_Region.id, " Region ");
    var realSFS_RegionPop = document.createElement('a');
    createPopover(
            realSFS_RegionPop, 
            "Region", 
            `Do SFS with a chromosome or region.<br /> 
            e.g. <code>22</code> for Chromosome 22 or <br />
            <code>22:1000-20000</code> for region 1000-20000 in Chromosome 22.
            `
    );
    addFormItem(Step2Div, realSFS_RegionPop, realSFS_RegionLabel, realSFS_Region);
    FunctionList.push(getValue.bind(null, " -r ", "realSFS_Region"));

    // enable new popovers
    enableNewPops();



    // create number of sites input


}

var getValue = function(param, id){

    var Element = document.getElementById(id);

    if(Element){
        if(Element.value){
            return param + Element.value;
        }
        return "";
    }
    return "";
}


// define initial list of functions
var FunctionList = [];


// write step 2 according to analysis selection
var getAnalysis = function(AnalysisNo){

    // clear step 2 if previously created
    clearDiv(Step2Div);

    // clear list of functions
    FunctionList = [];

    // if no analyses selected
    if (AnalysisNo == 0){
        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n";
        rewriteCode();

    // site frequency spectrum
    }else if (AnalysisNo == 1){

        // add analysis specific input files
        InfileTypes["saf.idx"] = "saf"    

        // create input file type select
        var InfileType = document.createElement('select');  
        createSelect(InfileType, "infileType", InfileTypes, "Required");
        var InfileTypeLabel = document.createElement('label');
        createLabel(InfileTypeLabel, InfileType.id, " Input file type ", "Required");
        var InfileTypePop = document.createElement('a');
        createPopover(
                InfileTypePop, 
                "Input File Type", 
                "File type of input file."
        );
        addFormItem(Step2Div, InfileTypePop, InfileTypeLabel, InfileType);
        FunctionList.push(getInfileType);
     
        // create input file name input
        var InfileName = document.createElement('input');
        createInput(InfileName, "infileName", "Required");
        var InfileNameLabel = document.createElement('label');
        createLabel(InfileNameLabel, InfileName.id, " Input file name ", "Required");
        var InfileNamePop = document.createElement('a');
        createPopover(
                InfileNamePop, 
                "Input File Name", 
                "Name of the input file to be used in the analysis. Including extensions if any.<br /> e.g. <code>myfile.bamlist</code>"
        );
        addFormItem(Step2Div, InfileNamePop, InfileNameLabel, InfileName);
        FunctionList.push(getValue.bind(null, "", "infileName"));

        // enable new popovers
        enableNewPops();

        // add analysis name to pipeline header
        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#Site frequency spectrum analysis\n\n";

        // update pipeline
        rewriteCode();


    // population branch statistics
    } else if (AnalysisNo == 2){

        // enable new popovers
        enableNewPops();

        // add analysis name to pipeline header
        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#Population branch statistics\n\n";

        // update pipeline
        rewriteCode();


    // calculate depth
    } else if (AnalysisNo == 3){

        // enable new popovers
        enableNewPops();

        // add analysis name to pipeline header
        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#Depth calculation\n\n";

        // update pipeline
        rewriteCode();

    }

}


// stepping form
// using jQuery
$(document).ready(function(){

    var navListItems = $('div.setup-panel div button'),
        allContent = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allContent.hide();

    navListItems.click(function(e){
        e.preventDefault();
        var $target = $($(this).attr('href')),
        $item = $(this);
        
        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary','disabled');
            allContent.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
  
    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div button[href="#' + curStepBtn + '"]').parent().prev().children("button");

            prevStepWizard.removeAttr('disabled').trigger('click');
  });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div button[href="#' + curStepBtn + '"]').parent().next().children("button"),
            curInputs = curStep.find("input[required], select[required]"),
            isValid = true;
    
        $(".form-control").removeClass("is-invalid");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-control").addClass("is-invalid");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
     
    });

    $('div.setup-panel div button.btn-primary').trigger('click');

});



// update code onkeyup
var updateCode = function(){
    var code = CodeHeader;
    for (var i=0; i<FunctionList.length; i++){
        code += FunctionList[i]();
    } 
    return code;
}


// rewrite code
var rewriteCode = function(){
    var newCode = updateCode();
    OutField.innerHTML = newCode;
}


// rewrite code on window onload
window.onload=function(){
    rewriteCode();
    document.getElementById("pipelineName").value = "";
    //document.getElementById("analysis").value = "";
}
