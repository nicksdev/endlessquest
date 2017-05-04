

function eqGame() {

    var combatFlag;
    var totalDef;

    function charSelect() {
        console.log("CharSelect Function");
        console.log(userInputString);

        switch(userInputString) {
            case 'warrior' : consolePush("You are a WARRIOR");
            character = charClass.warrior;
            break;
            case 'priest':
            consolePush("You are a PRIEST");
            character = charClass.priest;
            break;
            case 'wizard':  consolePush("You are a WIZARD");
            character = charClass.wizard;
            break;
            default: consolePush("You cant do that");
        }

    }

    function checkLevelUp() {
        x = character.charLevel + 1;
        if (character.charXp >= xptable[x]) {
            console.log("Calling levelUp()");
            levelUp();
        }
    }

    function addSpell(type){
        //Create array of all spells of the selected type, which user does not already have
        spellArray = [];
        //INDEXOF LOOKUP OF CLASS ARRAY FOR CONDITIONALs
        for (var key in magic) {
                if (magic[key]["class"].indexOf(type) > -1 && magic[key].levelReq <= character.charLevel && character.spells.indexOf(magic[key]["name"]) < 0) {   //check global spell list for spells that contain class type (eg Wizard or Priest)
                    spellArray.push(magic[key]["name"]);
                }
        }
        //Display array
        consolePush("You can choose one of the following spells: " + spellArray);
        //see actions[choose]..
        }

    function levelUp() {

        character.charLevel++;
        consolePush("You have gained a level and are now Level " + character.charLevel);

        if (character.class === "warrior") {
            character.charStrength = character.charStrength + 2;
            character.charAgility++;
            character.charHealth = character.charHealth + 15;
        }
        else if (character.class === "priest") {
            character.charStrength++;
            character.charAgility++;
            character.charHealth = character.charHealth + 10;
            character.charMana = character.charMana + 5;
            addSpell(priest);
        }
        else if (character.class === "wizard") {
            character.charAgility++;
            character.charHealth = character.charHealth + 5;
            character.charMana = character.charMana + 10;
            addSpell(wizard);

        }
        else {
            console.log("Something went wrong with levelUp()");
        }


    }

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

    function inventoryCheck(name) {
        if (character.inventory.indexOf(name) > -1) {
            // console.log("inventoryCheck passed");
            return true;
        } else {
            // console.log("inventoryCheck failed");
            consolePush("You don't have that item in your inventory");
            return false;
        }

        // return character.inventory.indexOf(name)
    }

    function levelCheck(name) {

        if (name.levelReq <= character.charLevel) {
            // console.log("levelCheck passed");
            return true;
        } else {
            // console.log("levelCheck failed");
            consolePush("Your level is not high enough for " + name.name);
            return false;
        }

    }

    function classCheck(name) {

        if(name.class.indexOf(character.class) > -1) {
            // console.log("classCheck passed");
            return true;
        } else {
            // console.log("classCheck failed");
            consolePush("A " + character.class + " cannot equip a " + name.name);
            return false;
        }

    }

    function mobHealthCheck(roomName) {
        getObjectLength(combatObj);
        if (combatObj[select]["mobHealth"] <= 0) {
            consolePush("The " + combatObj[select].mobName + " is dead!");
            consolePush("You get " + combatObj[select].mobXP + " experience");
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
                // console.log("mobs defeated below");
                // console.log(rooms[roomName]["mobsDefeated"]);
                initRoom(roomName);
            }
        } else {
            mobRound();
        }
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

            choose: function(spellArray, userInputString){

                if (window.spellArray === undefined) {
                    consolePush(window.userInput + " isn't something you can do right now");

                } else {

                    if (window.spellArray.indexOf(userInputString) > -1) {
                        character.spells.push(userInputString);
                        consolePush(userInputString + " has been added to your spellbook");
                        window.spellArray = [];
                    } else {
                        consolePush("I don't recognise that choice..");
                    }
                }

            },

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
                consolePush("Class: " + character.class);
                consolePush("Level: " + character.charLevel);
                consolePush("Weapon: <span class='capitalize'>" + character.equipment.weapon + "</span>");
                consolePush("Armour: " + character.equipment.chest);
                consolePush("Health: " + character.charHealth);
                consolePush("Mana: " + character.charMana);
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
            if (inventoryCheck(userInputString) === true && levelCheck(equipment[userInputString]) === true && classCheck(equipment[userInputString]) === true) {      //check inventory
                // levelCheck(equipment[userInputString]);
                // classCheck(equipment[userInputString]);
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
                // consolePush("You dont have that item");
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
                // console.log(a);
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

                if (levelCheck(equipment[userInputString]) === true) {
                    if (inventoryCheck(userInputString) > -1) {
                        switch (equipment[userInputString].use) {
                            case 'heal':
                                consolePush("You use the " + userInputString);
                                h = diceRoll(equipment[userInputString].minValue, equipment[userInputString].maxValue);
                                character.charHealth = character.charHealth + h;
                                consolePush("You are healed for " + h + " health points");
                                useCharge(userInputString, 1);
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
                }
            },

            test: function() {




            },

            clear: function() {
                consolePush("Clearing Local Storage...")
                localStorage.clear();
            },

            spellbook: function() {
                consolePush(character.spells);
            },

    };

    combatActions = {

        attack: function(roomName, userInputString) {
            consolePush("You attack " + userInputString);
            // pressInput = userInputString;
            // userInputString = pressInput;
            attackRound(roomName,userInputString);
        },

        flee: function(roomName, userInputString) {
            consolePush("You attempt to flee");
            x = diceRoll(1,10);
            // console.log("x = " + x);
            if (x > 5) {
                consolePush("You flee " + userInputString);

                if (rooms[roomName]["exits"].hasOwnProperty(userInputString)) {
                    consolePush(rooms[roomName]["exits"][userInputString]["description"]);
                    roomName = rooms[roomName]["exits"][userInputString]["nextRoom"];
                    initRoom(roomName);
                } else {
                    consolePush("There is no exit that way");
                    mobRound();
                }

            } else {
                consolePush("You fail to flee")
                mobRound();
            }
        },

        use: function() {
            consolePush("You attempt to use something");
        },

        cast: function() {

            a = userInputString.match(/^([a-z\s0-9]+) on ([a-z\s0-9]+)$/); //breaks userInputString into array 'a'
            a.shift(); //strips the original string from the new array
            castSpell = a[0];
            select = "mob" + (a[1] - 1);

            if (levelCheck(magic[castSpell]) === true) {
                if (character.spells.indexOf(castSpell) > -1) {
                    // levelCheck(magic[castSpell]);
                    if (magic[castSpell].manaCost < character.charMana) {
                        if (magic[castSpell].type === "damage") {
                            thisDamage = diceRoll(magic[castSpell].minDamage, magic[castSpell].maxDamage);
                            consolePush("You cast " + castSpell + " on " + combatObj[select].mobName);
                            character.charMana = character.charMana - magic[castSpell].manaCost;
                            consolePush("The " + castSpell + " " + magic[castSpell].desc + " for " + thisDamage + " damage");

                            combatObj[select].mobHealth = combatObj[select].mobHealth - thisDamage;
                            consolePush(combatObj[select].mobName + " has " + combatObj[select].mobHealth + " health remaining");
                            mobHealthCheck();
                        }
                        else {
                            consolePush("Unknown Spell Type")
                        }
                    }
                    else {
                        consolePush("You don't have enough mana for that spell")
                    }
                }
                else {
                    consolePush("You don't know that spell")
                }
            }
        },

        test: function() {

        console.log(magic["firebolt"].minDamage);
        console.log(magic["firebolt"].maxDamage);

        },

    };

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
                    }
                    else if  (rooms[roomName]["special"].hasOwnProperty(userInputAction)) {
                        eval(rooms[roomName]["special"][userInputAction] + "()");

                    }
                    else {
                        // console.log("PRINT ERROR MESSAGE: UNRECOGNIZED ACTION");
                        // document.getElementById('userInput').value = "";
                    }
                }
            }

            else if (combatFlag === "on") {











                if (event.which == 13) {
                    event.preventDefault();
                    userInput = $(this).val().toLowerCase();
                    consolePush(userInput);
                    actionSplit(userInput);
                    document.getElementById('userInput').value = "";
                    document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;
                    if (combatActions.hasOwnProperty(userInputAction)) {
                        console.log("RECOGNIZED COMBAT ACTION");
                        combatActions[userInputAction](roomName,userInputString);
                    } else {
                        // console.log("PRINT ERROR MESSAGE: UNRECOGNIZED COMBAT ACTION");
                        document.getElementById('userInput').value = "";
                    }
                }













            }



            // else if (combatFlag === "on") {
            //     // console.log("PRESSLISTENER ENABLED");
            //     pressInput = $(this).val();
            //     document.getElementById('userInput').value = "";
            //     charRound(roomName);
            // }









            else {
                console.log("LISTENER BEHAVIOR UNDEFINED");
            }
        });
    }

    function selectTarget() {
        document.getElementById('userInput').value = "";
        userInput = "";
        console.log("Calling selectTarget");
        consolePush("You are fighting the following enemies, select the opponent you wish to attack:");

        for (key in combatObj) {
            if (combatObj.hasOwnProperty(key))
                var num = parseInt(key.charAt(3)) + 1;
            consolePush(num + ") A " + combatObj[key].mobName + " with " + combatObj[key].mobHealth + " health");
        }
    }

    function attackRound(roomName, userInputString) {
        select = "mob" + (userInputString - 1);
        if (combatObj.hasOwnProperty(select)) {
            consolePush("You attack " + userInputString + ") " + combatObj[select]["mobName"]);
            var thisCharAttack = charAttackRoll();
            var thisMobDefence = mobDefenceRoll();
            var thisCharRound = thisCharAttack - thisMobDefence;
            var thisCharDamage = charDamageRoll();
            if (thisCharRound > 0) {
                consolePush("You hit " + combatObj[select]["mobName"] + " for " + thisCharDamage + " damage.");
                combatObj[select]["mobHealth"] = combatObj[select]["mobHealth"] - thisCharDamage;
                consolePush(combatObj[select]["mobName"] + " has " + combatObj[select]["mobHealth"] + " health remaining");
                mobHealthCheck(roomName);
            } else {
                consolePush("You missed the " + combatObj[select]["mobName"]);
                mobRound();
            }
    } else {
            consolePush("I don't see that here, try again");
            attackRound();
        }
    }

    function magicRound(roomName, castSpell, targetMob) {
        //is it a damage spell? (other types massdamage, heal, etc






    }

    function mobRound() {
        userInput = "";
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
        // userInput=null;
        checkLevelUp();
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
        }

        // if (rooms[roomName]["special"].length > 0) {
        //     //If room has a special object, call it as a function
        //     eval(rooms[roomName]["special"] + "()");
        // }

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
