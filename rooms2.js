






    var allRooms = function() {
        return {

            "startRoom": {
                name: "Starting Room",

                intro: "Welcome to Endless Quest, this is the introduction and welcome copy for the game<p>",

                encounter: function () {
                    console.log("Entering the " + roomFlag + " Encounter Space");
                    document.getElementById("consoleDiv").innerHTML += "You can go " + Object.getOwnPropertyNames(rooms[roomFlag]["options"]()) + ".<p> Which way do you wish to go?";
                    loadListener();
                },

                test: "startroom test",

                options: function () {

                   // roomStatus = "options";

                    return {

                        test: console.log("OPTIONS AREA TEST VALUE"),

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

            },

            "room0": {
                name: "Starting Room",
                intro: "You have discovered Room 0",
                encounter: function () {

                },
                options: function () {
                    return {
                        north: {
                            copy: "You Head North",
                            action: function () {
                                loadRoom(room1);
                            }
                        },

                        east: {
                            copy: "You Head East",
                            action: function () {
                                console.log("SOUTH TAKE ACTION")
                            }
                        },
                    };

                }
            },

            "combatTest": {
                name: "Combat Testing",

                intro: "You entered the combat testing room - good luck!",

                encounter: function (roomName) {

                    combatObj = {};

//Creates an array which holds the monsters in a room
                    monsterArray = [];

//Creates mob and pushes them into the monsterArray
                    createMob(weakGoblin);
                    createMob(weakGoblin);
                    createMob(caveViper);

//Populates the combatObj object literal (Dictionary) This is the place where we will track changes to objects in combatObj.

                    for (i = 0; i < monsterArray.length; i++) {
                        combatObj['mob' + i] = monsterArray[i];
                    }
                    console.log("Heading to Combat");
                    // loadCombat("combatTest");
                    rooms["combatTest"]["combat"]["start"]();

                },


















                combat:  {


                        test: "combatRound Testing",

                        start: function () {
                            document.getElementById("consoleDiv").innerHTML += "STARTING COMBAT ROUND - PRESS ENTER TO CONTINUE <p>";
                            loadRound("combatTest");

                        },

                        combatRound: function () {

                            console.log("Starting Combat Round");


                            if (character.charHealth > 0) {
                                //If character alive, run combat
                                //calculate number of mobs and passes the value of mobCount
                                getObjectLength(combatObj);
                                if (mobCount > 0) {
                                    getObjectLength(combatObj);
                                    //Mob Combat Sequence

                                    // List attackers
                                    document.getElementById("consoleDiv").innerHTML += "You are attacked by " + mobCount + " creatures <br>";
                                    mobList();

                                    //Individual Mob attack round
                                    for (var key in combatObj) {
                                        if (combatObj.hasOwnProperty(key))
                                            document.getElementById("consoleDiv").innerHTML += "<span class='combatMob'>" + combatObj[key].mobName + " attacks you with " + combatObj[key].mobWeapon.name;
                                        //Mob attack and char defence rolls to calculate if this attack is successful
                                        var thisMobAttack = mobAttackRoll();
                                        var thisCharDefence = charDefenceRoll();
                                        var thisMobRound = thisMobAttack - thisCharDefence;

                                        //if successful, Calculate mob hit and damage and update char health
                                        if (thisMobRound > 0) {
                                            thisDamage = mobDamageRoll();
                                            if (thisDamage > 0) {
                                                document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hits for " + thisDamage + " damage. <br>";
                                                character.charHealth = character.charHealth - thisDamage;
                                                updateChar();
                                            } else {
                                                document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and hits you but does no damage. <br></span></span>";
                                            }
                                        } else {
                                            document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and misses. <br></span></span>";

                                        }

                                    }


                                    //Character attack round
                                    for (var key in combatObj) {
                                        if (combatObj.hasOwnProperty(key))
                                            document.getElementById("consoleDiv").innerHTML += "<span class='combatPlayer'>You attack " + combatObj[key].mobName + " with " + character.charWeapon.name;
                                        //Begin a single character attack round
                                        var thisCharAttack = charAttackRoll();
                                        var thisMobDefence = mobDefenceRoll();
                                        var thisCharRound = thisCharAttack - thisMobDefence;

                                        //if successful, Calculate mob hit and damage and update mob health
                                        if (thisCharRound > 0) {
                                            var thisCharDamage = charDamageRoll();
                                            document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hit for " + thisCharDamage + " damage <br></span>";
                                            combatObj[key].mobHealth = combatObj[key].mobHealth - thisCharDamage;

                                            //If mob health less than zero, remove from the literal object
                                            if (combatObj[key].mobHealth <= 0) {
                                                document.getElementById("consoleDiv").innerHTML += "The " + combatObj[key].mobName + " is dead!<br>";
                                                delete combatObj[key];
                                            } else {
                                                document.getElementById("consoleDiv").innerHTML += "The " + combatObj[key].mobName + " is still alive and has " + combatObj[key].mobHealth + " health!!! <br>";
                                            }


                                        } else {
                                            document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>  but you missed!<br></span>";
                                            document.getElementById("consoleDiv").innerHTML += "The " + combatObj[key].mobName + " is still alive and has " + combatObj[key].mobHealth + " health!!! <br>";

                                        }

                                        if (character.charHealth <= 0) {
                                            document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'>YOU ARE DEAD.<br></span></span>";
                                            currentRoom = death;
                                            roomStatus = "start";
                                            loadRoom();
                                        } else {

                                        }

                                        if (mobCount >= 1) {

                                        } else {

                                        }
                                    }

                                    document.getElementById("consoleDiv").innerHTML += "PRESS ENTER TO CONTINUE<br>";

                                } else {
                                    document.getElementById("consoleDiv").innerHTML += "Congratulations! You prevaled and defeated your enemies!! <br> Press any key to continue";
                                    loadOption("combatTest");
                                }


                            } else {
                                consoleMe.innerHTML += "YOU ARE DEAD!<br>";
                            }


                        },


                        combatVictory: {},

                        combatDefeat: {}


                    // }



                },



                options: function () {
                    return {
                        north: {
                            copy: "You Head North",
                            action: function () {
                                loadRoom("startRoom");
                            }
                        },

                    };

                }
            },

        }

    };

    var rooms = allRooms();














