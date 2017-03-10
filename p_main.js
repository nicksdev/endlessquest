


window.onload=function() {

    roomFlag = "testRoom";
    roomStatus = "intro";



//Auto scrolling to bottom of the Console Div
var isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;

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
                    document.getElementById("demo").innerHTML = "Hello World - test1";
                }
            } else {
                if (event.keyCode == 13) {
                    userAction = document.getElementById("userInput").value;
                    console.log("userAction = " + userAction);
                    displayInput();
                    clearInput();
                    autoScroll();
                }
            }
        });
    };

    initRoom = function() {
        console.log("Calling initRoom for room: " + roomFlag);
        document.getElementById("consoleDiv").innerHTML += rooms[roomFlag]["intro"];
        console.log("Loading Encounter for current room");
        rooms[roomFlag]["encounter"]();
    };


loadListener();
initRoom(roomFlag);








//    loadRoom("startRoom");



};