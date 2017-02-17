


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
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 3), there is an exit to the south.<br>"
//        window.currentRoom.encounter();
        window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
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
                    // console.log("mobName: " + monsterArray[i].mobName);
                    // console.log("mobStrength: " + monsterArray[i].mobStrength);
                    // console.log("weaponDamMin: " + monsterArray[i].mobWeapon.minDamage);
                    // console.log("weaponDamMax: " + monsterArray[i].mobWeapon.maxDamage);
                    // console.log("character.charArmour.damResist: " + character.charArmour.damResist);
                    thisDamage = mobDamage();
                        if (thisDamage > 0) {
                            document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hits for " + thisDamage + " damage. <br>";
                            character.charHealth = character.charHealth - thisDamage;
                            console.log("CHAR HEALTH = " + character.charHealth);
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


            //Character attack starts here
                //For intial build, character gets a single attack against each mob
            console.log("Char attack sequence starting");
            console.log(character.charAttack());
            // for (i = 0; i < monsterArray.length; i++) {
            //
            //
            // }

                //Calc user to hit
                //Calc user damage
//                var thisMobAttack = mobAttack();
//                console.log("MOBATK: " + thisMobAttack);
//                var thisDef = charDefence();
//                console.log(thisDef);
//                console.log(character.charAttack);
//                console.log(character.charAgility);
                document.getElementById("consoleDiv").innerHTML += "<span class='combatPlayer'> You attack the " + monsterArray[i].mobName;
                var thisHit = charDamage();
                document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hit for " + thisHit + " damage.<br></span></span>";
                //console.log(charDamage());

                //If monster dead, remove from array
                //Next monster
                //Finish combat victorios


            }





        } else {
        document.getElementById("consoleDiv").innerHTML += "NO MONSTERS HERE"
    }
        //HAVING SOME TROUBLE HERE, consoleMe isn;t working, have to hardcode the document.getElementById("consoleDiv").
    },




    // Are their any monsters? If yes then fight, if no then options.


    options:     function (consoleMe,errorMessage,input) {
        consoleMe.innerHTML += "Which way do you wish to go?";
        var choice = input;
        var choices = {
            "start": function () {
                choice = "start item";
            },
            "south": function () {
                choice = "south item";
                consoleMe.innerHTML += "You head " + input + "<br>";
                window.currentRoom = room4;

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

    intro:  "You are at Room 4, go East to get to Rooom 5<br>",

    options:     function (consoleMe,errorMessage,input) {
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


