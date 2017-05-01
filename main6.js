

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

    function inventoryCheck(x) {
        return character.inventory.indexOf(x)
    }

    function useCharge(item, charges) {
        equipment[item].charges = equipment[item].charges - charges;
        if (equipment[item].charges < 1) {
            inventoryPos = character.inventory.indexOf(item);
            if (inventoryPos > -1) {
                consolePush("The " + item + " crumbles to dust, its power exhausted");
                character.inventory.splice(inventoryPos, 1);
            }
        }
    }

    actions =  {

            name: function(roomName,userInputString){

                if (roomName === "lobby") {
                    character.charName = userInputString;
                    consolePush("You are now called " + character.charName);


                } else {
                    consolePush("Your name is " + character.charName);
                    consolePush("Your cant change your name");
                }

            },

            save: function(roomName){
                consolePush("Saving state...");
                localStorage.clear();
                localStorage.setItem("character", JSON.stringify(character));
                localStorage.setItem("rooms", JSON.stringify(rooms));
                localStorage.setItem("location", JSON.stringify(roomName));
            },

            load: function(){
                consolePush("Loading state...");
                var load1 = localStorage.getItem("character");
                character = JSON.parse(load1);
                var load2 = localStorage.getItem("rooms");
                rooms = JSON.parse(load2);
                var load3 = localStorage.getItem("location");
                roomName = JSON.parse(load3);
                initRoom(roomName);

            },

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

                consolePush("Name: " + character.charName);
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
                console.log(itemPos);
                if (itemPos > -1 || roomPos > -1) {
                    consolePush("You examine the " + userInputString);
                    consolePush("@@figure out how to display this nicely. needs to handle SPECIAL items");
                    consolePush(equipment[userInputString]);
                    console.log(equipment[userInputString]);
                    consolePush("You see " + equipment[userInputString].desc);
                    switch(equipment[userInputString].type) {
                        case 'weapon' : consolePush("You use it to hurt things");
                        break;
                        case 'container':
                            consolePush("Its a container");
                            consolePush("Inside you see " + equipment[userInputString].contents)
                        break;
                        case 'shield':  consolePush("Its a shield");
                        break;
                        case 'head' : consolePush("Its for you head");
                        break;
                        case 'usable' : consolePush("You can use this item");
                        break;
                        default: consolePush("You cant do that");
                    }
                } else {
                    consolePush("I don't see that here.")
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
            if (inventoryCheck(userInputString) > -1) {      //check inventory
                if (equipment[userInputString].use === "equip") { //check item is equippable
                    typeCheck = equipment[userInputString].type;  //check id type for swapping if occupied
                    slotCheck = character.equipment[typeCheck];  //if slot full, remove current item
                    if (character.equipment[typeCheck].length > 1) {
                        actions.remove(roomName, slotCheck);
                    }
                    character.equipment[typeCheck] = userInputString; //equip to slot
                    character.inventory.splice(inventoryCheck(userInputString), 1);  //remove from Inv
                    consolePush("You equip the " + userInputString);
                } else {consolePush("Equipping that item is not possible")}
            } else {
                consolePush("You dont have that item");
            }
        },

            pickup: function(roomName) {
                if (equipment[userInputString].moveable === false)  {
                    consolePush("You cant lift that");
                } else {
                    itemPos = rooms[roomName]["items"].indexOf(userInputString);
                    // console.log(itemPos);
                    if (itemPos > -1) {
                        // add to inventory
                        character.inventory.push(userInputString);
                        // remove from room
                        rooms[roomName]["items"].splice(itemPos, 1);
                    } else {
                        consolePush(userInputString + " is not here");
                    }
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

            put: function (roomName) {
            //healing balm in small iron chest
                a = userInputString.match(/^([a-z\s0-9]+) in ([a-z\s0-9]+)$/); //breaks userInputString into array 'a'
                a.shift(); //strips the original string from the new array

                if (rooms[roomName]["items"].indexOf(a[1]) > -1) {
                    for (i = 0; i < rooms[roomName]["items"].length; i++) {
                        n = a[1].search(rooms[roomName]["items"][i]);
                        if (n > -1) {
                            if (character.inventory.indexOf(a[0]) > -1) {
                                for (j = 0; j < character.inventory.length; j++) {
                                    p = a[0].search(equipment[a[1]].contents[j]);
                                    if (p > -1) {
                                        character.inventory.splice(p, 1); //remove item from inventory
                                        equipment[a[1]].contents.push(a[0]);
                                        consolePush("You put the " + a[0] + " in the " + a[1]);

                                    }
                                }
                            } else {
                                consolePush("The " + a[0] + " is not in your inventory");
                            }
                        }
                    }
                } else {
                    consolePush("The " + a[1] + " is not here");
                }
            },

            take: function(roomName) {
                a = userInputString.match(/^([a-z\s0-9]+) from ([a-z\s0-9]+)$/); //breaks userInputString into array 'a'
                a.shift(); //strips the original string from the new array
                if (rooms[roomName]["items"].indexOf(a[1]) > -1) {
                    for (i = 0; i < rooms[roomName]["items"].length; i++) {
                        n = a[1].search(rooms[roomName]["items"][i]);
                        if (n > -1) {
                            if (equipment[a[1]].contents.indexOf(a[0]) > -1) {
                                for (j = 0; j < equipment[a[1]].contents.length; j++) {
                                    p = a[0].search(equipment[a[1]].contents[j]);
                                    if (p > -1) {
                                        console.log(a[0] + " found inside " + a[1]);
                                        equipment[a[1]].contents.splice(p, 1); //remove item from container
                                        character.inventory.push(a[0]);
                                    }
                                }
                            } else {
                                consolePush("The " + a[0] + " is not in the " + a[1]);
                            }
                        }
                    }
                } else {
                    consolePush("The " + a[1] + " is not here");
                }
            },

            open: function (roomName) {},

            unlock: function (roomName) {},

            use: function() {

                if (inventoryCheck(userInputString) > -1) {

                    switch(equipment[userInputString].use) {
                        case 'heal':
                            consolePush("You use the " + userInputString);
                            h = diceRoll(equipment[userInputString].minValue,equipment[userInputString].maxValue);
                            character.charHealth = character.charHealth + h;
                            consolePush("You are healed for " + h + " health points");
                            useCharge(userInputString,1);
                            break;
                        case 'equip':
                            consolePush("You cant use the " + userInputString + ", try equipping it instead");
                            break;
                        default:
                            console.log("That won't work");
                    }

                } else {
                    consolePush("You cant do that");
                }
            },

            test: function() {
                console.log("Displaying GameState");
                // console.log(gameState);
                // consolePush(gameState);


                // consolePush("gameState = ");
                // for (var key in gameState) {
                //     consolePush(key + ':' + gameState[key]);
                // }


                consolePush("LOCAL STORAGE = ");
                for (var key in localStorage) {
                    consolePush(key + ':' + localStorage[key]);
                }


            },

            clear: function() {
                consolePush("Clearing Local Storage...")
                localStorage.clear();
            }

    };

    function gameStart() {
        consolePush("Welcome to Endless Quest, please choose a character name:");

        characterName = userInput;

        consolePush("You are called: " + characterName);




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
        roomName = "lobby"
        initRoom(roomName);

    };

}

window.eqGame = eqGame();
