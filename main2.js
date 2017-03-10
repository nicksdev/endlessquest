

//element.addEventListener(event, function, useCapture);
//element.removeEventListener("mousemove", myFunction);

roomStatus = "";

var eventListen = function (roomName) {

    document.getElementById("userInput").addEventListener("keyup", function (event) {
        event.preventDefault();

        if (roomStatus = "options") {

        } else {



        };








        if (event.keyCode == 13) {
            console.log("CALLING selectOption");
// This is being called each round and fails on on secondary rounds because there is no valid userAction input
            rooms[roomName]["options"]()[userAction].action();
        }
    });


};





var event1 = function (event) {
//            event.preventDefault();
            if (event.keyCode == 13) {
                console.log("EVENT SUCCEEDED");
// This is being called each round and fails on on secondary rounds because there is no valid userAction input
//                rooms[roomName]["options"]()[userAction].action();
            }
};

var event2 = function (roomName) {
  console.log(roomName);
};


var loadRoom = function (roomName) {
    document.getElementById("consoleDiv").innerHTML += rooms[roomName]["intro"] + "<br>";
    console.log(roomName);
    loadEncounter(roomName);
};

var loadEncounter = function (roomName) {
    rooms[roomName]["encounter"](roomName);
};


var loadCombat = function (roomName) {
    rooms[roomName]["combat"]();
};

var loadRound = function (roomName) {
    console.log("ENTERING LOADROUND FUNCTION");
    eventListen(roomName)

    // document.getElementById("userInput").addEventListener("keyup", function (event) {
    //     event.preventDefault();
    //     if (event.keyCode == 13) {
    //         document.getElementById("consoleDiv").innerHTML += "STARTING A NEW ROUND<p>";
    //         rooms["combatTest"]["combat"]["combatRound"]();
    //     }
    // });

};

var loadOption = function (roomName) {
    console.log("STARTING loadOption");
    console.log("ROOM NAME = " + roomName);
//    console.log(Object.getOwnPropertyNames(rooms[roomName]["options"]()));
    document.getElementById("consoleDiv").innerHTML += "You can go " + Object.getOwnPropertyNames(rooms[roomName]["options"]()) + ".<br> Which way do you wish to go?";
    selectOption(roomName);
};



var selectOption = function(roomName) {
    console.log("STARTING selectOption");
    eventListen(roomName);

//     document.getElementById("userInput").addEventListener("keyup", function (event) {
//         event.preventDefault();
//         if (event.keyCode == 13) {
//             console.log("CALLING selectOption");
// // This is being called each round and fails on on secondary rounds because there is no valid userAction input
//             rooms[roomName]["options"]()[userAction].action();
//         }
//      });
};



window.onload=function() {

//Auto scrolling to bottom of the Console Div
    var isScrolledToBottom = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight <= document.getElementById("consoleDiv").scrollTop + 1;


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
            if (isScrolledToBottom)
                document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;

        }
    });



    loadRoom("startRoom");


};



