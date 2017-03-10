allRooms = function() {
    return {







        "startRoom": {

            intro: "Welcome to Endless Quest, this is the introduction and welcome copy for the game<p>",

            encounter: function () {
                document.getElementById("consoleDiv").innerHTML += "You can go " + Object.getOwnPropertyNames(rooms[roomFlag]["options"]()) + ".<p> Which way do you wish to go?";

            },

            options: function () {
                roomStatus = "options";

                return {

                    north: {
                        copy: "You Head North",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the North Exit<p>";
                            roomFlag = "combatRoom";
                            roomStatus = "intro";
                            initRoom(roomFlag);
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



        },


        "combatRoom": {

            intro: "You have entered the combatRoom<p>",

            encounter: function () {

                combatObj = {};
                monsterArray = [];
                createMob(weakGoblin);
                createMob(weakGoblin);
                createMob(caveViper);

                for (i = 0; i < monsterArray.length; i++) {
                    combatObj['mob' + i] = monsterArray[i];
                }

                console.log(monsterArray);
                roomStatus = "combat";
                rooms[roomFlag][roomStatus]();

            },

            combat: function () {
                roomStatus = "combat";
                callCombat();
            },

            options: function () {
                roomStatus = "options";
                document.getElementById("consoleDiv").innerHTML += "Which way do you wish to go?<p>";
                autoScroll();

                return {

                    north: {
                        copy: "You Head North",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the North Exit<p>";
                            roomFlag = "combatRoom";
                            roomStatus = "intro";
                            initRoom(roomFlag);
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

        },







    }
};



rooms  = allRooms();