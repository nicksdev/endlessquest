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
var badcopy = "<div class='error'>I'm sorry but I dont understand that... <br> Please try again.<br><br></div>";

    //Adventure Introcopy
    document.getElementById("consoleDiv").innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
    document.getElementById("consoleDiv").innerHTML += badcopy;


//if userinput = 'start' run begin.js else write badcopy variable "I'm sorry I didn't understand that"


// Handle auto scrolling to bottom of the Console Div
    var autoScroll = document.getElementById("consoleDiv");
    var isScrolledToBottom = autoScroll.scrollHeight - autoScroll.clientHeight <= autoScroll.scrollTop + 1;


// Capture Enter button for UserInput console
    document.getElementById("userInput")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                displayInput();
                document.getElementById('userInput').value = "";
                // Autoscroll to bottom of console Div
                if(isScrolledToBottom)
                    autoScroll.scrollTop = autoScroll.scrollHeight - autoScroll.clientHeight;

            }

        });
    };

