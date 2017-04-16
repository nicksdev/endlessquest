
roomFlag = "startRoom";
roomStatus = "intro";
combatFlag = "";

isScrolled = function() {
    isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;
};

// combatStatus = "";

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
    document.getElementById("consoleDiv").innerHTML += rooms[roomFlag][roomStatus] + "There are the following exits: " + roomExits;

    //move to the body of the room
    roomStatus = "body";

    //Call the 'body' function
    rooms[roomFlag][roomStatus]();

};

loadListener = function() {
    $("#userInput").on("keypress", function(event) {
        if(event.which == 13) {
            event.preventDefault();
            // console.log($(this).val());
            // TRIGGER YOUR FUNCTION
            userAction = $(this).val();
            // console.log("USER ACTION = " + userAction);


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
                autoScroll();
                // console.log("Do Nothing Listener. roomStatus = " + roomStatus);
                //Do nothing

            }
        }
    });

    $("#userInput").on("keypress", function(event) {
        if (event.which >= 49 && event.which <= 57) {
       // combat event listener - call Combat room object after any keypress
        if (roomStatus == "combat") {
            event.preventDefault();
            userAction = event.which - 48;
            displayInput();
            clearInput();
            autoScroll();
            rooms[roomFlag]["combat"]();
        }
        }
    });
};

roundInit = function() {
    document.getElementById("consoleDiv").innerHTML += "You are in combat with <p> ";
    mobList();
    document.getElementById("consoleDiv").innerHTML += "Press the number of the Monster you wish to attack<p>";
    autoScroll();
    roomStatus = "combat";
};

window.onload=function() {
    isScrolled();
    loadListener();
    initRoom();
};