var userAction;
var combatFlag;


// displayInput = function() {
//     $('#userInput').on("keypress", function (event) {
//         if (event.which == 13) {
//             event.preventDefault();
//             userInput = $(this).val();
//             // console.log("USER INPUT = " + userInput);
//             // document.getElementById("consoleDiv").innerHTML += userInput + "<br>";
//             consolePush(userInput);
//             document.getElementById('userInput').value = "";
//             document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;
//         }
//     })
// };

// actionListener = function(roomName) {
//     $('#userInput').on("keyup", function (event) {
//         if (event.which == 13) {
//             event.preventDefault();
//             userAction = $(this).val();
//             if (rooms[roomName]["exits"]().hasOwnProperty(userAction)) {
//                 consolePush(rooms[roomName]["exits"]()[userAction]["description"]);
//                 initRoom(rooms[roomName]["exits"]()[userAction]["nextRoom"]);
//             } else {
//                 console.log("PRINT ERROR MESSAGE: UNRECOGNIZED ACTION");
//                 document.getElementById('userInput').value = "";
//
//             }
//
//         }
//     })
// };



mainListener = function(roomName) {

    $('#userInput').on("keypress", function (event) {
        if (event.which == 13) {
            event.preventDefault();
            userInput = $(this).val();
            consolePush(userInput);
            document.getElementById('userInput').value = "";
            document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;

                if (rooms[roomName]["exits"]().hasOwnProperty(userInput)) {
                    consolePush(rooms[roomName]["exits"]()[userInput]["description"]);
                    initRoom(rooms[roomName]["exits"]()[userInput]["nextRoom"]);
                } else {
                    console.log("PRINT ERROR MESSAGE: UNRECOGNIZED ACTION");
                    document.getElementById('userInput').value = "";
                }

                if (combatFlag === "on") {
                    console.log("combat Flag is on")
                    console.log(userInput);

                    charRound();

                } else {
                    console.log("Combat Flag not on");
                }

        }
    })
};





 // function loadListener(x) {
 //
 //     if (x === "on") {
 //
 //         $('#userInput').keyup(function(){
 //             console.log("DEFINING PRESS INPUT");
 //             console.log($(this).val());
 //             console.log($('#userInput').val());
 //             pressInput = $(this).val();
 //             console.log("PressInput = " + pressInput);
 //             document.getElementById('userInput').value = "";
 //             charRound();
 //
 //         });
 //
 //
 //     } else {
 //         console.log("UNBINDING");
 //         $('#userInput').unbind("keypress");
 //
 //     }
 // }

function selectTarget() {

    console.log("selectTarget()");
    consolePush("You are fighting the following enemies, select the opponent you wish to attack:");
    for (key in combatObj) {
        if (combatObj.hasOwnProperty(key))
            var num = parseInt(key.charAt(3)) + 1;
        consolePush( num + ") A " + combatObj[key].mobName + " with " +  combatObj[key].mobHealth + " health");
    }
    console.log("ending selectTarget");


}

function charRound() {
    select = "mob" + (userInput -1);
    console.log("KEY = " + select);
    consolePush("You attack " + userInput + ") " + combatObj[select]["mobName"]);
    console.log(combatObj[select]["mobName"]);
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
            mobRound();
        } else {
            mobRound();
        }

    } else {
        consolePush("You missed the " + combatObj[select]["mobName"]);
        mobRound();
    }
}

function mobRound() {
    // loadListener("off");
    console.log("Starting mobRound");
    getObjectLength(combatObj);
    console.log("Total Mobs = " + mobCount);

    consolePush("You are attacked by " + mobCount + " creatures <br>");

    for (var key in combatObj) {
        if (combatObj.hasOwnProperty(key))
            consolePush(combatObj[key].mobName + " attacks you with " + combatObj[key].mobWeapon.name);
        var thisMobAttack = mobAttackRoll();
        var thisCharDefence = charDefenceRoll();
        var thisMobRound = thisMobAttack - thisCharDefence;


        if (thisMobRound > 0) {
            thisDamage = mobDamageRoll();
            //Mob hits char
            consolePush( "And hits for " + thisDamage + " damage.");
            character.charHealth = character.charHealth - thisDamage;

            if (character.charHealth <= 0) {
                //DEATH
                console.log("YOU ARE DEAD!!!");
                combatFlag = "off";
            } else {

            }

        } else {
            //Mob misses char
            console.log("MOB MISSES");
            consolePush("But misses");

        }



    }

    selectTarget();
//
//
}

// function loadListener(x) {
//     if (x === "on") {
//         $('#userInput').on('input', function() {
//             console.log("DEFINING PRESS INPUT");
//             pressInput = $(this).val();
//             console.log("PressInput = " + pressInput);
//             document.getElementById('userInput').value = "";
//             charRound();
//         });
//     } else {
//     }
//     $('#userInput').off('input', function() {
//         $(this).val();
//     });
// }



function loadDescription(roomName,descriptionType) {
    consolePush(rooms[roomName]["description"]()[descriptionType]);
}

function consolePush(y) {
    document.getElementById("consoleDiv").innerHTML += y + "<p>";
    document.getElementById('userInput').value = "";
    document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;

}

function initRoom(roomName) {
    // loadListener("off");
    // actionListener(roomName);
    mainListener(roomName);
    loadDescription(roomName,"default");

// Base Room Logic
    if (rooms[roomName]["hasMobs"] === true) {

        if (rooms[roomName]["mobsDefeated"] === true) {
            loadDescription(roomName,"mobsDefeated");
            // console.log("MOBS ALREADY DEAD, TRIGGER ACTION CHOICES");
            // console.log(rooms[roomName]["exits"]());
            // console.log(rooms[roomName]["exits"]()["east"]);
            loadDescription(roomName, "exits");
            // rooms[roomName]["exits"]();

        } else {
            loadDescription(roomName,"mobAttack");
            console.log("TRIGGER MOB ATTACK");
            combatInit(roomName);
        }


    } else {
        loadDescription(roomName, "exits");
        // console.log("TRIGGER ACTION CHOICES");

    }

}

function combatInit(roomName) {

    combatFlag = "on";
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

    //START COMBAT ROUND
    // console.log("STARTING COMBAT ROUND");
    // console.log(combatObj);

    selectTarget();


    // console.log(combatObj[pressInput]);
    // consolePush("You attack "+ pressInput)
}

function combatRound(roomName) {

    //PLAYER
        //Select Mob
            //List Mobs
    consolePush("You are facing");
    for (key in combatObj) {
        if (combatObj.hasOwnProperty(key))
            var num = parseInt(key.charAt(3)) + 1;
        consolePush( num + ") A " + combatObj[key].mobName + " with " +  combatObj[key].mobHealth + " health");
    }
            //Select mob


        //Roll Char to Hit
        //Hit??
        //Roll Char Damage
        //Calc MobHp
        //Mob dies??
        //Display Damage and new mob health

    //MOB




}


window.onload=function() {


    //Set mobs in room1 to dead.
    // rooms["room1"]["mobsDefeated"] = true;

    // consolePush("CONSOLE TEST");

    initRoom("room0");

    // combatObj = {};
    // monsterArray = [];
    //
    // // console.log(rooms["room1"]["mobs"]);
    // // console.log(rooms["room1"].mobs[1]);
    // // console.log(rooms["room1"].mobs.length);
    // //
    // // for (var i=0; i<rooms["room1"].mobs.length; i++) {
    // //     console.log("Mob = " + rooms["room1"].mobs[i]);
    // // }
    //
    // // Generate mobs, based on templates referenced from the rooms.mobs array
    // for (var i=0; i<rooms["room1"].mobs.length; i++) {
    //     createMob(rooms["room1"].mobs[i]);
    // }
    // // Add monsterArray to combatObj for better change handleing
    // for (i = 0; i < monsterArray.length; i++) {
    //     combatObj['mob' + i] = monsterArray[i];
    // }







    // console.log(combatObj);
    // console.log(monsterArray);


};









