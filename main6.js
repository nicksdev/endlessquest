

function eqGame() {

    var combatFlag;

    function combatStatus(flag, roomName) {
        if (flag === "off") {
            console.log("SETTING COMBAT FLAG TO OFF");
            combatFlag = "off";
            // mainListener(roomName);
        } else if (flag === "on") {
            console.log("SETTING COMBAT FLAG TO ON");
            combatFlag = "on";
            // mainListener(roomName);
        } else {
            console.log("COMBAT FLAG IS UNDEFINED");
        }
    }


    function mainListener(roomName) {

        $('#userInput').on("keyup", function (event) {

            if (combatFlag === "off") {
                // console.log("PRESSLISTENER DISABLED");

                if (event.which == 13) {
                    event.preventDefault();
                    userInput = $(this).val();
                    consolePush(userInput);
                    document.getElementById('userInput').value = "";
                    document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;

                    if (rooms[roomName]["exits"].hasOwnProperty(userInput)) {
                        consolePush(rooms[roomName]["exits"][userInput]["description"]);
                        roomName = rooms[roomName]["exits"][userInput]["nextRoom"];
                        initRoom(roomName);
                    } else {
                        console.log("PRINT ERROR MESSAGE: UNRECOGNIZED ACTION");
                        document.getElementById('userInput').value = "";
                    }
                }


            }
            else if (combatFlag === "on") {
                // console.log("PRESSLISTENER ENABLED");
                pressInput = $(this).val();
                document.getElementById('userInput').value = "";
                charRound(roomName);


            }
            else {

                console.log("LISTENER BEHAVIOR UNDEFINED");

            }


        });

    }


    // function mainListener(roomName) {
    //     $('#userInput').off();
    //
    //     if (combatFlag === "off") {
    //         //default listener behavior
    //         $('#userInput').on("keyup", function (event) {
    //             if (event.which == 13) {
    //                 event.preventDefault();
    //                 userInput = $(this).val();
    //                 consolePush(userInput);
    //                 document.getElementById('userInput').value = "";
    //                 document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;
    //
    //                 if (rooms[roomName]["exits"].hasOwnProperty(userInput)) {
    //                     consolePush(rooms[roomName]["exits"][userInput]["description"]);
    //                     roomName = rooms[roomName]["exits"][userInput]["nextRoom"];
    //                     initRoom(roomName);
    //                 } else {
    //                     console.log("PRINT ERROR MESSAGE: UNRECOGNIZED ACTION");
    //                     document.getElementById('userInput').value = "";
    //                 }
    //             }
    //         })
    //     }
    //
    //     else if (combatFlag === "on") {
    //         //combat listener behavior
    //         console.log("PRESSLISTENER ENABLED");
    //         $('#userInput').keyup(function () {
    //
    //             pressInput = $(this).val();
    //             document.getElementById('userInput').value = "";
    //             charRound(roomName);
    //
    //         })
    //     }
    //
    //     else {
    //         //undefined listener behavior
    //         console.log("LISTENER BEHAVIOR UNDEFINED");
    //     }
    //
    // }


    function selectTarget() {

        consolePush("You are fighting the following enemies, select the opponent you wish to attack:");
        for (key in combatObj) {
            if (combatObj.hasOwnProperty(key))
                var num = parseInt(key.charAt(3)) + 1;
            consolePush(num + ") A " + combatObj[key].mobName + " with " + combatObj[key].mobHealth + " health");
        }



    }

    function charRound(roomName) {
        console.log("Starting charRound()");
        console.log(pressInput);
        select = "mob" + (pressInput - 1);
        // console.log(select);
        // console.log(combatObj);


        if (combatObj.hasOwnProperty(select)) {
            console.log("PROPERTY EXISTS");


            consolePush("You attack " + pressInput + ") " + combatObj[select]["mobName"]);
            var thisCharAttack = charAttackRoll();
            var thisMobDefence = mobDefenceRoll();
            var thisCharRound = thisCharAttack - thisMobDefence;

            if (thisCharRound > 0) {
                var thisCharDamage = charDamageRoll();
                combatObj[select]["mobHealth"] = combatObj[select]["mobHealth"] - thisCharDamage;
                consolePush("You hit " + combatObj[select]["mobName"] + " for " + thisCharDamage + " damage.");
                consolePush(combatObj[select]["mobName"] + " has " + combatObj[select]["mobHealth"] + " health remaining");

                if (combatObj[select]["mobHealth"] <= 0) {
                    consolePush("The " + combatObj[select].mobName + " is dead!");
                    delete combatObj[select];
                    getObjectLength(combatObj);
                    // console.log(mobCount);

                    if (mobCount > 0) {
                        mobRound();
                    } else {
                        consolePush("You are victorious!");
                        console.log("@@ ENDING COMBAT @@");
                        combatStatus("off");
                        rooms[roomName]["mobsDefeated"] = true;
                        console.log("mobs defeated below");
                        console.log(rooms[roomName]["mobsDefeated"]);
                        initRoom(roomName);




                    }

                } else {
                    mobRound();
                }

            }
            else {
                consolePush("You missed the " + combatObj[select]["mobName"]);
                mobRound();
            }



        } else {
            console.log(combatObj[select]["mobName"]);
            console.log("PROPERTY DOES NOT EXIST, PLEASE TRY AGAIN");
            selectTarget();
        }




    }

    function mobRound() {
        console.log("Starting mobRound()");
        // console.log(combatObj);
        getObjectLength(combatObj);
        consolePush("You are attacked by " + mobCount + " creatures <br>");

        for (key in combatObj) {
            if (combatObj.hasOwnProperty(key))
                consolePush(combatObj[key].mobName + " attacks you with " + combatObj[key].mobWeapon.name);
            var thisMobAttack = mobAttackRoll();
            var thisCharDefence = charDefenceRoll();
            var thisMobRound = thisMobAttack - thisCharDefence;


            if (thisMobRound > 0) {
                thisDamage = mobDamageRoll();
                //Mob hits char
                consolePush("And hits for " + thisDamage + " damage.");
                character.charHealth = character.charHealth - thisDamage;

                if (character.charHealth <= 0) {
                    //DEATH
                    console.log("YOU ARE DEAD!!!");
                    combatStatus("off");

                } else {

                }

            } else {
                //Mob misses char
                consolePush("But misses");

            }


        }

        selectTarget();
//
//
    }

    function loadDescription(roomName, descriptionType) {
        consolePush(rooms[roomName]["description"][descriptionType]);
    }

    function consolePush(y) {
        document.getElementById("consoleDiv").innerHTML += y + "<p>";
        document.getElementById('userInput').value = "";
        document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;

    }

    function initRoom(roomName) {
        console.log("********* INITIALISING ROOM " + roomName);
        combatStatus("off",roomName);
        mainListener(roomName);
        loadDescription(roomName, "default");

// Base Room Logic
        if (rooms[roomName]["hasMobs"] === true) {

            if (rooms[roomName]["mobsDefeated"] === true) {
                loadDescription(roomName, "mobsDefeated");
                loadDescription(roomName, "exits");

            } else {
                loadDescription(roomName, "mobAttack");
                combatInit(roomName);
            }


        } else {
            loadDescription(roomName, "exits");
            // console.log("TRIGGER ACTION CHOICES");

        }

    }

    function combatInit(roomName) {
        console.log("********* INITIALISING COMBAT " + roomName);
        combatStatus("on",roomName);

        combatObj = {};
        monsterArray = [];
        mobTarget = "";
        // Generate mobs, based on templates referenced from the rooms.mobs array
        for (i = 0; i < rooms[roomName].mobs.length; i++) {
            createMob(rooms[roomName].mobs[i]);
        }
        // Add monsterArray to combatObj for better change handleing
        for (j = 0; j < monsterArray.length; j++) {
            combatObj['mob' + j] = monsterArray[j];
        }

        selectTarget();

    }

    window.onload = function () {


        initRoom("room0");



    };


}

window.eqGame = eqGame();


// eqGame.combatFlag

// eqGame.selectTarget()