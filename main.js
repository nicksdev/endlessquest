/**
 * Created by nickhughes on 20/1/17.
 */


//Take the input from 'userInput' field and write it to the 'consoleDiv' area
function displayInput()
{
    var inputValue = document.getElementById("userInput");
    var consoleDisplay = "<div class='input'> <br>" + inputValue.value + "</div>";
    document.getElementById("consoleDiv").innerHTML += consoleDisplay + "<br>";
}

//Define the variable which returns some html copy using the error class (i.e. in red)
var badcopy = "<div class='error'>I'm sorry but I dont understand that... <br> Please try again.</div>";

window.onload=function() {

//Define the variable consoleMe which creates some shorthand for pushing copy to the console.
var consoleMe = document.getElementById("consoleDiv");

//Auto scrolling to bottom of the Console Div
var isScrolledToBottom = consoleMe.scrollHeight - consoleMe.clientHeight <= consoleMe.scrollTop + 1;

// Define a variable inputerror which pushes 'badcopy' to the consoleDiv element when called
var inputerror = function(){
    consoleMe.innerHTML += badcopy;
};

var clearInput = function() {
    document.getElementById('userInput').value = "";
};

//Call the introScenario function passing the consoleMe and badCopy variables so that these can be used in the function.

introScenario(consoleMe, badcopy);

window.currentRoom = 'room1';


// Capture Enter button for UserInput console
    // add an event listener to the userInput field which listens for ENTER key (keycode 13) which then runs some code
    document.getElementById("userInput").addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode == 13)
            {
//Pushes input to the consoleDiv
                displayInput();
//Starts the game, not sure why this belongs here
                if (window.currentRoom === 'room1') {
                    room1(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
                } else if (window.currentRoom === 'room2') {
                    room2(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
                }
//Resets the input field to be empty
             clearInput();
                // Autoscroll to bottom of console Div
                if(isScrolledToBottom)
                    consoleMe.scrollTop = consoleMe.scrollHeight - consoleMe.clientHeight;
            }
        });
};




var loadRoom = function(consoleMe, badcopy) {

    document.getElementById("userInput").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13)
        {
//Pushes input to the consoleDiv
            displayInput();
//Starts the game, not sure why this belongs here
            if (window.currentRoom === 'room1') {
                room1(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
            } else if (window.currentRoom === 'room2') {
                room2(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
            }
//Resets the input field to be empty
            clearInput();
            // Autoscroll to bottom of console Div
            if(isScrolledToBottom)
                consoleMe.scrollTop = consoleMe.scrollHeight - consoleMe.clientHeight;
        }
    });

}












//INTRO SCENARIO

var introScenario = function(consoleMe,errorMessage) {
    consoleMe.innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
};





















// var room1Scenario = function(consoleMe,errorMessage,input) {
//     // var room1choice = input;
//     // console.log(room1choice);
//     switch (input) {
//         case "start":
//             consoleMe.innerHTML += "You arrive at the start. There is really only one option here, head North<br>";
//             break;
//         case "north":
//             consoleMe.innerHTML += "You take the northern path and enter a room with a ladder going up<br>"
//             room2Scenario(consoleMe,document.getElementById("userInput").value.toLowerCase());
//             break;
//         case "help":
//             consoleMe.innerHTML += "Here is some help<br>";
//             break;
//         default:
//             consoleMe.innerHTML += errorMessage;
//     }
// };







//
// var room2Scenario = function(consoleMe,errorMessage,input) {
//     console.log("Welcome to Room 2");
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

