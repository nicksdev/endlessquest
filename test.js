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
            //            consoleMe.innerHTML += "You chose " + input + "<br>";
            window.currentRoom = 'room2';
            console.log("Choice1 = " + choice1);
            loadRoom();
            //room2(consoleMe,badcopy,document.getElementById("userInput").value.toLowerCase());
            consoleMe.innerHTML += 'Entering room 2 ' + '<br>' + 'Choose Up';
        },
        "help": function () {
            choice1 = "help item";
            consoleMe.innerHTML += "Here is some help<br>";
        },
        "default": function () {
            choice1 = "default item";
//            consoleMe.innerHTML += errorMessage;
            console.log("ROOM1 DEFAULT");
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
    console.log("Room2 Check Choice2 = " + choice2);
    //Choice 2 is undefined here
    console.log("Room2 Check input = " + input);
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
//            consoleMe.innerHTML += errorMessage;
            console.log("ROOM2 DEFAULT - STILL BROKEN");
            console.log("Default Check Choice2 = " + choice2);
            //Choice 2 is default here
            console.log("Room2 Check input = " + input);
        }
    };
    (choices[choice2] || choices['default'])();
};







// //INTRO SCENARIO
//
// var loadIntro = function(consoleMe,errorMessage) {
//     consoleMe.innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
// };
//
//
// //Attempting replacing if/esle with switch. Not working yet.
//
// var room1Scenario = function(consoleMe,errorMessage,input) {
//     switch (input) {
//         case "start":
//             consoleMe.innerHTML += "You arrive at the start. There is really only one option here, head North<br>";
//             break;
//         case "north":
//             consoleMe.innerHTML += "You take the northern path and enter a room with a ladder going up<br>";
//             consoleMe.innerHTML += "Call Room 2 here somehow..<br>";
//             room2Scenario(consoleMe,badcopy,document.getElementById("userInput").value.toLowerCase());
//             break;
//         case "help":
//             consoleMe.innerHTML += "Here is some help<br>";
//             break;
//         default:
//             consoleMe.innerHTML += errorMessage;
//     }
// };
//
//
// var room2Scenario = function(consoleMe,errorMessage,input) {
//     switch (input) {
//         case "up":
//             consoleMe.innerHTML += "You head up to Room 3, it has an exit west<br>";
//             room3Scenario(consoleMe,badcopy,document.getElementById("userInput").value.toLowerCase());
//         case "help":
//             consoleMe.innerHTML += "Here is some help<br>";
//             break;
//         default:
//             consoleMe.innerHTML += errorMessage;
//     }
// };
//
// var room3Scenario = function(consoleMe,errorMessage,input) {
//     switch (input) {
//         case "west":
//             consoleMe.innerHTML += "You head West<br>";
//             room4Scenario(consoleMe,badcopy,document.getElementById("userInput").value.toLowerCase());
//         case "help":
//             consoleMe.innerHTML += "Here is some help<br>";
//             break;
//         default:
//             consoleMe.innerHTML += errorMessage;
//     }
// };





if (window.currentRoom === 'room1') {
    console.log("Welcome to Room 1");
    window.currentRoom = 'room2';
} else if (window.currentRoom === 'room2') {
    console.log("Welcome to Room 2");
    window.currentRoom = 'room1';
}