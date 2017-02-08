/**
 * Created by nickhughes on 24/1/17.
 */


//Code not calling the intro until an input is submitted
//Want the intro to display and then accept inputs


//Room 1
var room1 = function (consoleMe,errorMessage,input) {
    var choice1 = input;
    var choices = {
        "start": function () {
            choice1 = "start item";
            consoleMe.innerHTML += "You arrive at the start. There is really only one option here, head North<br>";
        },
        "north": function () {
            choice1 = "north item";
            consoleMe.innerHTML += "You chose " + input + "<br>";
            window.currentRoom = 'room2';
            loadRoom();
            consoleMe.innerHTML += 'Entering room 2 ' + '<br>' + 'Choose Up';
        },
        "help": function () {
            choice1 = "help item";
            consoleMe.innerHTML += "Here is some help<br>";
        },
        "default": function () {
            choice1 = "default item";
            consoleMe.innerHTML += errorMessage;

        }
    };
    (choices[choice1] || choices['default'])();
};


// Problem appears to be that choices is persisting between rooms. THerefore when a new room loads and the choice in not there, it deiplays default









//Room 2 Intro
// var room2Intro = function (consoleMe) {
//     consoleMe.innerHTML += "Room 2 Intro<br>";
//     room2(consoleMe,badcopy,document.getElementById("userInput").value.toLowerCase());
// };





//WHen this version of Room 2 is run it jumps to default
//Room 2
var room2 = function (consoleMe,errorMessage,input) {
    var choice2 = input;
    var choices = {
        "up": function () {
            choice2 = "up item";
            consoleMe.innerHTML += "You chose " + input + "<br>";
        },
        "help": function () {
            choice2 = "help item";
            consoleMe.innerHTML += "Here is some help<br>";
        },
        "default": function () {
            choice2 = "default item";
            consoleMe.innerHTML += errorMessage;

        }
    };
    (choices[choice2] || choices['default'])();
};






