 var allRooms = function() {
        return {

            "testRoom": {

                name: "Starting Room",

                intro: "Welcome to Endless Quest, this is the introduction and welcome copy for the game<p>",

                encounter: function () {
                    console.log("Entering the " + roomFlag + " Encounter Space");
                    document.getElementById("consoleDiv").innerHTML += "You can go " + Object.getOwnPropertyNames(rooms[roomFlag]["options"]()) + ".<p> Which way do you wish to go?";
                    loadListener(roomStatus);
                },

                test: "startroom test",


                options: function () {

                    console.log("INITIALISING OPTIONS OBJECT");
                    // roomStatus = "options";

                    return {

                        test: console.log("OPTIONS OBJECT TEST VALUE"),

                        north: {
                            copy: "You Head North",
                            action: function () {
                                //       loadRoom("combatTest");
                                console.log("YOU HEAD NORTH");
                            }
                        },

                        south: {
                            copy: "You Head South",
                            action: function () {
                                console.log("SOUTH TAKE ACTION")
                            }
                        },
                    };

                },

            }

        }
    };



var rooms = allRooms();