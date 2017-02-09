


//INTRO SCENARIO



var introScenario = function(consoleMe,errorMessage) {
    consoleMe.innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
};



var room1 = {

    intro:  "You arrive at the start. There is really only one option here, head North<br>",

    options:     function (consoleMe,errorMessage,input) {
        var choice1 = input;
        var choices = {
            "start": function () {
                choice1 = "start item";
            },
            "north": function () {
                choice1 = "north item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room2;

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


var room2 = {

    intro:  "You are at Room 2, exit is UP<br>",

    options:     function (consoleMe,errorMessage,input) {
        var choice2 = input;
        var choices = {
            "start": function () {
                choice2 = "start item";
            },
            "up": function () {
                choice2 = "up item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room4;

            },
            "help": function () {
                choice2 = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice2 = "default item";
                consoleMe.innerHTML += "Room3 Error";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice2] || choices['default'])();
    }

};


var room3 = {

    intro:  "You are at Room 3, go south to get to Rooom 4<br>",

    options:     function (consoleMe,errorMessage,input) {
        var choice3 = input;
        var choices = {
            "start": function () {
                choice3 = "start item";
            },
            "south": function () {
                choice3 = "south item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room4;

            },
            "help": function () {
                choice3 = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice3 = "default item";
                consoleMe.innerHTML += "Room3 Error";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice3] || choices['default'])();
    }

};



var room4 = {

    intro:  "You are at Room 4, go East to get to Rooom 5<br>",

    options:     function (consoleMe,errorMessage,input) {
        var choice4 = input;
        var choices = {
            "start": function () {
                choice4 = "start item";
            },
            "east": function () {
                choice4 = "east item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room5;

            },
            "help": function () {
                choice4 = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice4 = "default item";
                consoleMe.innerHTML += "Room4 Error";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice4] || choices['default'])();
    }

};


var room5 = {

    intro:  "You are at Room 5, go west to get back to the start<br>",

    options:     function (consoleMe,errorMessage,input) {
        var choice5 = input;
        var choices = {
            "start": function () {
                choice5 = "start item";
            },
            "west": function () {
                choice5 = "west item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room1;

            },
            "help": function () {
                choice5 = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice5 = "default item";
                consoleMe.innerHTML += "Room5 Error";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice5] || choices['default'])();
    }

};