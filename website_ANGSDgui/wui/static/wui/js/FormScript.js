// enable strict mode
"use strict";

// define variables
// initial
var CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n\n";
var OutField = document.getElementById("code");

// step 1
var PipelineName = document.getElementById("pipelineName");
var YourPipelineName = document.getElementById("yourPipelineName");
var Analysis = document.getElementById("analysis");  

// step 2
var InfileName = document.getElementById("infileName");
var Step2Div = document.getElementById("step-2-div");
//var SoftwarePath = document.getElementById("softwarePath");

// define selection attributes
var InfileTypes = {
    "":" ",
    "BAM":" -bam",
    "CRAM":" -bam",
    "mpileup":" -pileup",
    "VCF":" -vcf-gl",
    "BCF":" -vcf-gl",
    "GLF":" -glf",
    "beagle":" -beagle",
}

// define functions for step1 inputs

//var getSoftwarePath = function(){
//    if(SoftwarePath.value){
//        return SoftwarePath.value + "/angsd ";
//    }else{
//        return "angsd ";
//    }
//}

var getInfileName = function(){
    if(InfileName.value){
        return " " +InfileName.value;
    }else{
        return "";
    }
}

var getPipelineName = function(){
    if(PipelineName.value){
        YourPipelineName.innerHTML = PipelineName.value;
    }else{
        YourPipelineName.innerHTML = "";
    }
}

var addFormCol = function(DivId, ObjectName, ObjectPop, ObjectLabel){
    var Div1 = document.createElement('div');
    Div1.classList.add("formColumn");
    var DocumentFragment = document.createDocumentFragment();
    DocumentFragment.appendChild(Div1);
    Div1.appendChild(ObjectPop);
    Div1.appendChild(ObjectLabel);
    Div1.appendChild(ObjectName);
    DivId.appendChild(DocumentFragment);
}

var addFormRow = function(DivId, ObjectName, ObjectPop, ObjectLabel){
    var Div1 = document.createElement('div');
    var Div2 = document.createElement('div');
    Div1.classList.add("row", "form-row");
    Div2.classList.add("formColumn");
    var DocumentFragment = documenti.createDocumentFragment();
    DocumentFragment.appendChild(Div1);
    Div1.appendChild(Div2);
    Div2.appendChild(ObjectPop);
    Div2.appendChild(ObjectLabel);
    Div2.appendChild(ObjectName);
    DivId.appendChild(DocumentFragment);
}

// dynamic popover
var createPopover = function(Pop, Title, Content){
    Pop.href = "#";
    Pop.setAttribute("data-toggle", "popover");
    Pop.setAttribute("data-trigger", "focus");
    Pop.setAttribute("title", Title);
    Pop.setAttribute("data-content", Content);
}

// dynamic labelling
var createLabel = function(Label, ForName, LabelText){
    Label.setAttribute("for", ForName);
    Label.classList.add("col-form-label", "requiredField");
    Label.innerHTML = LabelText;
}

// dynamic select
var createSelect = function(Select, SelectId, OptionList){
    Select.id = SelectId;
    Select.classList.add("select", "form-control");
    Select.setAttribute("onChange", "rewriteCode();");
    Select.required = true;
    Select.length = 0;
    for (var key in OptionList) {
        Select.options[Select.options.length] = new Option(key, OptionList[key])
    }
}

// write step 2 according to analysis selection
var getAnalysis = function(AnalysisNo){

    // site frequency spectrum
    if (AnalysisNo == 1){

        var InfileType = document.createElement('select');  
        createSelect(InfileType, "infileType", InfileTypes);
        var InfileTypeLabel = document.createElement('label');
        createLabel(InfileTypeLabel, InfileType.id, "Input file type");
        var InfileTypePop = document.createElement('a');
        createPopover(InfileTypePop, "title", "content");
        addFormCol(Step2Div, InfileType, InfileTypePop, InfileTypeLabel);
    }
}


// define functions for step2 inputs
var getInfileType = function(){
    var InfileType = document.getElementById("infileType");
    if (InfileType){  // if object exists
        if (InfileType.value){
            return InfileType.value;
        }else{
            return "";
        }
    }else{
        return "";
    }
}


// stepping form
// using jQuery
$(document).ready(function () {
    var navListItems = $('div.setup-panel div button'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
        $item = $(this);
        
        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
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
            curInputs = curStep.find("input[required],select[required]"),
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


var FunctionList = [
    getInfileType,
    getInfileName,
];


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
    getPipelineName();
    var newCode = updateCode();
    OutField.innerHTML = newCode;
}


// rewrite code on window onload
window.onload=rewriteCode();
