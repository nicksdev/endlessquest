

function eqGame() {

    var combatFlag;
    var totalDef;

    function listEquip() {
        equippedList = [];
        equippedList.push(character.equipment.weapon);
        equippedList.push(character.equipment.shield);
        equippedList.push(character.equipment.chest);
        equippedList.push(character.equipment.head);
        equippedList.push(character.equipment.legs);
        equippedList.push(character.equipment.feet);
        equippedList.push(character.equipment.ring);
        // console.log(equippedList);
    }

    function calcDef() {
        totalDef = 0;
        listEquip();
        for (i = 0; i < equippedList.length; i++) {
                if (equipment.hasOwnProperty(equippedList[i])) {
                    // console.log(equipment[equippedList[i]]);
                    // console.log(i);
                    // console.log("Found " + equippedList[i]);
                    // console.log(equipment[equippedList[i]].type);
                    // console.log(Object.keys(equippedList[i]));
                    if (equipment[equippedList[i]].hasOwnProperty('defence')) {
                        // console.log("true");
                        // console.log(equippedList[i]);
                        // console.log(equipment[equippedList[i]].defence);
                        totalDef = totalDef + equipment[equippedList[i]].defence;
                    }
                }
        }
        console.log("Total Defence = " + totalDef);
    }

    actions =  {

            inv: function(){
                consolePush("<div class='capitalize'>" + character.inventory + "</div>");
            },

            look: function(roomName){
                loadDescription(roomName, "default");
                consolePush("This room contains " + "<div class='capitalize'>" + rooms[roomName]["items"] + "</div>");
                loadDescription(roomName, "exits");
            },

            char: function() {
                calcDef();

                //weapon, shield, chest, head, legs, feet, ring

                consolePush("Weapon: <span class='capitalize'>" + character.equipment.weapon + "</span>");
                consolePush("Armour: " + character.equipment.chest);

                consolePush("Agility: " + character.charAgility);
                consolePush("Defense: " + totalDef);
            },

            list: function() {
              listEquip();
              consolePush(equippedList);
            },

            exam: function(roomName,userInputString){
                console.log("Examining " + userInputString);
                itemPos = character.inventory.indexOf(userInputString);
                roomPos = rooms[roomName]["items"].indexOf(userInputString);
                console.log(roomPos);
                if (itemPos || roomPos > -1) {
                    consolePush("You examine the " + userInputString);
                    consolePush("@@figure out how to display this nicely. needs to handle SPECIAL items");
                    consolePush(equipment[userInputString]);
                    console.log(equipment[userInputString]);

                    consolePush("You see " + equipment[userInputString].desc);

                    switch(equipment[userInputString].type) {
                        case 'container':
                            console.log("Its a container");
                            consolePush("Inside you see " + equipment[userInputString].contents)
                        break;
                        case 'shield':  console.log("Its a shield");
                        break;
                        case 'head' : console.log("Its for you head");
                        break;
                        default: console.log("You cant do that");

                    }

                //
                // } else {
                //     consolePush("I don't see that here.")
                }

            },

            remove: function(roomName,userInputString) {
            listEquip();
            console.log(userInputString);
            wornCheck = equippedList.indexOf(userInputString);

                if (wornCheck > -1) {
                    consolePush("You remove the " + userInputString);
                    typeCheck = equipment[userInputString].type;
                    character.equipment[typeCheck] = "";
                    character.inventory.push(userInputString);

                } else {
                    consolePush("You are not wearing " + userInputString);
                }
            },

            equip: function (roomName, userInputString) {

                inventoryPos = character.inventory.indexOf(userInputString);
                if (inventoryPos > -1) {
                    //check inventory

                    //id type
                    typeCheck = equipment[userInputString].type;
                    console.log(typeCheck);
                    //check slot occupied

                    //if slot full, remove current item
                    console.log(character.equipment[typeCheck].length);
                    slotCheck = character.equipment[typeCheck];
                    if (character.equipment[typeCheck].length > 1) {
                        console.log("slot occupied");
                        actions.remove(roomName, slotCheck);
                    } else {
                        console.log("slot free");
                    }

                    //add to slot
                    character.equipment[typeCheck] = userInputString;
                    character.inventory.splice(inventoryPos, 1);
                    consolePush("You equip the " + userInputString);
                    //remove from Inv
                } else {
                    consolePush("You dont have that item");
                }

            },

            pickup: function(roomName) {
                console.log("PICKUP FUNCTION");

                itemPos = rooms[roomName]["items"].indexOf(userInputString);
                console.log(itemPos);
                if (itemPos > -1) {
                    // add to inventory
                    character.inventory.push(userInputString);
                    // remove from room
                    rooms[roomName]["items"].splice(itemPos, 1);
                } else {
                    consolePush(userInputString + " is not here");
                }
            },

            drop: function (roomName) {
                inventoryPos = character.inventory.indexOf(userInputString);
                if (inventoryPos > -1) {
                    consolePush("You drop " + userInputString);
                    character.inventory.splice(inventoryPos, 1);
                    rooms[roomName]["items"].push(userInputString);

                } else {
                    consolePush("You don't have <span class='capitalize'> " + userInputString + "</span>");
                }
            },

            put: function (roomName) {},

            take: function (roomName) {

                console.log(userInputString);

                for (i = 0; i < rooms[roomName]["items"].length; i++) {

                    //look for the container in the room
                    n = userInputString.search(rooms[roomName]["items"][i]);
                    if (n > -1) {
                        tmpContainer = userInputString.slice(n, n + rooms[roomName]["items"][i].length);
                        console.log(tmpContainer);
                        newString = userInputString.slice(0, userInputString.length - tmpContainer.length);

                        console.log("PART 2");

                        //look for the object in the container
                        for (j = 0; j < equipment[tmpContainer]["contents"].length; j++) {
                            m = newString.search(equipment[tmpContainer]["contents"][j]);
                            if (m > -1) {
                                containerItem = newString.slice(m, m + equipment[tmpContainer]["contents"][j].length);

                                //remove containerItem from tmpContainer
                                equipment[tmpContainer]["contents"].splice(m, 1);

                                //add containerItem to Inventory
                                character.inventory.push(containerItem);

                            }

                        }

                    }

                }

            },

            open: function (roomName) {},

            unlock: function (roomName) {},


    };

    function getDef(a) {
        //returns the defence value of the currently equipped armour TYPE
        //used in charDef function
        b = character.equipment[a];
        if (b.length > 0){
            return equipment[b].defence;
        } else {
            return 0;
        }
    }

    function charDef() {
            a = getDef("shield");
            a = a + getDef("chest");
            a = a + getDef("head");
            a = a + getDef("legs");
            a = a + getDef("feet");
            a = a + getDef("ring");
            // console.log(a);
            return a;
    }

    function combatStatus(flag, roomName) {
            if (flag === "off") {
                // console.log("SETTING COMBAT FLAG TO OFF");
                combatFlag = "off";
                // mainListener(roomName);
            } else if (flag === "on") {
                // console.log("SETTING COMBAT FLAG TO ON");
                combatFlag = "on";
                // mainListener(roomName);
            } else {
                // console.log("COMBAT FLAG IS UNDEFINED");
            }
        }

    function actionSplit(x) {

        //split userInput into array
        tmp = userInput.split(" ");

        //assign first word to userInputAction and shortens userInput
        userInputAction = tmp.shift();

        //rejoin shortened array
        userInputString = tmp.join(" ");

    }

    function mainListener(roomName) {

        $('#userInput').on("keyup", function (event) {

            if (combatFlag === "off") {
                // console.log("PRESSLISTENER DISABLED");
                if (event.which == 13) {
                    event.preventDefault();
                    userInput = $(this).val().toLowerCase();
                    consolePush(userInput);
                    actionSplit(userInput);
                    document.getElementById('userInput').value = "";
                    document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;
                    if (rooms[roomName]["exits"].hasOwnProperty(userInput)) {
                        consolePush(rooms[roomName]["exits"][userInput]["description"]);
                        roomName = rooms[roomName]["exits"][userInput]["nextRoom"];
                        initRoom(roomName);
                    } else if  (actions.hasOwnProperty(userInputAction)) {
                        console.log("RECOGNIZED ACTION");
                        actions[userInputAction](roomName,userInputString);
                    } else {
                        // console.log("PRINT ERROR MESSAGE: UNRECOGNIZED ACTION");
                        // document.getElementById('userInput').value = "";
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

    function selectTarget() {
        consolePush("You are fighting the following enemies, select the opponent you wish to attack:");

        for (key in combatObj) {
            if (combatObj.hasOwnProperty(key))
                var num = parseInt(key.charAt(3)) + 1;
            consolePush(num + ") A " + combatObj[key].mobName + " with " + combatObj[key].mobHealth + " health");
        }
    }

    function charRound(roomName) {
        select = "mob" + (pressInput - 1);
        if (combatObj.hasOwnProperty(select)) {
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
        }
    }

    function mobRound() {
        getObjectLength(combatObj);
        consolePush("You are attacked by " + mobCount + " creatures <br>");
        for (key in combatObj) {
            if (combatObj.hasOwnProperty(key))
                consolePush(combatObj[key].mobName + " attacks you with " + combatObj[key].mobWeapon.name);
            thisMobAttack = mobAttackRoll();
            thisCharDefence = charDefenceRoll();
            thisMobRound = thisMobAttack - thisCharDefence;




            if (thisMobRound > 0) {
                thisDamage = mobDamageRoll();
                //Mob hits char
                consolePush("And hits for " + thisDamage + " damage.");
                character.charHealth = character.charHealth - thisDamage;

                if (character.charHealth <= 0) {
                    //DEATH
                    consolePush("YOU ARE DEAD!!!");
                    combatStatus("off");

                } else {

                }

            } else {
                //Mob misses char
                consolePush("But misses");

            }


        }
        selectTarget();
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
        // console.log("********* INITIALISING ROOM " + roomName);
        combatStatus("off",roomName);
        mainListener(roomName);
        loadDescription(roomName, "default");
        if (rooms[roomName]["items"].length > 0) {
            consolePush("On the floor you can see: <span class='capitalize'>" + rooms[roomName]["items"] + "</span>");
        }

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
        // console.log("********* INITIALISING COMBAT " + roomName);
        heldWeapon = character.equipment.weapon;
        // totalDef = charDef();
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
