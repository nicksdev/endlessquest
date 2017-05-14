

function eqGame() {

    // var combatFlag;
    var totalDef;
    var counter = 0;
    // var uniqueId = 100;

    function removeBuff(stat,value) {
        character[stat] = character[stat] - value;
    }

    function endCombat() {
        console.log("endCombat() has ended combat");
        //remove mobs
        //add corpses
        //combatFlag off
        //check for level up
        checkLevelUp();


    }

    function mobDeath(target) {
        consolePush(target["mobName"] + " is dead");
        consolePush("You get " + target["mobXP"] + " experience");
        character.charXp += target["mobXP"];
        delete combatObj[select];
        getObjectLength(combatObj);

        if (mobCount < 1) {
            consolePush("You are victorious!!!!!!");
            endCombat();
        }
    }

    function mobDamage(target,amount) {
        target["mobHealth"] -= amount;

        if (target["mobHealth"] <= 0) {
            mobDeath(target);
        } else {
            consolePush(target["mobName"] + " has " + target["mobHealth"] + " remaining");
        }
    }

    function applyEffect(userInputString,amount,target) {
        effect = magic[userInputString]["effect"];

        if (magic[userInputString]["cooldown"] > 0) {
            //add cooldown record to table
            cooldownStore[userInputString] = magic[userInputString]["cooldown"] + counter;
        }


        switch(effect) {
            case 'heal' :
                character.charHealth += amount;
                consolePush("You are healed for " + amount + " health points");
                break;

            case 'buff':
                x = magic[userInputString]["special"];
                character[x] = character[x] + amount;
                console.log("Boosting " + x);
                break;

            case 'damage':

                if (anyMobsCheck() === true) {
                    console.log(target);
                    console.log("applyEffect Damage on " + target["mobName"]);
                    consolePush("You hit " + target["mobName"] + " with " + userInputString + " for " + amount + " damage");
                    console.log(target["mobHealth"]);
                    mobDamage(target,amount);
                } else {
                    consolePush("There is nothing to use that on, the effect fizzles..")
                }

                 break;

            default: consolePush("Unknown effect in applyEffect()");
                }


    }

    function applyPersistent() {

        console.log("Applying persistent effect");
        //uniqueId++;

        //create item in spellEffect object
        spellEffect[userInputString] =
            [
            counter + magic[userInputString]["duration"],  //expiry
            magic[userInputString]["effect"],
            magic[userInputString]["special"],
            amount,
            magic[userInputString]["target"]
            // magic[userInputString]["duration"],
            // "round cast";
                // uniqueId,
            ]
    }



    function commandCast(effect) {
        amount = diceRoll(magic[effect]["min"],magic[effect]["max"]);
        applyEffect(effect,amount);
    }

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
            character.strength = character.strength + 2;
            character.agility++;
            character.charHealth = character.charHealth + 15;
        }
        else if (character.class === "priest") {
            character.strength++;
            character.agility++;
            character.charHealth = character.charHealth + 10;
            character.charMana = character.charMana + 5;
            addSpell(priest);
        }
        else if (character.class === "wizard") {
            character.agility++;
            character.charHealth = character.charHealth + 5;
            character.charMana = character.charMana + 10;
            addSpell(wizard);

        }
        else {
            console.log("Something went wrong with levelUp()");
        }


    }



    function equipItem() {
        console.log("Equipping " + userInputString);
        for (key in character["inventory"]) {
            console.log(character["inventory"][key]["name"]);
            if (character["inventory"][key]["name"] === userInputString) {
                console.log("REMOVING " + character["inventory"][key]["type"]);
                removeItem(character["inventory"][key]["type"]);

                console.log("Item found = equipping");
                character["equipment"][key] = character["inventory"][key];
                delete character["inventory"][key];
            }
        }
    }


    function removeItem(type) {
        for (var key in character["equipment"]) {
            if (character["equipment"][key]["type"] === type) {
                character["inventory"][key] = character["equipment"][key];
                delete character["equipment"][key];
            }
        }
    }



    //LIST FUNCTIONS

    function listEquip() {
        equippedList = [];
        equippedList.push(character.equipment.weapon);
        equippedList.push(character.equipment.shield);
        equippedList.push(character.equipment.chest);
        equippedList.push(character.equipment.head);
        equippedList.push(character.equipment.legs);
        equippedList.push(character.equipment.feet);
        equippedList.push(character.equipment.ring);
        console.log(equippedList);
    }







    function listItems(roomName) {
        var itemsArray = [];
        for(var key in rooms[roomName]["items"]) {
            var value = rooms[roomName]["items"][key];
            // console.log(value);
            itemsArray.push(value.name);
        }
        if(rooms[roomName]["items"].hasOwnProperty(key)) {
            consolePush("On the floor you can see: " + itemsArray);
        }

    }

    function listInv() {
        console.log(character.inventory);
        invArray = [];
        for(var key in character.inventory) {
            var value = character.inventory[key];
            // console.log(value);
            invArray.push(value.name);
        }
        if(character.inventory.hasOwnProperty(key)) {
            consolePush("You are carrying: " + invArray);
        } else {
            consolePush("Your inventory is empty")
        }


    }

    function itemName(obj,type,value) {
        for (var key in obj) {
            if (obj[key][type] === value) {
                return obj[key]["name"];
            }
        }
        return "";
    }

    //CHECK FUNCTIONS

    function objCheck(obj, userInputString) {
        //checks to see if something exists in an object
        console.log(obj);
        for(var key in obj) {
            if (obj[key]["name"] === userInputString) {
                console.log("CONTAINS OBJ");
                return true;
            } else {
                console.log("NO OBJ");
                return false;
            }
        }


    }

    function valueCheck(obj,property,value) {
        //checks to see if an items specific value matches a string
        for (var key in obj) {
            if (obj[key]["name"] === userInputString) {
                if (obj[key][property] === value) {
                    console.log("VALUE MATCHED");
                    return true;

                } else {
                    console.log("VALUE NOT MATCHED");
                    return false;
                }
            }
        }
        console.log("Name not Matched");
        // return false;
    }

    function levelCheck(effect) {
        // console.log(effect);
        // console.log(effect["name"]);
        // console.log(effect["levelReq"]);
        if (effect["levelReq"] <= character.charLevel) {
            console.log("levelCheck() Passed");
            return true;
        } else {
            consolePush("Your level is not high enough for " + effect["name"]);
            console.log("levelCheck() Failed");
            return false;
        }
    }

    function levelCheck2(obj,value) {
        //eg levelCheck2(equipment,"silver sword")

        for (var key in obj) {
            if (obj[key]["name"] === value) {
                if (obj[key]["levelReq"] <= character.charLevel) {
                    console.log("LEVEL SUFFICIENT");
                    return true;
                } else {
                    console.log("LEVEL INSUFFICIENT");
                    return false;
                }
            }
        }
        console.log("Name not Matched");
        return false;

    }

    function occupiedCheck() {
        for (var key in character["equipment"]) {
            if (character["equipment"][key]["type"] === equipment[userInputString]["type"]) {
                console.log("SLOT OCCUPIED");
                return true;
            } else {
                console.log("SLOT VACANT");
                return false;
            }
        }
    }

    function classCheck(name) {
        //class check (shouldn't need for casting as spells from wrong class cant be learned)
        if(name.class.indexOf(character.class) > -1) {
            // console.log("classCheck passed");
            return true;
        } else {
            // console.log("classCheck failed");
            consolePush("A " + character.class + " cannot equip a " + name.name);
            return false;
        }

    }

    function arrayCheck(obj,array,value) {
        //checks to see if an items array contains a string

        for (var key in obj) {
            if (obj[key]["name"] === userInputString) {
                console.log(obj[key][array].indexOf(character.class));
                if (obj[key][array].indexOf(character.class) > -1) {


                // if (obj[key][array] === value) {
                    console.log("VALUE MATCHED");
                    return true;

                } else {
                    console.log("VALUE NOT MATCHED");
                    return false;
                }
            }
        }

        console.log("Name not Matched");
        return false;
    }

    function moveableCheck(obj) {

        if (obj["moveable"] === "yes") {
            return true;
        } else {
            consolePush("You can't move that");
            return false;
        }
    }

    function checkLevelUp() {
        x = character.charLevel + 1;
        if (character.charXp >= xptable[x]) {
            console.log("Calling levelUp()");
            levelUp();
        }
    }


    function inventoryCheck(name,display) {
        console.log(name);
        for (var key in character.inventory) {
            if (character.inventory[key]["name"] === name) {
                console.log(name);
                console.log("inventoryCheck passed");
                return true;
            }
        }

        if (display != "hide") {
            consolePush("You don't have that item in your inventory");
        }

        console.log("inventoryCheck failed");
        return false;
    }

    function equippedCheck(name,display) {
        console.log(name);
        for (var key in character.equipment) {
            if (character.equipment[key]["name"] === name) {
                console.log(name);
                console.log("equipmentCheck passed");
                return true;
            }
        }
        if (display != "hide") {
            consolePush("You don't have that item equipped");
        }
        console.log("equipmentCheck failed");
        return false;
    }

    function roomCheck(name,display) {
        console.log(name);
        for (var key in rooms[roomName]["items"]) {
            if (rooms[roomName]["items"][key]["name"] === name) {
                console.log(name);
                console.log("roomCheck passed");
                return true;
            }
        }

        if (display != "hide") {
            consolePush("That item is not in this room");
        }
        console.log("roomCheck failed");
        return false;
    }



    function spellBookCheck(effect) {
        if (character.spells.indexOf(effect["name"]) > -1) {
            return true;
        } else {
            consolePush(effect["name"] + " is not in your spellbook");
            return false;
        }
    }

    function manaCheck(effect) {
        if (effect["manaCost"] <= character.charMana) {
            return true;
        } else {
            consolePush("You don't have enough mana for " + effect["name"]);
            return false;
        }
    }

    function coolDownCheck(effect) {
        if (effect["name"] in cooldownStore) {
            consolePush("Failed, " + effect["name"] + " is on cooldown");
            return false;
        } else {
            return true;
        }
    }

    function anyMobsCheck() {
        if (typeof(combatObj) !== "undefined") {
            for (var key in combatObj) {
                if (combatObj.hasOwnProperty(key)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    function typeCheck(name,type) {
        //see equipCheck for checking if equipable
        if(name === type) {
            return true;
        } else {
            consolePush("That item is not usable");
            return false;
        }
    }

    function equipCheck(name) {
        if (name.match(/^(head|chest|legs|hands|shield|ring|amulet|weapon)$/)) {
            return true;
        } else {
            consolePush("That item cannot be equipped");
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
                // combatStatus("off");
                rooms[roomName]["mobsDefeated"] = true;
                // console.log("mobs defeated below");
                // console.log(rooms[roomName]["mobsDefeated"]);
                initRoom(roomName);
            }
        } else {
            mobRound();
        }
    }

    function effectCheck() {
        for (var key in spellEffect) {
            if (spellEffect.hasOwnProperty(key)) {
                effect = spellEffect[key][1];

                switch(effect) {
                    case 'heal' :
                        if (counter <= spellEffect[key][0]) {
                            commandCast(key);
                        } else {
                            delete spellEffect[key];
                        }
                        break;

                    case 'buff' :
                        if (counter <= spellEffect[key][0]) {
                            //do nothing
                        } else {
                            removeBuff(spellEffect[key][2],spellEffect[key][3]);
                            delete spellEffect[key];
                        }
                        break;

                    default: consolePush("Unknown effect in effectCheck()");
                }
            }
        }

        for (var key in cooldownStore) {
            console.log(cooldownStore[key]);
            if (cooldownStore[key] < counter) {
                delete cooldownStore[key];
            }
        }
    }

    function useCharge(item, chargesExp) {
        item["charges"] = item["charges"] - chargesExp;

        if (item["charges"] < 1) {
            inventoryPos = character.inventory.indexOf(item["name"]);
            if (inventoryPos > -1) {
                consolePush("The " + item["name"] + " crumbles to dust, its power exhausted");
                character.inventory.splice(inventoryPos, 1);
            }
        } else (
            consolePush("You have " + item["charges"] + " charges left")
        )
    }

    actions =  {
            cast: function() {
                a = userInputString.match(/^(.*?)($| on (.*?)$)/); //breaks userInputString into array 'a'
                a.shift(); //strips the original string from the new array
                castSpell = a[0];
                select = "mob" + (a[2] - 1);



                if (levelCheck(magic[castSpell]) && spellBookCheck(magic[castSpell]) && manaCheck(magic[castSpell]) && coolDownCheck(magic[castSpell]) === true) {
                        //casting....
                        amount = diceRoll(magic[castSpell]["min"], magic[castSpell]["max"]);

                    if (anyMobsCheck() === true) {

                        applyEffect(castSpell,amount,combatObj[select]);

                        if (magic[castSpell]["duration"] > 0) {
                            console.log("Calling persistent effect");
                            applyPersistent();
                        }
                        mobRound();

                    } else {

                        applyEffect(castSpell,amount);

                        if (magic[castSpell]["duration"] > 0) {
                            console.log("Calling persistent effect");
                            applyPersistent();
                        }
                    }
                }

            },

            flee: function(roomName, userInputString) {

                if (anyMobsCheck() === true) {

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


                } else {
                    consolePush("There is nothing to flee from...")
                }
        },

            attack: function(roomName, userInputString) {

                if (anyMobsCheck() === true) {

                    // consolePush("You attack " + userInputString);
                    // pressInput = userInputString;
                    // userInputString = pressInput;
                    attackRound(roomName, userInputString);


                } else {
                    consolePush("There is nothing to attack...")
                }
            },

            class: function(userInputString) {
                charSelect(userInputString);
            },

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
                listInv();
            },

            look: function(roomName){
                console.log(rooms[roomName]["items"]);
                loadDescription(roomName, "default");
                listItems(roomName);
                loadDescription(roomName, "exits");
            },

            char: function() {
                calcDef();

                //weapon, shield, chest, head, legs, feet, ring

                consolePush("Name: " + character.charName);
                consolePush("Class: " + character.class);
                consolePush("Level: " + character.charLevel);
                consolePush("Weapon: <span class='capitalize'>" + itemName(character.equipment,"type","weapon") + "</span>");
                consolePush("Armour: " + itemName(character.equipment,"type","chest"));
                consolePush("Shield: " + itemName(character.equipment,"type","shield"));
                consolePush("Legs: " + itemName(character.equipment,"type","legs"));
                consolePush("Feet: " + itemName(character.equipment,"type","feet"));
                consolePush("Head: " + itemName(character.equipment,"type","head"));
                consolePush("Hands: " + itemName(character.equipment,"type","hands"));
                consolePush("Health: " + character.charHealth);
                consolePush("Mana: " + character.charMana);
                consolePush("Strength: " + character.strength);
                consolePush("Agility: " + character.agility);
                consolePush("Defense: " + totalDef);



            },

            // list: function() {
            //   listEquip();
            //   consolePush(equippedList);
            // },



            exam: function() {

                if (inventoryCheck(userInputString,"hide") || equippedCheck(userInputString,"hide") || roomCheck(userInputString,"hide") === true) {
                    consolePush("You examine the " + userInputString);

                    for (var key in equipment) {
                        if (equipment[key]["name"] === userInputString) {
                            consolePush("Description : " + equipment[key]["desc"]);
                            consolePush("Type : " + equipment[key]["type"]);
                            consolePush("Minimum Level : " + equipment[key]["levelReq"]);

                            if (equipment[key]["type"] === "container") {
                                consolePush("This container holds: ");
                                for (var key2 in equipment[key]["contents"]) {
                                    consolePush(equipment[key]["contents"][key2]["name"]);

                                }


                            }
                            console.log("end");
                        }
                    }
                }

            },

            // exam2: function(roomName,userInputString){
            //     console.log("Examining " + userInputString);
            //     itemPos = character.inventory.indexOf(userInputString);
            //     //roomPos = rooms[roomName]["items"].indexOf(userInputString);
            //     //console.log(roomPos);
            //     console.log(itemPos);
            //     if (itemPos > -1 || objCheck(rooms[roomName]["items"]) === true) {
            //         consolePush("You examine the " + userInputString);
            //         consolePush("@@figure out how to display this nicely. needs to handle SPECIAL items");
            //         consolePush(equipment[userInputString]);
            //         console.log(equipment[userInputString]);
            //         consolePush("You see " + equipment[userInputString].desc);
            //         switch(equipment[userInputString].type) {
            //             case 'weapon' : consolePush("You use it to hurt things");
            //             break;
            //             case 'container':
            //                 consolePush("Its a container");
            //                 consolePush("Inside you see " + equipment[userInputString].contents)
            //             break;
            //             case 'shield':  consolePush("Its a shield");
            //             break;
            //             case 'head' : consolePush("Its for you head");
            //             break;
            //             case 'usable' : consolePush("You can use this item");
            //             break;
            //             default: consolePush("You cant do that");
            //         }
            //     } else {
            //         consolePush("I don't see that here.")
            //     }
            //
            // },

            // remove2: function(roomName,userInputString) {
            // listEquip();
            // console.log(userInputString);
            // wornCheck = equippedList.indexOf(userInputString);
            //
            //     if (wornCheck > -1) {
            //         consolePush("You remove the " + userInputString);
            //         typeCheck = equipment[userInputString].type;
            //         character.equipment[typeCheck] = "";
            //         character.inventory.push(userInputString);
            //
            //
            //     } else {
            //         consolePush("You are not wearing " + userInputString);
            //     }
            // },


            remove: function(item) {

                if (objCheck(character.equipment,userInputString) === true) {
                    console.log("REMOVE CHECKS PASSED");
                    for (var key in character.equipment) {
                        if (character.equipment[key]["name"] === userInputString) {
                            character.inventory[key] = character.equipment[key];
                            delete character.equipment[key];
                            consolePush("You remove the " + userInputString);
                        }
                    }



                } else {
                    console.log("Remove checks failed");
                    consolePush("You can't do that");
                }


            },

            equip: function () {
                if (inventoryCheck(userInputString) && valueCheck(equipment, "use", "equip") && levelCheck2(equipment, userInputString) && arrayCheck(equipment, "class", character.class) === true) {
                        equipItem(userInputString);
                }
            },

            pickup: function(roomName) {
                //check object is in the room
                //check object is movable
                //remove object from room inventory
                //add object to character inventory

                if (objCheck(rooms[roomName]["items"],userInputString) && moveableCheck(equipment[userInputString]) === true) {
                    console.log("PICKUP CHECKS PASSED");
                    for (var key in rooms[roomName]["items"]) {
                        if (rooms[roomName]["items"][key]["name"] === userInputString) {
                            // add to inventory
                            character.inventory[key] = rooms[roomName]["items"][key];
                            //remove from room
                            delete rooms[roomName]["items"][key];
                            consolePush("You pickup the " + userInputString);
                        }
                    }
                } else {
                    console.log("Pickup checks failed");
                    consolePush("You can't do that");
                }
            },

            drop: function (roomName) {
                if(objCheck(character.inventory,userInputString) === true) {
                    for (var key in character.inventory) {
                        if (character.inventory[key]["name"] === userInputString) {
                            //Add to room
                            rooms[roomName]["items"][key] = character.inventory[key];
                            //remove from inventory
                            delete character.inventory[key];
                        }
                    }
                } else {
                    console.log("Drop checks failed");
                    consolePush("You can't do that");
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
                a = userInputString.match(/^(.*?)($| on (.*?)$)/); //breaks userInputString into array 'a'
                a.shift(); //strips the original string from the new array
                castEffect = a[0];
                select = "mob" + (a[2] - 1);
                // console.log(a);

                if(inventoryCheck(castEffect) && levelCheck(equipment[castEffect]) && typeCheck(equipment[castEffect]["type"],"usable") === true) {
                    //using item
                    amount = diceRoll(equipment[castEffect]["min"], equipment[castEffect]["max"]);
                    if (anyMobsCheck() === true) {

                        applyEffect(equipment[castEffect]["spell"],amount,combatObj[select]);
                        useCharge(equipment[castEffect],magic[equipment[castEffect]["spell"]]["chargeuse"]);


                        //usable items can't yet give persistant effects
                        // if (magic[castSpell]["duration"] > 0) {
                        //     console.log("Calling persistent effect");
                        //     applyPersistent();
                        // }


                        mobRound();

                    } else {

                        applyEffect(equipment[castEffect]["spell"],amount);
                        console.log(equipment[castEffect]["charges"]);
                        useCharge(equipment[castEffect],magic[equipment[castEffect]["spell"]]["chargeuse"]);


                        //usable items can't yet give persistant effects
                        // if (magic[castSpell]["duration"] > 0) {
                        //     console.log("Calling persistent effect");
                        //     applyPersistent();
                        // }


                    }
                } else {
                    console.log("Checks failed");
                }
            },

            testspell: function() {


            },

            test2: function() {
                console.log(character["equipment"]);

            },

            test: function(roomName,userInputString) {

                // valueCheck(item,property,value)
                // check leather armour:use = equip

                //obj = character.equipment
                //property = use
                //value = equip
                // console.log(character.inventory);
                // console.log(levelCheck2(equipment,"silver sword"));
                //valueCheck(equipment,"use","equip");
                //arrayCheck(equipment,"class",character.class)

                //console.log(equipment[userInputString]["type"]);


                // console.log(character["equipment"]);
                // console.log(equipment[userInputString]["type"]);
                // console.log(valueCheck(character["equipment"],"slot",equipment[userInputString]["type"]))

                //console.log(occupiedCheck(userInputString));

                // equipItem(userInputString);

                //itemName(obj,type,value)

                console.log(itemName(character.equipment,"type","weapon"));

            },

            clear: function() {
                consolePush("Clearing Local Storage...")
                localStorage.clear();
            },

            spellbook: function() {
                consolePush(character.spells);
            },

    };




    // function combatStatus(flag, roomName) {
    //         if (flag === "off") {
    //             // console.log("SETTING COMBAT FLAG TO OFF");
    //             combatFlag = "off";
    //             // mainListener(roomName);
    //         } else if (flag === "on") {
    //             // console.log("SETTING COMBAT FLAG TO ON");
    //             combatFlag = "on";
    //             // mainListener(roomName);
    //         } else {
    //             // console.log("COMBAT FLAG IS UNDEFINED");
    //         }
    //     }

    function actionSplit(x) {

        //split userInput into array
        tmp = userInput.split(" ");

        //assign first word to userInputAction and shortens userInput
        userInputAction = tmp.shift();

        //rejoin shortened array
        userInputString = tmp.join(" ");

    }

    function mainListener(roomName) {
        $('#userInput').unbind('keyup');
        $('#userInput').on("keyup", function (event) {
                if (event.which === 13) {
                    event.preventDefault();
                    userInput = $(this).val().toLowerCase();
                    consolePush(userInput);
                    actionSplit(userInput);
                    document.getElementById('userInput').value = "";
                    document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;
                    if (rooms[roomName]["exits"].hasOwnProperty(userInput) || actions.hasOwnProperty(userInputAction) === true) {
                        if (rooms[roomName]["exits"].hasOwnProperty(userInput)) {
                            counter++;
                            effectCheck();
                            console.log("COUNTER: " + counter);
                            consolePush(rooms[roomName]["exits"][userInput]["description"]);
                            roomName = rooms[roomName]["exits"][userInput]["nextRoom"];
                            initRoom(roomName);
                        }
                        else if  (actions.hasOwnProperty(userInputAction)) {
                            console.log("RECOGNIZED ACTION");
                            counter++;
                            effectCheck();
                            console.log("COUNTER: " + counter);
                            actions[userInputAction](roomName,userInputString);
                        }
                        else {
                            console.log("!!!!!!THIS SHOULD NEVER BE CALLED!!!!!");
                        }
                    }
                    else {
                        consolePush("I'm sorry, I don't understand that...");
                    }
                }
        });
    }

    function selectTarget() {
        document.getElementById('userInput').value = "";
        userInput = "";
        // console.log("Calling selectTarget");
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
        document.getElementById("consoleDiv").innerHTML += y + "<br>";
        document.getElementById('userInput').value = "";
        document.getElementById("consoleDiv").scrollTop = document.getElementById("consoleDiv").scrollHeight - document.getElementById("consoleDiv").clientHeight;
    }

    function initRoom(roomName) {
        // console.log("********* INITIALISING ROOM " + roomName);
        // userInput=null;
        // checkLevelUp();
        // combatStatus("off",roomName);
        mainListener(roomName);
        loadDescription(roomName, "default");
        listItems(roomName);
        // if (rooms[roomName]["items"].length > 0) {
        //     consolePush("On the floor you can see: <span class='capitalize'>" + rooms[roomName]["items"] + "</span>");
        // }

// Base Room Logic
        if (rooms[roomName]["hasMobs"] === true) {
            if (rooms[roomName]["mobsDefeated"] === true) {
                loadDescription(roomName, "mobsDefeated");
                loadDescription(roomName, "exits");
            }
            else {
                loadDescription(roomName, "mobAttack");
                combatInit(roomName);
            }

        }
        else {
            loadDescription(roomName, "exits");
        }
    }

    function combatInit(roomName) {
        // console.log("********* INITIALISING COMBAT " + roomName);
        heldWeapon = character.equipment.weapon;
        // totalDef = charDef();
        // combatStatus("on",roomName);

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
