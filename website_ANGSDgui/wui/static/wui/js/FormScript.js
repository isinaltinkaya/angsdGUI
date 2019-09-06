// enable strict mode to write a better code
"use strict";

// define initial variables
var CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n";
var OutField = document.getElementById("code");
var PipelineName = document.getElementById("pipelineName");
var YourPipelineName = document.getElementById("yourPipelineName");
var Analysis = document.getElementById("analysis");  

// step 3
//var Step3Div = document.getElementById("step-3-div");

// define selection attributes
var InfileTypes = {
    " ":"",
    "bam/bamlist":"-bam",
    "cram":"-bam",
    "mpileup":"-pileup",
    "vcf":"-vcf-gl",
    "bcf":"-vcf-gl",
    "glf.gz":"-glf",
    "glf10_text":"-glf10_text",
    "beagle":"-beagle",
};


// get and write pipeline name on code block header
var getPipelineName = function(){
    if(PipelineName.value){
        YourPipelineName.innerHTML = PipelineName.value;
    }else{
        YourPipelineName.innerHTML = "";
    }
}


// clear all childs of div
var clearDiv = function(DivId){
    var Div = document.getElementById(DivId);
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
var addFormItem = function(DivId, ObjectPop, ObjectLabel, ObjectName, Generation){
    var Div = document.getElementById(DivId);
    var Div1 = document.createElement('div');
    Div1.classList.add("formItem");
    if (Generation){
        // add generation
        Div1.classList.add(Generation);
    }
    var DocumentFragment = document.createDocumentFragment();
    DocumentFragment.appendChild(Div1);
    Div1.appendChild(ObjectPop);
    Div1.appendChild(ObjectLabel);
    Div1.appendChild(ObjectName);
    Div.appendChild(DocumentFragment);
}


var getSoftwarePath = function(Software){

    var SoftwarePath = document.getElementById(Software);

    if(SoftwarePath){

        if(SoftwarePath.value){
            return SoftwarePath.value;
        }
        return Software;
    }
    return Software;
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
        createLabel(realSFSLabel, realSFS.id, " Path to realSFS ");
        var realSFSPop = document.createElement('a');
        createPopover(
                realSFSPop, 
                "Path to realSFS Software", 
                `Path to realSFS in your file system. If empty, realSFS will be called as <code>realSFS</code>.<br />
                For Linux systems, it can be found with command <code>which realSFS</code>.<br />
                e.g. <code>/usr/bin/angsd/misc/realSFS</code><br />
                `
        );
        addFormItem("step-2-div", realSFSPop, realSFSLabel, realSFS, "gen2");

        // enable new popovers
        enableNewPops();

    } else if (Software == "angsd"){
        
        var angsd = document.getElementById("angsd");
        if (realSFS){
            return getSoftwarePath(Software);
        }

        var angsd = document.createElement('input');
        createInput(angsd, "angsd");
        var angsdLabel = document.createElement('label');
        createLabel(angsdLabel, angsd.id, " Path to angsd ");
        var angsdPop = document.createElement('a');
        createPopover(
                angsdPop,
                "Path to angsd Software", 
                `Path to angsd in your file system. If empty, angsd will be called as <code>angsd</code>.<br />
                For Linux systems, it can be found with command <code>which angsd</code>.<br />
                e.g. <code>/usr/bin/angsd/angsd</code><br />
                `
        );
        addFormItem("step-2-div", angsdPop, angsdLabel, angsd, "gen2");

        // enable new popovers
        enableNewPops();

    }
}


// clear generated form items
var clearGen = function(Generation){

    var finder = '.' + Generation;
    $(finder).remove();

}


// define functions for next inputs
var getInfileType = function(){

    var InfileType = document.getElementById("infileType");

    // if element exists
    if (InfileType){

        if (InfileType.value){
            var type = InfileType.value;
            // special cases require functions
            if (type == "saf"){
                dorealSFS();
                return getSoftwarePath("realSFS");
            }
            if (type == "-bam"){
                clearGen("gen2");
                return getSoftwarePath("angsd") + " " + InfileType.value;
            }
            clearGen("gen2");
            return "";
        }
        return "";
    }
    return "";
}


var dorealSFS = function(){
    
    callSoftware("realSFS");

    // check region input
    if (document.getElementById("realSFS_Region")){
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
            "Define a region", 
            `Do SFS with a chromosome or region.<br /> 
            e.g. <code>chr22</code> for Chromosome 22<br />
            e.g. <code>chr22:100000-2000000</code> for region 100000-2000000 in Chromosome 22.
            `
    );
    addFormItem("step-2-div", realSFS_RegionPop, realSFS_RegionLabel, realSFS_Region, "gen2");
    FunctionList.push(getValue.bind(null, "-r", "realSFS_Region"));


    // check nSites input
    if (document.getElementById("realSFS_nSites")){
        return; 
    }

    // create number of sites input
    var realSFS_nSites = document.createElement('input');
    createInput(realSFS_nSites, "realSFS_nSites");
    var realSFS_nSitesLabel = document.createElement('label');
    createLabel(realSFS_nSitesLabel, realSFS_nSites.id, " Number of sites ");
    var realSFS_nSitesPop = document.createElement('a');
    createPopover(
            realSFS_nSitesPop, 
            "Number of sites", 
            `Limit SFS to a fixed number of sites. <br /> 
             <code>-nSites</code> is used for choosing a max number of sites that should be used for the optimization. Using more sites will give you more reliable estimates. If you dont specify anything it will try to load all sites into memory. 
            `
    );
    addFormItem("step-2-div", realSFS_nSitesPop, realSFS_nSitesLabel, realSFS_nSites, "gen2");
    FunctionList.push(getValue.bind(null, "-nSites", "realSFS_nSites"));


    // enable new popovers
    enableNewPops();

}


var getFileTypeOptions = function(FileType){

    callSoftware("angsd");
    
}


var getValue = function(param, id){

    var Element = document.getElementById(id);

    if(Element){
        if(Element.value){
            if(param){
                return " " + param + " " + Element.value;
            }
            return " " + Element.value;
        }
        return "";
    }
    return "";
}


// define initial list of functions
var FunctionList = [];


// write step 2 according to analysis selection
var getAnalysis = function(){
    
    // get analysis
    var Analysis = document.getElementById("analysis");
    var AnalysisNo = Analysis.selectedIndex;

    // clear step 2 if previously created
    if (document.getElementById("step-2-div")){
        clearDiv("step-2-div");
    }

    // clear list of functions
    FunctionList = [];

    // if no analysis selected
    if (AnalysisNo == 0){

        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n";
        rewriteCode();

    // site frequency spectrum
    }else if (AnalysisNo == 1){

        addStep("step-2");

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
                `File type of input file. <br />
                For more information, see <a href="http://www.popgen.dk/angsd/index.php/Input" target="_blank">angsd wiki input page</a>.
                `
        );
        addFormItem("step-2-div", InfileTypePop, InfileTypeLabel, InfileType);
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
                `Name of the input file to be used in the analysis. Including extensions if any.
                Provide path to input file if you are not going to run the code in the same directory as the input file.
                e.g. <code>/home/myuser/project/myfile.bamlist</code>`
        );
        addFormItem("step-2-div", InfileNamePop, InfileNameLabel, InfileName);
        FunctionList.push(getValue.bind(null, "", "infileName"));

        // enable new popovers
        enableNewPops();

        // add analysis name to pipeline header
        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#"+ Analysis.options[AnalysisNo].text + "\n\n";

        // update pipeline
        rewriteCode();


    // population branch statistics
    } else if (AnalysisNo == 2){

        // enable new popovers
        enableNewPops();

        // add analysis name to pipeline header
        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#"+ Analysis.options[AnalysisNo].text + "\n\n";
        //CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#Population branch statistics\n\n";

        // update pipeline
        rewriteCode();


    // calculate depth
    } else if (AnalysisNo == 3){

        // enable new popovers
        enableNewPops();

        // add analysis name to pipeline header
        CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#"+ Analysis.options[AnalysisNo].text + "\n\n";
        //CodeHeader = "#!bin/bash\n#Pipeline generated by ANGSDgui\n#Depth calculation\n\n";

        // update pipeline
        rewriteCode();

    }

}

// add dynamic step
var addStep = function(StepId){

    // add new step
    var NewStep = document.createElement('div');
    NewStep.id = StepId;
    NewStep.setAttribute("style","display: none;");
    NewStep.classList.add("row", "setup-content");

    // add new step div to add items later 
    var NewStepDiv = document.createElement('div');
    NewStepDiv.id = StepId + "-div";
    NewStepDiv.classList.add("form-grid");

    // add new step buttons
    var NewStepBtn = document.createElement('div');
    NewStepBtn.classList.add("row", "button-row");
    var PrevBtn = document.createElement('button');
    PrevBtn.classList.add("btn","btn-primary","prevBtn","btn-lg","pull-left");
    PrevBtn.innerHTML = "Previous";
    PrevBtn.setAttribute("type", "button");
    var Divider = document.createElement('div');
    Divider.classList.add("divider");
    var NextBtn = document.createElement('button');
    NextBtn.classList.add("btn","btn-primary","nextBtn","btn-lg","pull-right");
    NextBtn.innerHTML = "Next";
    NextBtn.setAttribute("type", "button");
    var BtnFragment = document.createDocumentFragment();
    BtnFragment.appendChild(PrevBtn);
    BtnFragment.appendChild(Divider);
    BtnFragment.appendChild(NextBtn);
    NewStepBtn.appendChild(BtnFragment);

    var DocumentFragment = document.createDocumentFragment();
    DocumentFragment.appendChild(NewStepDiv);
    DocumentFragment.appendChild(NewStepBtn);
    NewStep.appendChild(DocumentFragment);
    
    var LastStep = document.getElementById("step-3");

    LastStep.parentNode.insertBefore(NewStep, LastStep);

    // activate stepping form buttons
    activateStep();

}


// stepping form
// using jQuery
var activateStep = function(){

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

}


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
window.onload = function(){
}


$(document).ready(function(){
    activateStep();
    rewriteCode();
    getAnalysis();
    getPipelineName();
});
