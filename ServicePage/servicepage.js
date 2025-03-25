/* boolean variables for service selection */
/* NOTE: potential bug in the future, 
leaving or refreshing the page may not reset variables
i havent used any of these programming languages before so im not sure what happens*/
var soil = false;
var sair = false;
var stire = false;
var sbat = false;
var sbrake = false;
var ssus = false;
var sfuel = false;
var salt = false;
var strans = false;
var semission = false;

/* button functions */
/* first 2 lines of the functions are to show the button is selected */
/* the 3rd line is to set true/false if the service is selected */
function oilselect() {
    var element = document.getElementById("oil");
    element.classList.toggle("select");
    soil = !soil;
}

function airselect() {
    var element = document.getElementById("air");
    element.classList.toggle("select");
    sair = !sair;
}

function tireselect() {
    var element = document.getElementById("tire");
    element.classList.toggle("select");
    stire = !stire;
}

function batselect() {
    var element = document.getElementById("bat");
    element.classList.toggle("select");
    sbat = !sbat;
}

function brakeselect() {
    var element = document.getElementById("brake");
    element.classList.toggle("select");
    sbrake = !sbrake;
}

function susselect() {
    var element = document.getElementById("sus");
    element.classList.toggle("select");
    ssus = !ssus;
}

function fuelselect() {
    var element = document.getElementById("fuel");
    element.classList.toggle("select");
    sfuel = !sfuel;
}

function altselect() {
    var element = document.getElementById("alt");
    element.classList.toggle("select");
    salt = !salt;
}

function transselect() {
    var element = document.getElementById("trans");
    element.classList.toggle("select");
    strans = !strans;
}

function emissionselect() {
    var element = document.getElementById("emission");
    element.classList.toggle("select");
    semission = !semission;
}

function confirmservice(){
    /* TODO: save each variable so that the next pages can see what was selected */
}