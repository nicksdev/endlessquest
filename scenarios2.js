


//INTRO SCENARIO



var introScenario = function(consoleMe,errorMessage) {
    consoleMe.innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
};


var room1 = {

    intro:  "THIS IS THE INTRO FOR ROOM 1",

    options:     function (consoleMe,errorMessage,input) {
        var choice1 = input;
        var choices = {
            "start": function () {
                choice1 = "start item";
                consoleMe.innerHTML += "You arrive at the start. There is really only one option here, head North<br>";
            },
            "north": function () {
                choice1 = "north item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room2.options;
                consoleMe.innerHTML += 'Entering room 2 ' + '<br>' + 'Choose Up';
            },
            "help": function () {
                choice1 = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice1 = "default item";
                consoleMe.innerHTML += "Room1 Error";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice1] || choices['default'])();
    }

};



// var room1 = function (consoleMe,errorMessage,input) {
//     var choice1 = input;
//     var choices = {
//         "start": function () {
//             choice1 = "start item";
//             consoleMe.innerHTML += "You arrive at the start. There is really only one option here, head North<br>";
//         },
//         "north": function () {
//             choice1 = "north item";
//             consoleMe.innerHTML += "You head " + input + "<br>";
//             window.currentRoom = room2;
//             consoleMe.innerHTML += 'Entering room 2 ' + '<br>' + 'Choose Up';
//         },
//         "help": function () {
//             choice1 = "help item";
//             consoleMe.innerHTML += "Here is some help<br>";
//         },
//         "default": function () {
//             choice1 = "default item";
//             consoleMe.innerHTML += "Room1 Error";
//             consoleMe.innerHTML += errorMessage;
//
//         }
//     };
//     (choices[choice1] || choices['default'])();
//
//
//
// };


console.log(room1.intro);


var room2 = {

    intro:  "THIS IS THE INTRO FOR ROOM 2",

    options: function (consoleMe,errorMessage,input) {
    var choice2 = input;
    var choices = {
        "up": function () {
            choice2 = "up item";
            consoleMe.innerHTML += "You chose " + input + "<br>";
            window.currentRoom = room3.options;
            loadRoom();
            consoleMe.innerHTML += 'Entering room 3 ' + '<br>' + 'Choose Up';
        },
        "help": function () {
            choice2 = "help item";
            consoleMe.innerHTML += "Here is some help<br>";
        },
        "default": function () {
            choice2 = "default item";
            consoleMe.innerHTML += "Room2 Error <br>";
            consoleMe.innerHTML += errorMessage;

        }
    };
    (choices[choice2] || choices['default'])();
    }

};


var room3 = {

    intro:  "THIS IS THE INTRO FOR ROOM 3",

    options: function (consoleMe,errorMessage,input) {
        var choice3 = input;
        var choices = {
            "up": function () {
                choice3 = "up item";
                consoleMe.innerHTML += "You chose " + input + "<br>";
                window.currentRoom = room4.options;
                loadRoom();
                consoleMe.innerHTML += 'Entering room 4 ' + '<br>' + 'Choose Up';
            },
            "help": function () {
                choice3 = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice3 = "default item";
                consoleMe.innerHTML += "Room3 Error <br>";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice3] || choices['default'])();
    }

};