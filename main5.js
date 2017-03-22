
roomFlag = "startRoom";
roomStatus = "intro";
combatFlag = "";

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
    $("#userInput").on("keypress", function(event) {
        if(event.which == 13) {
            event.preventDefault();
            console.log($(this).val());
            // TRIGGER YOUR FUNCTION
            userAction = $(this).val();
            // console.log("USER ACTION = " + userAction);
            // console.log(userAction);
            // console.log(roomFlag);
            // console.log(roomStatus);
            // console.log(rooms[roomFlag][roomStatus]());
            // console.log(rooms[roomFlag][roomStatus]());

            if (roomStatus == "exits") {

                if (rooms[roomFlag]["exits"]().hasOwnProperty(userAction))
                {
                    // Leave room
                    displayInput();
                    clearInput();
                    autoScroll();
                    rooms[roomFlag]["exits"]()[userAction]["action"]();

                } else {

                    //Display error
                    displayInput();
                    clearInput();
                    autoScroll();
                    errorMessage();
                }

            } else {

                console.log("Do Nothing Listener. roomStatus = " + roomStatus);

                //Do nothing

            }
        }
    });

    $("#userInput").on("keypress", function(event) {
        //Combat event listener - call Combat room object after any keypress
        if(roomStatus== "combat") {
            event.preventDefault();
            displayInput();
            clearInput();
            autoScroll();
            rooms[roomFlag]["combat"]();

        }
    });
};

window.onload=function() {
    isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;
    loadListener();
    initRoom();


};