//// notes for next week >>
// create a general updateCode function
// add onkeyup to every input
// calculate output and update in every single onkeyup event
// define var a, add stuff to it
// if b; add a for non-required b's
//
// how to handle:
// multiple users using ui in the same time


// add functions to the dictionary

// update code onkeyup
class updateCode(userId){
    softwarePath(){
        element = document.getElementById("softwarePath")
        input = element.value;
        document.getElementById("code").innerHTML += input;
    }

    infileName(){
        input = document.getElementById("infileName").value;
        document.getElementById("code").innerHTML += input;
    }
}

