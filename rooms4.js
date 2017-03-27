allRooms = function() {
    return {



        "startRoom": {

            intro: "Welcome to Endless Quest, this is the introduction and welcome copy for the game<p>",

            encounter: function () {
                roomExits = Object.getOwnPropertyNames(rooms[roomFlag]["options"]());

            },

            options: function () {
                document.getElementById("consoleDiv").innerHTML += "You can go " + window.roomExits + ".<p> Which way do you wish to go?";
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
                roomExits = Object.getOwnPropertyNames(rooms[roomFlag]["options"]());
                combatObj = {};
                monsterArray = [];
                createMob(weakGoblin);
                createMob(weakGoblin);
                createMob(caveViper);

                for (i = 0; i < monsterArray.length; i++) {
                    combatObj['mob' + i] = monsterArray[i];
                }

                //console.log(monsterArray);
                roomStatus = "combat";
                rooms[roomFlag][roomStatus]();

            },

            combat: function () {
                roomStatus = "combat";
                callCombat();
            },

            options: function () {
                roomStatus = "options";
                document.getElementById("consoleDiv").innerHTML += "You can go " + window.roomExits + ".<p> Which way do you wish to go?";
                isScrolled();
                autoScroll();

                return {

                    east: {
                        copy: "You Head East",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the East Exit<p>";
                            roomFlag = "endRoom";
                            roomStatus = "intro";
                            initRoom(roomFlag);
                        }
                    },

                    west: {
                        copy: "You Head West",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the West Exit<p>";
                            roomFlag = "endRoom";
                            roomStatus = "intro";
                            initRoom(roomFlag);
                        }
                    },
                };

            },

        },


        "endRoom": {

            intro: "You have entered the endRoom<p>",

            encounter: function () {
                roomExits = Object.getOwnPropertyNames(rooms[roomFlag]["options"]());
            },

            combat: function () {
                roomStatus = "combat";
                callCombat();
            },

            options: function () {
                roomStatus = "options";
                document.getElementById("consoleDiv").innerHTML += "You can go " + window.roomExits + ".<p> Which way do you wish to go?";
                autoScroll();

                return {

                    up: {
                        copy: "You Head East",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the up Exit<p>";
                            roomFlag = "startRoom";
                            roomStatus = "intro";
                            initRoom(roomFlag);
                        }
                    },

                    down: {
                        copy: "You Head West",
                        action: function () {
                            document.getElementById("consoleDiv").innerHTML += "You take the down Exit<p>";
                            roomFlag = "startRoom";
                            roomStatus = "intro";
                            initRoom(roomFlag);
                        }
                    },
                };

            },

        },


    }
};



rooms  = allRooms();