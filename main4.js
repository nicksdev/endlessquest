
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

    loadListener = function() {
        document.getElementById("userInput").addEventListener("keyup", function (event) {
            event.preventDefault();
            if (roomStatus === "options") {

                if (event.keyCode == 13) {
                    displayInput();
                    userAction = document.getElementById("userInput").value;
                    console.log("Options Event Listener");
                    // if (rooms.[roomFlag][roomStatus]hasOwnProperty())
                    rooms[roomFlag][roomStatus]()[userAction]["action"]();
                    clearInput();
                    autoScroll();
                }
            } else if (roomStatus === "combat") {

                console.log("COMBAT EVENT LISTENER")
                rooms[roomFlag][roomStatus]();

            } else {
                if (event.keyCode == 13) {
                    displayInput();
                    userAction = document.getElementById("userInput").value;
                    console.log("userAction = " + userAction);
                    clearInput();
                    autoScroll();
                }
            }
        });
    };

    initRoom = function() {
        document.getElementById("consoleDiv").innerHTML += rooms[roomFlag]["intro"];
        roomStatus = "encounter";
        rooms[roomFlag][roomStatus]();
    };


window.onload=function() {
    isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;
    loadListener();
    initRoom(roomFlag);








//    loadRoom("startRoom");



};