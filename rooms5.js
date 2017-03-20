allRooms = function() {
    return {



        "startRoom": {

            intro: "Welcome to Endless Quest 5, this is the introduction and welcome copy for the game<p> You can go ",

            body: function() {
                document.getElementById("consoleDiv").innerHTML += "Which way do you wish to go?<p>";
                roomStatus = "exits";
            },

            exits: function() {

                    return {

                        north: {
                            copy: "You Head North",
                            action: function () {
                                document.getElementById("consoleDiv").innerHTML += "You take the North Exit<p>";
                                roomFlag = "combatRoom";
                                roomStatus = "intro";
                                initRoom();
                            }
                        },

                        south: {
                            copy: "You Head South",
                            action: function () {
                                document.getElementById("consoleDiv").innerHTML += "You take the South Exit<p>";
                            }
                        },
                    };



                },

            init: function() {
                    roomExits = Object.getOwnPropertyNames(rooms[roomFlag]["exits"]());
            },

        },



        "combatRoom": {

            intro: "Welcome to Combat Room<p> You can go ",

            body: function() {
                document.getElementById("consoleDiv").innerHTML += "Which way do you wish to go?<p>";
                roomStatus = "exits";
            },

            exits: function() {

                return {

                    north: {
                        copy: "You Head North",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the North Exit<p>";
                            roomFlag = "combatRoom";
                            roomStatus = "intro";
                            initRoom();
                        }
                    },

                    south: {
                        copy: "You Head South",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the South Exit<p>";
                        }
                    },
                };



            },

            init: function() {
                roomExits = Object.getOwnPropertyNames(rooms[roomFlag]["exits"]());
            },

        },




    }
};



rooms  = allRooms();