//// note for tomorrow >>
// create a general updateCode function
// add onkeyup to every input
// calculate output and update in every single onkeyup event
// define var a, add stuff to it
// if b; add a for non-required b's


// add functions to the dictionary
dict.softwarePath = function(){
    element = document.getElementById("softwarePath")
    input = element.value;
    code.appendChild();
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
