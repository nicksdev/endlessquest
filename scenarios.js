


//INTRO SCENARIO



var introScenario = function(consoleMe,errorMessage) {
    consoleMe.innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
};




var room0 = {

    intro:  "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br>",
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
                consoleMe.innerHTML += errorMessage;

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
        window.currentRoom.encounter();
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
                document.getElementById("consoleDiv").innerHTML += monsterArray[i].mobName + " attacks you with " + monsterArray[i].mobWeapon.name;
                var thisMobAttack = mobAttack();
                var thisDef = charDefence();

                //Calculate if a hit
                if (diceRoll(1,4) + mobAttack() - charDefence() > 0){
                    //If a hit, Calculate and display damage
                    thisDamage = mobDamage();
                        if (thisDamage > 0) {
                            document.getElementById("consoleDiv").innerHTML += " and hits for " + thisDamage + " damage. <br>";
                            character.charHealth = character.charHealth - thisDamage;
                            console.log(character.charHealth);
                            if (character.charHealth <= 0) {
                                document.getElementById("consoleDiv").innerHTML += monsterArray[i].mobName + " kills you stone dead... <br>";
                            } else {}
                        } else {
                            document.getElementById("consoleDiv").innerHTML += " and hits you but does no damage. <br>";
                        }
                } else {
                    //If a miss
                    document.getElementById("consoleDiv").innerHTML += " but misses<br>";
                }



                //Calc user to hit
                //Calc user damage
//                var thisMobAttack = mobAttack();
//                console.log("MOBATK: " + thisMobAttack);
//                var thisDef = charDefence();
//                console.log(thisDef);
//                console.log(character.charAttack);
//                console.log(character.charAgility);
                var thisHit = charDamage();
                document.getElementById("consoleDiv").innerHTML += "You hit the " + monsterArray[i].mobName + " for " + thisHit + " damage."
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

    intro:  "You are at Room 5, go west to get back to the start<br>",

    options:     function (consoleMe,errorMessage,input) {
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
    }

};


