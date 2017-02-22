


//INTRO SCENARIO



var introScenario = function(consoleMe,errorMessage) {
    document.getElementById("consoleDiv").innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
};




var room0 = {

    start: function(currentRoom) {
        window.currentRoom.intro();
    },



    // start: function() {
    //     if (roomVisited === true) {
    //         window.currentRoom.combat();
    //     } else {
    //         window.currentRoom.intro();
    //     }
    // },

   // intro:  "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br>",
    intro:  function() {
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 0)<br>";
        window.currentRoom.options();
    },

    options:     function (consoleMe,errorMessage,input) {
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
                window.currentRoom = room1;
            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                document.getElementById("consoleDiv").innerHTML += badcopy;
                console.log(choice);

            }
        };
        (choices[choice] || choices['default'])();
    }

};


var room1 = {

    intro:  "You arrive at the start. There is really only one option here, head North<br>",

    options:     function (consoleMe,errorMessage,input) {
        var choice = input;
        var choices = {
            "start": function () {
                choice1 = "start item";
            },
            "north": function () {
                choice = "north item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room2;

            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice] || choices['default'])();
    }

};


var room2 = {

    intro:  "You are at Room 2, exit is UP<br>",

    options:     function (consoleMe,errorMessage,input) {
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
            },
            "up": function () {
                choice = "up item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room3;

            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice] || choices['default'])();
    }

};


var room3 = {

    start: function() {
        if (roomVisited === true) {
            window.currentRoom.combat();

        } else {
            window.currentRoom.intro();
        }
    },

    intro:  function() {
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 3).<br>"
//        window.currentRoom.encounter();
        window.currentRoom.encounter(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
    },

    encounter: function() {
        createMob(weakGoblin);
        createMob(caveViper);
        document.getElementById("consoleDiv").innerHTML += "Suddenly you are attacked by " + monsterArray.length + " creatures!<br>"
        roomVisited = true;
        window.currentRoom.combat();
    },

    combat: function() {
        if (monsterArray.length >= 1) {
            document.getElementById("consoleDiv").innerHTML += "You are fighting... <br>";
            mobList();

            for (i = 0; i < monsterArray.length; i++) {
                document.getElementById("consoleDiv").innerHTML += "<span class='combatMob'>" + monsterArray[i].mobName + " attacks you with " + monsterArray[i].mobWeapon.name;

                //Mob attack code start here
                var thisMobAttack = mobAttack();
                var thisDef = charDefence();
                //Calculate is hit successful
                if (diceRoll(1,4) + mobAttack() - charDefence() > 0){
                    //If a hit, Calculate and display damage
                    thisDamage = mobDamage();
                    if (thisDamage > 0) {
                        document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hits for " + thisDamage + " damage. <br>";
                        character.charHealth = character.charHealth - thisDamage;
                        if (character.charHealth <= 0) {
                            document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'>" + monsterArray[i].mobName + " kills you stone dead... <br></span></span>";
                            currentRoom = room0
                            window.currentRoom.intro();
                        } else {}
                    } else {
                        document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and hits you but does no damage. <br></span></span>";
                    }
                } else {
                    //If a miss
                    document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " but misses<br></span></span>";
                }
                //Mob attack code finishes here


                //Character attack starts her
                // For intial build, character gets a single attack against each mob

                //Calc user to hit
                var thisAttack = character.charAttack() - mobDefence();
                var thisHit = charDamage();

                if (thisAttack > 0) {
                    consoleMe.innerHTML += "You hit the " + monsterArray[i].mobName + " for " + thisHit + " damage <br>";
                    monsterArray[i].mobHealth = monsterArray[i].mobHealth - thisHit;
                    if (monsterArray[i].mobHealth > 0) {
                        consoleMe.innerHTML += "The " + monsterArray[i].mobName + " has " + monsterArray[i].mobHealth + " left <br>";
                    } else {
                        consoleMe.innerHTML += "The " + monsterArray[i].mobName + " is dead!<br>";
                        monsterArray.splice(monsterArray[i],1);

                        if (monsterArray.length < 1) {
                            document.getElementById("consoleDiv").innerHTML += "YOU CRUSH YOUR ENEMIES!!!<br><br>"
                            window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
                        }
                    }
                } else {
                    consoleMe.innerHTML += "You missed the " + monsterArray[i].mobName + "<br>";
                }
            }

        } else {
            document.getElementById("consoleDiv").innerHTML += "NO MONSTERS HERE"
        }

    },



    // Are their any monsters? If yes then fight, if no then options.


    options:     function (consoleMe,errorMessage,input) {
        consoleMe.innerHTML += "There is an exit to the south.";
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
            },
            "south": function () {
                choice = "south item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                currentRoom = room4
                window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());

            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice] || choices['default'])();
    }

};

var room3b = {


    start: function() {
        if (roomVisited === true) {
            window.currentRoom.combat();

        } else {
            window.currentRoom.intro();
        }
    },

    intro:  function() {
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 3).<br>"
//        window.currentRoom.encounter();
        window.currentRoom.encounter(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
    },

    // encounter: function() {
    //     createMob(weakGoblin);
    //     createMob(caveViper);
    //     document.getElementById("consoleDiv").innerHTML += "Suddenly you are attacked by " + monsterArray.length + " creatures!<br>"
    //     roomVisited = true;
    //     window.currentRoom.combat();
    // },

    encounter: function() {
        combatObj = {};

//Creates an array which holds the monsters in a room
        monsterArray = [];

//Creates an object for managing the monsters array
        //Creates mob and pushes them into the monsterArray
        createMob(weakGoblin);
        createMob(weakGoblin);
        createMob(caveViper);

        //Populates the combatObj object literal (Dictionary) This is the place where we will track changes to objects in combatObj.

        for (i = 0; i < monsterArray.length; i++) {
console.log("THIS SHOULD HAPPEN ONCE")
            combatObj['mob'+ i] = monsterArray[i];

        }

        // console.log(combatObj.mob0);
        // console.log(combatObj.mob1);
        // console.log(combatObj.mob2);
        // console.log(combatObj);
        console.log("loading combat")
        window.currentRoom.combat();

        //Run the combat script, iterating through the objects.
        // Mobs attack char
        // Char attacks Mobs (1 attack on each)

        //When a mob is killed, remove it from the combatObj
        //delete combatObj.mob1;

        //When combatObj contains no mobs, end combat

            //determine the number of objects in the object literal


        // if mobcount > 0 run combat

        // mobCombat

        // charCombat




    },


    combat: function() {

        //calculate number of mobs and display them
        getObjectLength(combatObj);
        console.log("mobCount is " + mobCount);

        if (mobCount >= 1) {
            document.getElementById("consoleDiv").innerHTML += "You are attacked by " + mobCount + " creatures <br>";
            mobList();


            for (i = 0; i < mobCount; i++) {
                document.getElementById("consoleDiv").innerHTML += "<span class='combatMob'>" + combatObj['mob'+ i].mobName + " attacks you with " + combatObj['mob'+ i].mobWeapon.name;

                // Mob attack code start here
                var thisMobAttack = mobAttackRoll();
                console.log("Mob Rolls for attack = " + thisMobAttack);
                var thisDefence = charDefenceRoll();
                console.log("Char Rolls for defence = " + thisDefence);

                //Calculate mob hit and damage
                if (thisMobAttack - thisDefence > 0) {
                    thisDamage = mobDamageRoll();
                    if (thisDamage > 0) {
                        document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hits for " + thisDamage + " damage. <br>";
                        character.charHealth = character.charHealth - thisDamage;
                        if (character.charHealth <= 0) {
                            document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'>" + combatObj['mob' + i].mobName + " kills you stone dead... <br></span></span>";
                            currentRoom = room0
                            window.currentRoom.intro();
                        } else {}

                    } else {
                        document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and hits you but does no damage. <br></span></span>";
                    }

                } else {
                    document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and misses. <br></span></span>";
                }

                //Calculate char attack and damage

                var thisAttack = character.charAttack() - mobDefenceRoll();
                var thisHit = charDamageRoll();

                console.log("Car attack: " + thisAttack + " and " + thisHit);

                if (thisAttack > 0) {
                    consoleMe.innerHTML += "You hit the " + combatObj['mob'+ i].mobName + " for " + thisHit + " damage <br>";
                    combatObj['mob'+ i].mobHealth = combatObj['mob'+ i].mobHealth - thisHit;
                    if (combatObj['mob'+ i].mobHealth < 1) {
                        consoleMe.innerHTML += "The " + combatObj['mob'+ i].mobName + " has " + combatObj['mob'+ i].mobHealth + " left <br>";
                    } else {
                        consoleMe.innerHTML += "The " + combatObj['mob'+ i].mobName + " is dead!<br>";

                        console.log("COMBATOBJ = " + combatObj['mob'+ i]);
                        delete combatObj['mob'+ i];

                            if (monsterArray.length < 1) {
                                document.getElementById("consoleDiv").innerHTML += "YOU CRUSH YOUR ENEMIES!!!<br><br>"
                                window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
                            } else {}
                    }

                } else {
                    consoleMe.innerHTML += "You missed the " + combatObj['mob'+ i].mobName + "<br>";
                }

                console.log("reloop combat");
                // loadRoom();
                // window.currentRoom.combat();




                //             if (diceRoll(1,4) + mobAttack() - charDefence() > 0){
                //                 //If a hit, Calculate and display damage
                //                 thisDamage = mobDamage();
                //                 if (thisDamage > 0) {
                //                     document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hits for " + thisDamage + " damage. <br>";
                //                     character.charHealth = character.charHealth - thisDamage;
                //                     if (character.charHealth <= 0) {
                //                         document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'>" + monsterArray[i].mobName + " kills you stone dead... <br></span></span>";
                //                         currentRoom = room0
                //                         window.currentRoom.intro();
                //                     } else {}
                //                 } else {
                //                     document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and hits you but does no damage. <br></span></span>";
                //                 }

// Press any key to continue = see http://stackoverflow.com/questions/17176046/pause-function-until-enter-key-is-pressed-javascript


                //Uncomment this to loop the combat function - needs character combat first
                // console.log("loading combat 2")
                // window.currentRoom.combat();

            }










        }







    },

    // combat: function() {
    //     if (monsterArray.length >= 1) {
    //         document.getElementById("consoleDiv").innerHTML += "You are fighting... <br>";
    //         mobList();
    //
    //         for (i = 0; i < monsterArray.length; i++) {
    //             document.getElementById("consoleDiv").innerHTML += "<span class='combatMob'>" + monsterArray[i].mobName + " attacks you with " + monsterArray[i].mobWeapon.name;
    //
    //             //Mob attack code start here
    //             var thisMobAttack = mobAttack();
    //             var thisDef = charDefence();
    //             //Calculate is hit successful
    //             if (diceRoll(1,4) + mobAttack() - charDefence() > 0){
    //                 //If a hit, Calculate and display damage
    //                 thisDamage = mobDamage();
    //                 if (thisDamage > 0) {
    //                     document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hits for " + thisDamage + " damage. <br>";
    //                     character.charHealth = character.charHealth - thisDamage;
    //                     if (character.charHealth <= 0) {
    //                         document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'>" + monsterArray[i].mobName + " kills you stone dead... <br></span></span>";
    //                         currentRoom = room0
    //                         window.currentRoom.intro();
    //                     } else {}
    //                 } else {
    //                     document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and hits you but does no damage. <br></span></span>";
    //                 }
    //             } else {
    //                 //If a miss
    //                 document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " but misses<br></span></span>";
    //             }
    //             //Mob attack code finishes here
    //
    //
    //             //Character attack starts her
    //             // For intial build, character gets a single attack against each mob
    //
    //             //Calc user to hit
    //             var thisAttack = character.charAttack() - mobDefence();
    //             var thisHit = charDamage();
    //
    //             if (thisAttack > 0) {
    //                 consoleMe.innerHTML += "You hit the " + monsterArray[i].mobName + " for " + thisHit + " damage <br>";
    //                 monsterArray[i].mobHealth = monsterArray[i].mobHealth - thisHit;
    //                 if (monsterArray[i].mobHealth > 0) {
    //                     consoleMe.innerHTML += "The " + monsterArray[i].mobName + " has " + monsterArray[i].mobHealth + " left <br>";
    //                 } else {
    //                     consoleMe.innerHTML += "The " + monsterArray[i].mobName + " is dead!<br>";
    //                     monsterArray.splice(monsterArray[i],1);
    //
    //                     if (monsterArray.length < 1) {
    //                         document.getElementById("consoleDiv").innerHTML += "YOU CRUSH YOUR ENEMIES!!!<br><br>"
    //                         window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
    //                     }
    //                 }
    //             } else {
    //                 consoleMe.innerHTML += "You missed the " + monsterArray[i].mobName + "<br>";
    //             }
    //         }
    //
    //     } else {
    //         document.getElementById("consoleDiv").innerHTML += "NO MONSTERS HERE"
    //     }
    //
    // },



    // Are their any monsters? If yes then fight, if no then options.


    options:     function (consoleMe,errorMessage,input) {
        consoleMe.innerHTML += "There is an exit to the south.";
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
            },
            "south": function () {
                choice = "south item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                currentRoom = room4
                window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());

            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice] || choices['default'])();
    }

};

var room4 = {


    intro:  function() {
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 4).<br>"
        window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
    },

    options:     function (consoleMe,errorMessage,input) {
        consoleMe.innerHTML += "There is an exit to the east.";
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
            },
            "east": function () {
                choice = "east item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room5;

            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice] || choices['default'])();
    }

};


var room5 = {

    intro:      function() {
        consoleMe.innerHTML += "You are at Room 5, go west to get back to the start<br>";
        window.currentRoom.options();
    },

    options:     function (input) {
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
            },
            "west": function () {
                choice = "west item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room1;

            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice] || choices['default'])();
    },

    test: function() {
        console.log(" HEllo from test");
        console.log(consoleMe);
        window.consoleMe.innerHTML += "Testing consoleMe";
    }

};



var roomTest = {

    intro:      function() {
        consoleMe.innerHTML += "You are at Room TEST, you can go up<br>";
        window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
    },

    options:     function (consoleMe,errorMessage,input) {
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
            },
            "up": function () {
                choice = "up item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room3;

            },
            "help": function () {
                choice = "help item";
                consoleMe.innerHTML += "Here is some help<br>";
            },
            "default": function () {
                choice = "default item";
                consoleMe.innerHTML += errorMessage;

            }
        };
        (choices[choice] || choices['default'])();
    },

    test: function() {
        console.log(" HEllo from test");
        console.log(consoleMe);
        window.consoleMe.innerHTML += "Testing consoleMe";
    }

};


