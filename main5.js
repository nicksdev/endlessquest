
roomFlag = "startRoom";
roomStatus = "intro";

clearInput = function() {
    //console.log("clearInput() Function CLEARING INPUT");
    document.getElementById('userInput').value = "";
};

displayInput = function () {
    var inputValue = document.getElementById("userInput");
    var consoleDisplay = "<div class='input'> <br>" + inputValue.value + "</div>";
    document.getElementById("consoleDiv").innerHTML += consoleDisplay + "<br>";
};

autoScroll = function() {if (isScrolledToBottom)
    document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;};


initRoom = function() {

    rooms[roomFlag]["init"]();
    document.getElementById("consoleDiv").innerHTML += rooms[roomFlag]["intro"] + roomExits;

};


loadListener = function() {

    document.getElementById("userInput").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {

            //Pushes user input to userAction Global variable
            userAction = document.getElementById("userInput").value;
//            console.log("userAction = " + userAction);
//Pushes input to the consoleDiv
            displayInput();

//Resets the input field to be empty
            clearInput();
            // Autoscroll to bottom of console Div
            autoScroll();
        }
    })

};



window.onload=function() {
    isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;
    loadListener();
    initRoom(roomFlag);


};