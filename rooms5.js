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

                    west: {
                        copy: "You Head West",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the Western Exit<p>";
                            roomFlag = "combatRoom";
                            roomStatus = "intro";
                            initRoom();
                        }
                    },

                    north: {
                        copy: "You Head North",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the Northern Exit<p>";
                            roomFlag = "room1";
                            roomStatus = "intro";
                            initRoom();
                        }
                    },
                };



                },

            init: function() {
                    roomExits = Object.getOwnPropertyNames(rooms[roomFlag]["exits"]());
            },

        },

        "combatRoom": {

            intro: "Welcome to Combat Room<p> ",

            body: function() {
                roomStatus = "combat";
                rooms[roomFlag][roomStatus]();

            },

            combat: function() {
                callCombat();
            },

            encounter: function() {
                combatObj = {};
                monsterArray = [];
                createMob(weakGoblin);
                createMob(weakGoblin);
                createMob(caveViper);
                for (i = 0; i < monsterArray.length; i++) {
                    combatObj['mob' + i] = monsterArray[i];
                }
            },

            exits: function() {

                return {

                    east: {
                        copy: "You Head East",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the Eastern Exit<p>";
                            roomFlag = "startRoom";
                            roomStatus = "intro";
                            initRoom();
                        }
                    },

                };



            },

            init: function() {
                console.log("Initialising combatRoom");
                roomExits = Object.getOwnPropertyNames(rooms[roomFlag]["exits"]());
                rooms[roomFlag]["encounter"]();
                console.log("combatRoom roomExits = " + roomExits);
            },

        },


    }
};



rooms  = allRooms();