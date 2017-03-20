
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

    //Intitialise room exits
    rooms[roomFlag]["init"]();

    //Display intro copy and possible exits
    document.getElementById("consoleDiv").innerHTML += rooms[roomFlag][roomStatus] + roomExits;

    //move to the body of the room
    roomStatus = "body";

    //Call the 'body' function
    rooms[roomFlag][roomStatus]();



};


loadListener = function() {
    $("#userInput").bind("keypress", function(event) {
        if(event.which == 13) {
            event.preventDefault();
            // TRIGGER YOUR FUNCTION
            userAction = document.getElementById("userInput").value;
            // console.log(userAction);
            // console.log(roomStatus);
            // console.log(rooms[roomFlag][roomStatus]());

            if (rooms[roomFlag][roomStatus]().hasOwnProperty(userAction))
            {
               // console.log("THAT WORKED")
               rooms[roomFlag][roomStatus]()[userAction]["action"]();

            }else{
                errorMessage();
                initRoom();
            }

            displayInput();
            clearInput();
            autoScroll();
        }
    });

    $("#userInput").bind("keypress", function(event) {
        if(event.which == 13) {
            event.preventDefault();
            console.log("This works too");
        }
    });
};


window.onload=function() {
    isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;
    loadListener();
    initRoom();


};