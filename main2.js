


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

window.currentRoom = room1.options;

var clearInput = function() {
    document.getElementById('userInput').value = "";
};

//Define the variable consoleMe which creates some shorthand for pushing copy to the console.
var consoleMe = document.getElementById("consoleDiv");

//Auto scrolling to bottom of the Console Div
var isScrolledToBottom = consoleMe.scrollHeight - consoleMe.clientHeight <= consoleMe.scrollTop + 1;

//Load a room



loadRoom = function(currentRoom) {
    window.currentRoom(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
    clearInput();
};


introScenario(consoleMe, badcopy);



// Capture Enter button for UserInput console

// add an event listener to the userInput field which listens for ENTER key (keycode 13) which then runs some code
    document.getElementById("userInput").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
//Pushes input to the consoleDiv
            displayInput();
//Load the room defined in currentRoom
loadRoom();
//Resets the input field to be empty
            clearInput();
            // Autoscroll to bottom of console Div
            if (isScrolledToBottom)
                consoleMe.scrollTop = consoleMe.scrollHeight - consoleMe.clientHeight;
        }
    });


};







