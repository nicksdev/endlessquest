/**
 * Created by nickhughes on 20/1/17.
 */



function displayInput()
{
    var inputValue = document.getElementById("userInput");
    var consoleDisplay = "<div class='input'> <br>" + inputValue.value + "</div>";
    document.getElementById("consoleDiv").innerHTML += consoleDisplay + "<br>";
}







window.onload=function() {


//Write an error if input is not recognised
var inputerror = function(){
    document.getElementById("consoleDiv").innerHTML += badcopy;
};
var badcopy = "<div class='error'>I'm sorry but I dont understand that... <br> Please try again.</div>";
var consoleMe = document.getElementById("consoleDiv");
loadIntro(consoleMe, badcopy);


// Handle auto scrolling to bottom of the Console Div
    var autoScroll = document.getElementById("consoleDiv");
    var isScrolledToBottom = autoScroll.scrollHeight - autoScroll.clientHeight <= autoScroll.scrollTop + 1;

// Capture Enter button for UserInput console
    document.getElementById("userInput")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                displayInput();
                room1Scenario(consoleMe,badcopy,document.getElementById("userInput").value.toLowerCase());
                document.getElementById('userInput').value = "";
                // Autoscroll to bottom of console Div
                if(isScrolledToBottom)
                    autoScroll.scrollTop = autoScroll.scrollHeight - autoScroll.clientHeight;

            }

        });

};

