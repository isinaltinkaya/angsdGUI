var dict = {};

dict.softwarePath = function(){
    document.getElementById("code").innerHTML += "x";
}

function updateCode(id){
    dict[id]();
}

