


//INTRO SCENARIO



var introScenario = function(consoleMe,errorMessage) {
    document.getElementById("consoleDiv").innerHTML += "Welcome to Endless Quest! <br> Type 'start' to begin your game.<br><br>";
};


var room0 = {

//     start: function(currentRoom) {
//         console.log("Loading Room 0 with status start");
//         roomStatus = "intro";
// //        window.currentRoom.intro();
//     },

    start: function() {
        if (roomVisited === true) {
            window.currentRoom.combat();

        } else {
            window.currentRoom.intro();
        }
    },

    test: function () {
        console.log("THIS IS A TEST");
    },

    intro:  function() {
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 0)<br>";
        roomStatus = "options";
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


// var room3 = {
//
//     start: function() {
//         if (roomVisited === true) {
//             window.currentRoom.combat();
//
//         } else {
//             window.currentRoom.intro();
//         }
//     },
//
//     intro:  function() {
//         document.getElementById("consoleDiv").innerHTML += "You enter the room (room 3).<br>"
// //        window.currentRoom.encounter();
//         window.currentRoom.encounter(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
//     },
//
//     encounter: function() {
//         createMob(weakGoblin);
//         createMob(caveViper);
//         document.getElementById("consoleDiv").innerHTML += "Suddenly you are attacked by " + monsterArray.length + " creatures!<br>"
//         roomVisited = true;
//         window.currentRoom.combat();
//     },
//
//     combat: function() {
//         if (monsterArray.length >= 1) {
//             document.getElementById("consoleDiv").innerHTML += "You are fighting... <br>";
//             mobList();
//
//             for (i = 0; i < monsterArray.length; i++) {
//                 document.getElementById("consoleDiv").innerHTML += "<span class='combatMob'>" + monsterArray[i].mobName + " attacks you with " + monsterArray[i].mobWeapon.name;
//
//                 //Mob attack code start here
//                 var thisMobAttack = mobAttack();
//                 var thisDef = charDefence();
//                 //Calculate is hit successful
//                 if (diceRoll(1,4) + mobAttack() - charDefence() > 0){
//                     //If a hit, Calculate and display damage
//                     thisDamage = mobDamage();
//                     if (thisDamage > 0) {
//                         document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hits for " + thisDamage + " damage. <br>";
//                         character.charHealth = character.charHealth - thisDamage;
//                         if (character.charHealth <= 0) {
//                             document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'>" + monsterArray[i].mobName + " kills you stone dead... <br></span></span>";
//                             console.log("ROOM STATUS = " + roomStatus);
//                             currentRoom = room0;
//                             roomStatus = "start";
// //                            window.currentRoom.intro();
//                         } else {}
//                     } else {
//                         document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " and hits you but does no damage. <br></span></span>";
//                     }
//                 } else {
//                     //If a miss
//                     document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>" + " but misses<br></span></span>";
//                 }
//                 //Mob attack code finishes here
//
//
//                 //Character attack starts her
//                 // For intial build, character gets a single attack against each mob
//
//                 //Calc user to hit
//                 var thisAttack = character.charAttack() - mobDefence();
//                 var thisHit = charDamage();
//
//                 if (thisAttack > 0) {
//                     consoleMe.innerHTML += "You hit the " + monsterArray[i].mobName + " for " + thisHit + " damage <br>";
//                     monsterArray[i].mobHealth = monsterArray[i].mobHealth - thisHit;
//                     if (monsterArray[i].mobHealth > 0) {
//                         consoleMe.innerHTML += "The " + monsterArray[i].mobName + " has " + monsterArray[i].mobHealth + " left <br>";
//                     } else {
//                         consoleMe.innerHTML += "The " + monsterArray[i].mobName + " is dead!<br>";
//                         monsterArray.splice(monsterArray[i],1);
//
//                         if (monsterArray.length < 1) {
//                             document.getElementById("consoleDiv").innerHTML += "YOU CRUSH YOUR ENEMIES!!!<br><br>";
//                             window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
//                         }
//                     }
//                 } else {
//                     consoleMe.innerHTML += "You missed the " + monsterArray[i].mobName + "<br>";
//                 }
//             }
//
//         } else {
//             document.getElementById("consoleDiv").innerHTML += "NO MONSTERS HERE"
//         }
//
//     },
//
//
//
//     // Are their any monsters? If yes then fight, if no then options.
//
//
//     options:     function (consoleMe,errorMessage,input) {
//         consoleMe.innerHTML += "There is an exit to the south.";
//         var choice = input;
//         var choices = {
//             "start": function () {
//                 choice = "start item";
//             },
//             "south": function () {
//                 choice = "south item";
//                 consoleMe.innerHTML += "You head " + input + "<br>";
//                 currentRoom = room4;
//                 window.currentRoom.options(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
//
//             },
//             "help": function () {
//                 choice = "help item";
//                 consoleMe.innerHTML += "Here is some help<br>";
//             },
//             "default": function () {
//                 choice = "default item";
//                 consoleMe.innerHTML += errorMessage;
//
//             }
//         };
//         (choices[choice] || choices['default'])();
//     }
//
// };

var room3b = {


    start: function() {
        if (roomVisited === true) {
            window.currentRoom.combat();

        } else {
            window.currentRoom.intro();
        }
    },

    intro:  function() {
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 3b).<br>";
        window.currentRoom.encounter(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
    },

    encounter: function() {
        combatObj = {};

//Creates an array which holds the monsters in a room
        monsterArray = [];

//Creates mob and pushes them into the monsterArray
        createMob(weakGoblin);
        createMob(weakGoblin);
        createMob(caveViper);

//Populates the combatObj object literal (Dictionary) This is the place where we will track changes to objects in combatObj.

        for (i = 0; i < monsterArray.length; i++) {
            combatObj['mob'+ i] = monsterArray[i];
        }
        roomStatus = "combat";
        loadRoom();
//        window.currentRoom.combat();

    },

    combat: function() {

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

                //Number of attacks

                //Select which mob to attack




                // mobSelect = function (consoleMe,errorMessage,input) {
                //     console.log("mobSelect starting...");
                //     document.getElementById("consoleDiv").innerHTML += "What monster do you wish to attack?<br>";
                //     var choice = input;
                //     var choices = {
                //
                //
                //         "1": function() {
                //             choice = "1 item";
                //             document.getElementById("consoleDiv").innerHTML += "You chose " + input + "<br>";
                //
                //         },
                //
                //
                //         "2": function() {
                //             choice = "2 item";
                //             document.getElementById("consoleDiv").innerHTML += "You chose " + input + "<br>";
                //
                //         },
                //
                //
                //         "default": function () {
                //             choice = "default item";
                //             document.getElementById("consoleDiv").innerHTML += "<div class='error'>I'm sorry I didn't get that<br></div>";
                //             //mobSelect();
                //         }
                //     };
                //     (choices[choice] || choices['default'])();
                // };

                // mobSelect = function(consoleMe,errorMessage,input) {
                //     console.log(input);
                //     input = getInput();
                //     console.log(input);
                //     var choice = input;
                //     var choices = {
                //         "start": function () {
                //             choice = "start item";
                //             window.currentRoom = room1;
                //         },
                //         "help": function () {
                //             choice = "help item";
                //            document.getElementById("consoleDiv").innerHTML += "Here is some help<br>";
                //         },
                //         "default": function () {
                //             choice = "default item";
                //             document.getElementById("consoleDiv").innerHTML += "MOB SELECT ERROR<br>";
                //             console.log(choice);
                //
                //         }
                //     };
                //     (choices[choice] || choices['default'])();
                //
                //
                // };


//                mobSelect();







                // var roomTest2 =  function () {
                //     input = getInput();
                //     var choice = input;
                //     var choices = {
                //
                //         "start": function () {
                //             choice = "start item";
                //             window.currentRoom = room1;
                //         },
                //         "help": function () {
                //             choice = "help item";
                //             document.getElementById("consoleDiv").innerHTML += "Here is some help<br>";
                //         },
                //         "test": function () {
                //             choice = "test item";
                //             consoleMe.innerHTML += "Here is the Test<br>";
                //         },
                //         "default": function () {
                //             choice = "default item";
                //             console.log(input);
                //             console.log(choice);
                //             document.getElementById("consoleDiv").innerHTML += "Test THIS Error<br>";
                //             console.log(choice);
                //
                //         }
                //     };
                //     (choices[choice] || choices['default'])();
                // };
                //
                //
                //
                // roomTest2();













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
                        consoleMe.innerHTML += "<span class='combatHit'> and hit for " + thisCharDamage + " damage <br></span>";
                        combatObj[key].mobHealth = combatObj[key].mobHealth - thisCharDamage;

                        //If mob health less than zero, remove from the literal object
                        if (combatObj[key].mobHealth <= 0) {
                            consoleMe.innerHTML += "The " + combatObj[key].mobName + " is dead!<br>";
                            delete combatObj[key];
                        } else {
                            consoleMe.innerHTML += "The " + combatObj[key].mobName + " is still alive and has " + combatObj[key].mobHealth + " health!!! <br>";
                        }


                    } else {
                        consoleMe.innerHTML += "<span class='combatMiss'>  but you missed!<br></span>";
                        consoleMe.innerHTML += "The " + combatObj[key].mobName + " is still alive and has " + combatObj[key].mobHealth + " health!!! <br>";

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

            } else {
                document.getElementById("consoleDiv").innerHTML += "Congratulations! You prevaled and defeated your enemies!! <br> Press any key to continue";
                roomStatus = "options";

            }



        } else {consoleMe.innerHTML += "YOU ARE DEAD!<br>";}
    },

    options:     function (consoleMe,errorMessage,input) {
        console.log("SHOULD SEE OPTIONS ROOM LOADING HERE");
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

}

var room3c = {

    name: "Room 3c",

    start: function () {
        if (roomVisited === true) {
            window.currentRoom.combat();

        } else {
            window.currentRoom.intro();
        }
    },

    intro: function () {
        document.getElementById("consoleDiv").innerHTML += "You enter the room (room 3c).<br>";
        roomStatus = "encounter";
        console.log(roomStatus);
        console.log(currentRoom);
        //window.currentRoom[roomStatus].selectMob(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
        //loadRoom;
        //window.currentRoom.[roomStatus];
        room3c.encounter;
    },

    encounter: function () {
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
        roomStatus = "combat";
        mobList();
        //window.currentRoom[roomStatus].roundMob(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
//        window.room3c["combat"];
    },

    combat: function () {
        console.log("HELLO FROM COMBAT!!!")
        console.log(room3c.combat2.greet);

//        roomAction = 'roundMob';
//        roomStatus = 'combat2'[roomAction];
//        window.currentRoom[roomStatus][roomAction]();


//THIS WORKS
        var roomAction = 'roundMob';
        roomStatus = "combat2";
        window.currentRoom[roomStatus][roomAction]();


//        window.currentRoom[roomStatus].roundMob();
//        window.currentRoom[roomStatus];


//        window.currentRoom[roomStatus](consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
//        objectliteral['func1']()


        var phases = {

// //        healthCheck: function() {
//             if (character.charHealth > 0) {
//                 window.currentRoom.combat.roundMob();
//             } else {
//                 window.currentRoom.combat.charDeath();
//         }
//     },

            roundMob: function () {
                console.log("this is roundMob")
                window.currentRoom[roomStatus].selectMob(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
            },

            selectMob: function () {
                console.log("this is selectMob")
                window.currentRoom[roomStatus].roundChar(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
            },

            roundChar: function () {
                console.log("this is roundChar")
                window.currentRoom[roomStatus].charVictory(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
            },

            charDeath: function () {
                console.log("this is charDeath")
            },

            charVictory: function () {
                console.log("this is charVictory")
            }
        }
    },

    combat2: {
        greet: "Hello combat 2",
        test: "TEST PASSED!!!!!!!!!!!!",
        roundMob: function () {
            roomAction = '';
            console.log("!!!! this is roundMob !!!!");
            roomStatus = "options";

            //window.currentRoom[roomStatus].selectMob(consoleMe, badcopy, document.getElementById("userInput").value.toLowerCase());
        }


    },


    options: function () {

        console.log("WELCOME TO THE OPTIONS SECTION");

        function roomOptions() {
            var output;
            var optionsValue = document.getElementById("userInput").value.toLowerCase();
            switch(optionsValue) {
                case "":
                    output = "INTRO GOES HERE";
                    break;
                case "banana":
                    output = "Banana is good!";
                    break;
                case "orange":
                    output = "I am not a fan of orange.";
                    break;
                default:
                    output = "I have never heard of that fruit.";
                    break;
            }
            console.log("OUTPUT = " + output);

        }
        loadRoom();
        roomOptions();
        },

    // options:     function (consoleMe,errorMessage,input) {
    //     console.log("SHOULD SEE OPTIONS ROOM LOADING HERE");
    //     clearInput();
    //     console.log(input);
    //     document.getElementById("consoleDiv").innerHTML += "There is an exit to the south.";
    //     var choice = input;
    //     var choices = {
    //         "start": function () {
    //             choice = "start item";
    //         },
    //         "south": function () {
    //             choice = "south item";
    //             consoleMe.innerHTML += "You head " + input + "<br>";
    //             currentRoom = room4;
    //             loadRoom();
    //
    //         },
    //         "help": function () {
    //             choice = "help item";
    //             document.getElementById("consoleDiv").innerHTML += "Here is some help<br>";
    //         },
    //         "default": function () {
    //             choice = "default item";
    //             consoleMe.innerHTML += errorMessage;
    //
    //         }
    //     };
    //     (choices[input] || choices['default'])();
    // }




}


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

var death = {

    start: function() {
        combatObj = {};
        roomStatus = "intro";
        loadRoom();
        },


    intro: function() {
    document.getElementById("consoleDiv").innerHTML += "PRESS ANY KEY TO START AGAIN";
    currentRoom = room3b;
    roomStatus = "start";

    }

};


var roomTest = {

        intro:  function() {
            document.getElementById("consoleDiv").innerHTML += "THIS IS THE TEST ROOM<br>";
            document.getElementById("consoleDiv").innerHTML += "Choices are start, help and test<br>";
            roomStatus = "options";
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
                "test": function () {
                    choice = "test item";
                    consoleMe.innerHTML += "Here is the Test<br>";
                    roomTest2();
                },
                "default": function () {
                    choice = "default item";
                    document.getElementById("consoleDiv").innerHTML += "Test Room Error";
                    console.log(choice);

                }
            };
            (choices[choice] || choices['default'])();
        }

    };


//     var roomTest2 =  function () {
//         input = getInput();
//     var choice = input;
//     var choices = {
//
//         "start": function () {
//             choice = "start item";
//             window.currentRoom = room1;
//         },
//         "help": function () {
//             choice = "help item";
//             document.getElementById("consoleDiv").innerHTML += "Here is some help<br>";
//         },
//         "test": function () {
//             choice = "test item";
//             consoleMe.innerHTML += "Here is the Test<br>";
//         },
//         "default": function () {
//             choice = "default item";
//             console.log(input);
//             console.log(choice);
//             document.getElementById("consoleDiv").innerHTML += "Test 2 Error";
//             console.log(choice);
//
//         }
//     };
//     (choices[choice] || choices['default'])();
// };

var roomTest3 = function(consoleMe,errorMessage,input) {

    logInput();

};