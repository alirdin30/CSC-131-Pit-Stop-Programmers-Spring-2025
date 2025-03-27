/* mongo db initialization? not sure if i need these the slides didnt have these
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
i put these inside comments so i can get rid of the comments if i need them */

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
    /*  
    TODO: save each variable so that the next pages can see what was selected 
    i was thinking when the service is confirmed it will put all of the services
    into a collection, so for example: if I had oil change and brake service selected
    a database collection will be created that has "Oil: yes" and "Brake: yes" inside of it.
    not sure if I want the database to have stuff like "Transmission Fluid: No" or just leave it blank.

    TODO: we don't have a task for having a page for actually viewing the revenue
    and viewing how much of each service is sold

    NOTE: none of the mongodb code has been tested yet 
    not sure if this code works or if I did it properly

    the first line of the code will save an entry into (servicename)Total
    this will be used to keep track of the total amount of times a service is sold
    to access the information you would just check the size of the collection

    */
    if (soil === true){
        db.oilTotal.insert({service: yes});
    }
    if (sair === true){
        db.airTotal.insert({service: yes});
    }
    if (stire === true){
        db.tireTotal.insert({service: yes});
    }
    if (sbat === true){
        db.batTotal.insert({service: yes});
    }
    if (sbrake === true){
        db.brakeTotal.insert({service: yes});
    }
    if (ssus === true){
        db.susTotal.insert({service: yes});
    }
    if (sfuel === true){
        db.fuelTotal.insert({service: yes});
    }
    if (salt === true){
        db.altTotal.insert({service: yes});
    }
    if (strans === true){
        db.transTotal.insert({service: yes});
    }
    if (semission === true){
        db.emissionTotal.insert({service: yes});
    }
}