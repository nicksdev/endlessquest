


//Take the input from 'userInput' field and write it to the 'consoleDiv' area
function displayInput()
{
    var inputValue = document.getElementById("userInput");
    var consoleDisplay = "<div class='input'> <br>" + inputValue.value + "</div>";
    document.getElementById("consoleDiv").innerHTML += consoleDisplay + "<br>";
}


window.onload=function() {

window.currentRoom = 'room1';

var clearInput = function() {
    document.getElementById('userInput').value = "";
};

//Define the variable consoleMe which creates some shorthand for pushing copy to the console.
var consoleMe = document.getElementById("consoleDiv");

//Auto scrolling to bottom of the Console Div
    var isScrolledToBottom = consoleMe.scrollHeight - consoleMe.clientHeight <= consoleMe.scrollTop + 1;


// Capture Enter button for UserInput console

// add an event listener to the userInput field which listens for ENTER key (keycode 13) which then runs some code
    document.getElementById("userInput").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
//Pushes input to the consoleDiv
            displayInput();
//Starts the game, not sure why this belongs here
            if (window.currentRoom === 'room1') {
                console.log("Welcome to Room 1");
                window.currentRoom = 'room2';
            } else if (window.currentRoom === 'room2') {
                console.log("Welcome to Room 2");
                window.currentRoom = 'room1';
            }
//Resets the input field to be empty
            clearInput();
            // Autoscroll to bottom of console Div
            if (isScrolledToBottom)
                consoleMe.scrollTop = consoleMe.scrollHeight - consoleMe.clientHeight;
        }
    });


};
