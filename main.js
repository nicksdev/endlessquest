/**
 * Created by nickhughes on 20/1/17.
 */

function displayInput()
{
    var nameElement = document.getElementById("userInput");
    var consoleDisplay = nameElement.value;
    document.getElementById("consoleDiv").innerHTML += consoleDisplay + "<br>";
}

