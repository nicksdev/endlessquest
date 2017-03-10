roomFlag = "testRoom";
roomStatus = "intro";
//Auto scrolling to bottom of the Console Div




loadListener = function(roomStatus) {


    document.getElementById("userInput").addEventListener('keyup', function (e) {


        if (e.keyCode == 13) {
            displayInput();
            document.getElementById("userInput").addEventListener("keyup", function (event) {
                event.preventDefault();
                if (event.keyCode == 13) {
//Pushes input to the consoleDiv
                    displayInput();

//Load the room defined in currentRoom
                    loadRoom(consoleMe, badcopy);

//Resets the input field to be empty
                    clearInput();
                    // Autoscroll to bottom of console Div
                    if (isScrolledToBottom)
                        document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;
                }
            }, false);


        }


    })

};






initRoom = function() {
    console.log("Calling initRoom for room: " + roomFlag);
    document.getElementById("consoleDiv").innerHTML += rooms[roomFlag]["intro"];
    console.log("Loading Encounter for current room");
    rooms[roomFlag]["encounter"]();
};





initGui = function () {
//This is a global function that handles the loading of the User Interface

    //Auto scrolling to bottom of the Console Div
    isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;


    //Clears the copy from the input box
    clearInput = function() {
        //console.log("clearInput() Function CLEARING INPUT");
        document.getElementById('userInput').value = "";
    };

    //Pushes input to display console
    displayInput = function () {
        var inputValue = document.getElementById("userInput");
        var consoleDisplay = "<div class='input'> <br>" + inputValue.value + "</div>";
        document.getElementById("consoleDiv").innerHTML += consoleDisplay + "<br>";
    };

//    loadListener();


};

window.onload=function() {
    initGui();

    initRoom(roomFlag);


};