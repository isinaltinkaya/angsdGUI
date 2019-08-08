// define empty dictionary
var dict = {};

// add functions to the dictionary
dict.softwarePath = function(){
    element = document.getElementById("softwarePath")
//    if (element.childNodes
    input = element.value;
    document.getElementById("code").innerHTML += input;
}

dict.infileName = function(){
    input = document.getElementById("infileName").value;
    document.getElementById("code").innerHTML += input;
}

// update code onkeyup
function updateCode(id){
    dict[id]();
}
