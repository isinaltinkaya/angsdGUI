// enable strict mode to write a better code
"use strict";


// define initial variables
var CodeHeader = "#!bin/bash\n#Generated by angsdGUI\n";
var OutField = document.getElementById("code");
var PipelineName = document.getElementById("pipelineName");
var YourPipelineName = document.getElementById("yourPipelineName");
var Analysis = document.getElementById("analysis");  

// declare global variables
var AnalysisName;
var Software;
var Data;
// read json file using jquery
var getJSON = $.ajax({
	url: 'angsd.json',
	type: 'GET',
	dataType: 'json',
	dataContent: 'application/json',
	data: {get_param: 'value'},
	success: function (data) {
		Data = getJSON.responseJSON;
	}
});
// define selection attributes
//var InfileTypes = {
    //" ":"",
    //"bam/bamlist":"-bam",
    //"cram":"-bam",
    //"mpileup":"-pileup",
    //"vcf":"-vcf-gl",
    //"bcf":"-vcf-gl",
    //"glf.gz":"-glf",
    //"glf10_text":"-glf10_text",
    //"beagle":"-beagle",
//};


var BamOpts = {
    " ":"",
    "Region":"bamr",
    "Region file":"bamrf",
    "Remove bads":"bam_remove_bads",
    "Unique only":"bam_uniqueOnly",
    "Min mapQ quality":"bam_minMapQ",
    "Trim":"bam_trim",
    "Only proper pairs":"bam_only_proper_pairs",
    "Supply BAQ":"bam_baq",
    "Check Bam headers":"bam_checkBamHeaders",
    "Downsample":"bam_downSample",
    "Set min chunk size":"bam_setMinChunkSize",
}

    
var BamOptsParam = {
    " ":"",
    "bamr":"-r",
    "bamrf":"-rf",
    "bam_remove_bads":"-remove_bads",
    "bam_uniqueOnly":"-uniqueOnly",
    "bam_minMapQ":"-minMapQ",
    "bam_rim":"-trim",
    "bam_only_proper_pairs":"-only_proper_pairs",
    "bam_baq":"-baq",
    "bam_checkBamHeaders":"-checkBamHeaders",
    "bam_downSample":"-downSample",
    "bam_setMinChunkSize":"-setMinChunkSize",
}


// add virtual step buttons
var addVBtn = function(Step){

    var Btn = $('<button/>').attr({type: "button", style: "display: none;", disabled: "disabled"});
    Btn.addClass('virtualbtn');
    Btn.attr('href', '#' + Step);
    var Path = "div." + Step;
    $(Path).append(Btn);

}


// get and write pipeline name on code block header
var getPipelineName = function(){
    if(PipelineName.value){
        YourPipelineName.innerHTML = PipelineName.value + ".sh";
    }else{
        YourPipelineName.innerHTML = "angsdGUI_pipeline.sh";
    }
}


// remove a specific div
var rmDiv = function(DivId){
    var Div = document.getElementById(DivId);

}


// remove substeps following current step
var rmSubSteps = function(){

    var SubSteps = $(".CurrentStep").nextUntil(".step-last");

    // if SubSteps exists
    if (SubSteps){
        SubSteps.remove();
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
var createSelect = function(Select, SelectId, OptionList, Required, onChange){
    Select.id = SelectId;
    Select.classList.add("select", "form-control");
    Select.setAttribute("name", SelectId);
    if (onChange){
        Select.setAttribute("onChange", onChange);
    } else {
        Select.setAttribute("onChange", "rewriteCode();");
    }
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
var addFormItem = function(DivId, ObjectName, ObjectLabel, ObjectPop, Generation){
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



var nextStep = function(Step){

    var StepNo = Step.slice(5,6);
    StepNo++;
    return "step-" + StepNo;

}


var addOptItem = function(FaClass, FaFunction, ObjectPop, ObjectLabel, ObjectName, Generation){

    var CurrentStep = document.getElementsByClassName("CurrentStep")[0].id;
    var CurrentDiv = CurrentStep + "-div";
    if (isFull(CurrentStep)){
        // if current step is full
        CurrentStep = nextStep(CurrentStep);
        CurrentDiv = CurrentStep + "-div";
        var Div = document.getElementById(CurrentDiv);
    } else {
        // current step is not full
        var Div = document.getElementById(CurrentDiv);
    }

    var Div1 = document.createElement('div');
    Div1.classList.add("formItem");

    if (Generation){
        // add generation
        Div1.classList.add(Generation);
    }

    var Fa = document.createElement('i');
    Fa.classList.add("fa", FaClass);
    // Fa icon onclick function
    Fa.setAttribute("onclick", FaFunction)

    var DocumentFragment = document.createDocumentFragment();
    DocumentFragment.appendChild(Div1);
    Div1.appendChild(ObjectPop);
    Div1.appendChild(ObjectLabel);
    Div1.appendChild(Fa);
    Div1.appendChild(ObjectName);
    Div.appendChild(DocumentFragment);
    
}


// add bam options
var addBamOpt = function(){

    // check if bamOpt select exists
    if (document.getElementById("bamOpt")){
        return;
    }

    var BamOpt = document.createElement('select');
    createSelect(BamOpt, "bamOpt", BamOpts);
    
    var BamOptLabel = document.createElement('label');
    createLabel(BamOptLabel, BamOpt.id, " Add options ");

    var BamOptPop = document.createElement('a');
    createPopover(
            BamOptPop,
            "Add additional options for bam file",
            `Choose the option you want to add, and new option will be added when you click the plus sign.
            Add the option to see the details about that option.
            `
    );
    addOptItem("fa-plus", "addNewOpt('bamOpt');", BamOptPop, BamOptLabel, BamOpt, "G2");

    enableNewPops();

}


var addNewOpt = function(OptItem){

    var Item = document.getElementById(OptItem);
    var NewOptId = Item.options[Item.selectedIndex].value; 

    // if no options selected, do not add a new option
    if (!NewOptId){ return; }

    // if element exists, do not add the element
    if (document.getElementById(NewOptId)){ return; }

    var NewOptText = Item.options[Item.selectedIndex].text;
    var NewOpt = document.createElement('input');
    createInput(NewOpt, NewOptId);
    var NewOptLabel = document.createElement('label');
    createLabel(NewOptLabel, NewOptId, " "+ NewOptText +" ");
    var NewOptPop = document.createElement('a');
    createPopover(
            NewOptPop, 
            "Info", 
            `Info <br /> 
            e.g. <code>chr22</code> for Chromosome 22<br />
            e.g. <code>chr22:100000-2000000</code> for region 100000-2000000 in Chromosome 22.
            `
    );
    var MinusFunction = "killMe('" + NewOptId + "');";
    addOptItem("fa-minus", MinusFunction , NewOptPop, NewOptLabel, NewOpt, "G3");
    FunctionList.push(getValue.bind(null, BamOptsParam[NewOptId], NewOptId));

    enableNewPops();

}


// delete your own item
var killMe = function(MyId){

    var Me = document.getElementById(MyId);
    Me.parentNode.parentNode.removeChild(Me.parentNode);
    rewriteCode();

}


// clear generated form items
var clearGen = function(Generation){

    var finder = '.' + Generation;
    $(finder).remove();

    // clear sub generations too
    if (Generation == "G2"){
        $(".G3").remove();
    }

}


// InfileType onchange
var ocInfileType = function(){

    // change analysis name according to infile type
    AnalysisName = Analysis.options[Analysis.selectedIndex].value;


    // clear generation from previous choice
    clearGen("G2");

    // remove previously generated substeps
    rmSubSteps();

    var InfileType = document.getElementById("infileType");
    
    // generate the new generation
    // if element exists
    if (InfileType){

        if (InfileType.options[InfileType.selectedIndex].text){

            var AnalysisInfile = InfileType.options[InfileType.selectedIndex].text;
            Software = Data[AnalysisName].Software[AnalysisInfile];

            addSoftwarePath(Software)   ;

        }
    }

    // update pipeline
    rewriteCode();

}


// get infile type to modify pipeline
//var getInfileType = function(){

    //var InfileType = document.getElementById("infileType");

    //// if element exists
    //if (InfileType){

        //if (InfileType.value){

            //var type = InfileType.value;

            //// special cases require functions
            //if (type == "saf"){
                //return getSoftwarePath("realSFS");
            //}
            //if (type == "-bam"){
                //return getSoftwarePath("angsd") + " " + InfileType.value;
            //}
            //return "";
        //}
        //return "";
    //}
    //return "";
//}


//var dorealSFS = function(){
    
    //callSoftware("realSFS");

    //// check region input
    //if (document.getElementById("realSFS_Region")){
        //return; 
    //}

    //// create region input
    //var realSFS_Region = document.createElement('input');
    //createInput(realSFS_Region, "realSFS_Region");
    //var realSFS_RegionLabel = document.createElement('label');
    //createLabel(realSFS_RegionLabel, realSFS_Region.id, " Region ");
    //var realSFS_RegionPop = document.createElement('a');
    //createPopover(
            //realSFS_RegionPop, 
            //"Define a region", 
            //`Do SFS with a chromosome or region.<br /> 
            //e.g. <code>chr22</code> for Chromosome 22<br />
            //e.g. <code>chr22:100000-2000000</code> for region 100000-2000000 in Chromosome 22.
            //`
    //);
    //addFormItem("step-2-div", realSFS_RegionPop, realSFS_RegionLabel, realSFS_Region, "G2");
    //FunctionList.push(getValue.bind(null, "-r", "realSFS_Region"));


    //// check nSites input
    //if (document.getElementById("realSFS_nSites")){
        //return; 
    //}

    //// create number of sites input
    //var realSFS_nSites = document.createElement('input');
    //createInput(realSFS_nSites, "realSFS_nSites");
    //var realSFS_nSitesLabel = document.createElement('label');
    //createLabel(realSFS_nSitesLabel, realSFS_nSites.id, " Number of sites ");
    //var realSFS_nSitesPop = document.createElement('a');
    //createPopover(
            //realSFS_nSitesPop, 
            //"Number of sites", 
            //`Limit SFS to a fixed number of sites. <br /> 
             //<code>-nSites</code> is used for choosing a max number of sites that should be used for the optimization. Using more sites will give you more reliable estimates. If you dont specify anything it will try to load all sites into memory. 
            //`
    //);
    //addFormItem("step-2-div", realSFS_nSitesPop, realSFS_nSitesLabel, realSFS_nSites, "G2");
    //FunctionList.push(getValue.bind(null, "-nSites", "realSFS_nSites"));


    //// enable new popovers
    //enableNewPops();

//}


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


// get software path if exists
var getSoftwarePath = function(Software){

    var SoftwarePath = document.getElementById(Software);

    // if element exists
    if(SoftwarePath){

        if(SoftwarePath.value){

            // return what user wrote
            return SoftwarePath.value;

        }

        return Data.Softwares[Software].Call;
    }
    return;
}


                //note
                //return getSoftwarePath("angsd") + " " + InfileType.value;

var addSoftwarePath = function(Software){
    
    //var existsSoft = document.getElementById("realSFS");
    //if (realSFS){
        //return getSoftwarePath(Software); 
    //}
    /*
    if realSFS input does not exist
    create realSFS path input
    */
    var SoftwareInfo = Data.Softwares[Software]
    var Soft = document.createElement('input');
    createInput(Soft, AnalysisName);
    var SoftLabel = document.createElement('label');
    createLabel(SoftLabel, SoftLabel.id, SoftwareInfo.Label);
    var SoftPop = document.createElement('a');
    createPopover(
        SoftPop, 
        SoftwareInfo.PopTitle, 
        SoftwareInfo.PopExp
    );
    addFormItem("step-2-div", Soft, SoftLabel, SoftPop, "G2");

    //FunctionList.push(getSoftwarePath(Software));

    // enable new popovers
    enableNewPops();

}



// define initial list of functions
var FunctionList = [];


// write step 2 according to analysis selection
var getAnalysis = function(){

    AnalysisName = Analysis.options[Analysis.selectedIndex].value;

    // remove previously generated substeps
    rmSubSteps();

    // clear list of functions
    FunctionList = [];

    console.log("here1")

    console.log(Analysis.options[Analysis.selectedIndex].value)

    // if analysis selected
    if (Analysis.options[Analysis.selectedIndex].value) {

        console.log("success")


        var InfileTypes = Data[AnalysisName].Infiles;

        // create input file type select
        var InfileType = document.createElement('select');  
        createSelect(InfileType, "infileType", InfileTypes, "Required", "ocInfileType();");
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
        addFormItem("step-2-div", InfileType, InfileTypeLabel, InfileTypePop);

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
        addFormItem("step-2-div", InfileName, InfileNameLabel, InfileNamePop);
        FunctionList.push(getValue.bind(null, "", "infileName"));

        // enable new popovers
        enableNewPops();

        // add analysis name to pipeline header
        CodeHeader = "#!bin/bash\n#Generated by angsdGUI\n#"+ Data[AnalysisName].Name + "\n\n";

        // update pipeline
        rewriteCode();
    }
    else {

        CodeHeader = "#!bin/bash\n#Generated by angsdGUI\n";
        rewriteCode();
            
    }
}

    
// add dynamic step
//var addStep = function(StepId){

    //if(document.getElementById(StepId)){
        //return;
    //}

    //// add new step
    //var NewStep = document.createElement('div');
    //NewStep.id = StepId;
    //NewStep.setAttribute("style","display: none;");
    //NewStep.classList.add("row", "setup-content", "substep", StepId);

    //// add new step div to add items later 
    //var NewStepDiv = document.createElement('div');
    //NewStepDiv.id = StepId + "-div";
    //NewStepDiv.classList.add("form-grid");

    //// add new step buttons
    //var NewStepBtn = document.createElement('div');
    //NewStepBtn.classList.add("row", "button-row");
    //var PrevBtn = document.createElement('button');
    //PrevBtn.classList.add("btn","btn-primary","prevBtn","btn-lg","pull-left");
    //PrevBtn.innerHTML = "Previous";
    //PrevBtn.setAttribute("type", "button");
    //var Divider = document.createElement('div');
    //Divider.classList.add("divider");
    //var NextBtn = document.createElement('button');
    //NextBtn.classList.add("btn","btn-primary","nextBtn","btn-lg","pull-right");
    //NextBtn.innerHTML = "Next";
    //NextBtn.setAttribute("type", "button");
    //NextBtn.setAttribute("data-toggle", "tooltip");
    //NextBtn.setAttribute("data-original-title", "New options in the next step!");
    //var BtnFragment = document.createDocumentFragment();
    //BtnFragment.appendChild(PrevBtn);
    //BtnFragment.appendChild(Divider);
    //BtnFragment.appendChild(NextBtn);
    //NewStepBtn.appendChild(BtnFragment);

    //var DocumentFragment = document.createDocumentFragment();
    //DocumentFragment.appendChild(NewStepDiv);
    //DocumentFragment.appendChild(NewStepBtn);
    //NewStep.appendChild(DocumentFragment);
    
    //var LastStep = document.getElementById("step-last");

    //LastStep.parentNode.insertBefore(NewStep, LastStep);

    //// add virtual button for stepping form
    //addVBtn(StepId);

    //// activate stepping form buttons
    //activateStep();

    //// trial
    //var CurrentStepId = $(".CurrentStep").attr("id");
    //var Tooltip = $("." + CurrentStepId + " .button-row .nextBtn");
    //Tooltip.tooltip("show");
    //// wait 3 seconds and hide the message
    //setTimeout(function(){Tooltip.tooltip("hide")}, 3000);

//}


// check if step is full
var isFull = function(Step){
 
    var Parent = document.getElementById(Step);
    var FormItems = Parent.getElementsByClassName("formItem");
    if (FormItems.length > 7){
        return true;
    }
    return false;

}


// update navigation bar
var updNavBar = function(CurrentStep){

    var AllNav = $('.stepwizard-step button');
    var MainSteps = ["step-1", "step-last"];
    if (MainSteps.includes(CurrentStep)){ 
        var CurrentNav = $('.stepwizard-step .' + CurrentStep);
    } else {
        // current step is a substep
        var CurrentNav = $('.stepwizard-step .substep');
    }

    AllNav.removeClass('btn-primary').addClass('btn-default');
    CurrentNav.removeClass('btn-default').addClass('btn-primary');

}


// stepping form
// using jQuery
var activateStep = function(){

    var VirtualBtn = $('.virtualbtn'),
        AllContent = $('.setup-content'),
        AllNextBtn = $('.nextBtn'),
        AllPrevBtn = $('.prevBtn');


    AllContent.hide();


    VirtualBtn.click(function(e){
        e.preventDefault();
        var $target = $($(this).attr('href')),
        $item = $(this);
        
        if (!$item.hasClass('disabled')) {
            AllContent.hide();

            // remove all current step classes
            AllContent.removeClass('CurrentStep');

            // show target step
            $target.show();
            // set target step as current step
            $target.addClass('CurrentStep');
            $target.find('input:eq(0)').focus();
        }
    });

  
    AllPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepId = curStep.attr("id"),
            prevStepWizard = $('div.CurrentStep button[href="#' + curStepId + '"]').parent().prev().children("button"),
            PrevStep = document.getElementById(curStepId).previousElementSibling.id;

        updNavBar(PrevStep);

        prevStepWizard.removeAttr('disabled').trigger('click');
            
    });


    AllNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepId = curStep.attr("id"),
            nextStepWizard = $('div.CurrentStep button[href="#' + curStepId + '"]').parent().next().children("button"),
            NextStep = document.getElementById(curStepId).nextElementSibling.id,
            curInputs = curStep.find("input[required], select[required]"),
            isValid = true;

        $(".form-control").removeClass("is-invalid");

        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-control").addClass("is-invalid");
            }
        }

        if (isValid){
            updNavBar(NextStep);
            nextStepWizard.removeAttr('disabled').trigger('click');
        }
     
    });


    // runs onload, loads initial step-1
    $('div.CurrentStep .virtualbtn').trigger('click');
    var curStepId = $(".CurrentStep").attr("id");
    updNavBar(curStepId);

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


// rewrite code when document is ready
$(document).ready(function(){
    // add initial step virtual buttons
    addVBtn("step-1");
    addVBtn("step-last");
    activateStep();
    rewriteCode();
    getAnalysis();
    getPipelineName();
});
