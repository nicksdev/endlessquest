/**
 * Created by nickhughes on 20/1/17.
 */




function displayInput()
{
    var nameElement = document.getElementById("userInput");
    var consoleDisplay = nameElement.value;
    document.getElementById("consoleDiv").innerHTML += consoleDisplay + "<br>";
}


window.onload=function() {

// Capture Enter button for UserInput console
    document.getElementById("userInput")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                displayInput();
            }
        });
};