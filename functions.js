
//Function to send a template to the CreateMonster constructor
var createMob2 = function (mobType) {
    new CreateMonster2(
        mobType.mobName,
        diceRoll(mobType.mobMinStrength, mobType.mobMaxStrength),
        mobType.mobAgility,
        mobType.mobAttack,
        mobType.mobDefence,
        diceRoll(mobType.mobMinHealth, mobType.mobMaxHealth),
        mobType.mobWeapon
    )
};

//Function to send a template to the CreateMonster constructor
var createMob = function (mobType) {
    new CreateMonster(
        mobType.mobName,
        diceRoll(mobType.mobMinStrength, mobType.mobMaxStrength),
        mobType.mobAgility,
        mobType.mobAttack,
        mobType.mobDefence,
        diceRoll(mobType.mobMinHealth, mobType.mobMaxHealth),
        mobType.mobWeapon,
        mobType.weaponDamMin,
        mobType.weaponDamMax
    )
};

//Display a list of the current Mobs
var mobList = function() {
    for (key in combatObj) {
        if (combatObj.hasOwnProperty(key))
            var num = parseInt(key.charAt(3)) + 1;
        document.getElementById("consoleDiv").innerHTML += num + ") A " + combatObj[key].mobName + " with " +  combatObj[key].mobHealth + " health<br>";
    }
};

//CHARACTER SHEET DISPLAY
updateChar = function() {
    document.getElementById("statsDiv").innerHTML = "HEALTH : " + character.charHealth;
};

//(function() {

function errorMessage() {
    document.getElementById("consoleDiv").innerHTML += "<div class='error'>I'm sorry, I didn't understand that...<br> Please try again.<p></div>";
    document.getElementById("consoleDiv").innerHTML += rooms[roomFlag]["intro"] + roomExits;
    autoScroll();
}

function callCombat() {
    getObjectLength(combatObj);
    if (mobCount > 0) {
        combatRound();
    } else {
        document.getElementById("consoleDiv").innerHTML += "YOU ARE VICTORIOUS!!???<p>";
        combatStatus = "victory";
        autoScroll();
        roomStatus = "body";
        rooms[roomFlag][roomStatus]();
    }
}

function combatRound() {
    document.getElementById("consoleDiv").innerHTML += "New Combat Round Starting from combatRound<p>";
    mobAttack();

    if (character.charHealth > 0) {
        charAttack();
    } else {
        document.getElementById("consoleDiv").innerHTML += "YOU HAVE DIED!!!!!!!<p>"
    }
    autoScroll();
}

function mobAttack() {

    getObjectLength(combatObj);
    //Mob Combat Sequence

    // List attackers
    document.getElementById("consoleDiv").innerHTML += "You are attacked by " + mobCount + " creatures <br>";
    mobList();

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

    };
    autoScroll();

}

function charAttack() {

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
            document.getElementById("consoleDiv").innerHTML += "<span class='combatHit'> and hit for " + thisCharDamage + " damage <br></span>";
            combatObj[key].mobHealth = combatObj[key].mobHealth - thisCharDamage;

            //If mob health less than zero, remove from the literal object
            if (combatObj[key].mobHealth <= 0) {
                document.getElementById("consoleDiv").innerHTML += "The " + combatObj[key].mobName + " is dead!<br>";
                delete combatObj[key];
            } else {
                document.getElementById("consoleDiv").innerHTML += "The " + combatObj[key].mobName + " is still alive and has " + combatObj[key].mobHealth + " health!!! <br>";
            }


        } else {
            document.getElementById("consoleDiv").innerHTML += "<span class='combatMiss'>  but you missed!<br></span>";
            document.getElementById("consoleDiv").innerHTML += "The " + combatObj[key].mobName + " is still alive and has " + combatObj[key].mobHealth + " health!!! <br>";
        }

    };
    autoScroll();

}

//Random Number Generator
function diceRoll(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}

// getObjectLength(combatObj) calculates the number of mobs currently in the combatObj Object Literal and passes this value to mobCount
function getObjectLength(combatObj) {
    var combatObjSize = 0;
    for (var p in combatObj)
    {
        if (combatObj.hasOwnProperty(p))
        {
            combatObjSize++;
        }

    }
    mobCount = combatObjSize;
}

function charAttackRoll() {
    return (diceRoll(1,6) + character.charAgility/3 + character.charWeapon.attack);
}

//Function for calculating damage inflicted by character
function charDamageRoll() {
    return (diceRoll(character.charWeapon.minDamage, character.charWeapon.maxDamage) + (character.charStrength / 3));
}

//Function for calculating characters defence for a round
function charDefenceRoll() {
    return (diceRoll(1,20) + character.charAgility + character.charArmour.defence);
}

//Function for calculating mob damage
function mobDamageRoll() {
        return (combatObj[key].mobStrength + diceRoll(combatObj[key].mobWeapon.minDamage,combatObj[key].mobWeapon.maxDamage) - character.charArmour.damResist);
}

//Function for calculating mob attack
function mobAttackRoll() {
    return (diceRoll(1,20) + combatObj[key].mobAttack + combatObj[key].mobAgility);
}

//Function for calculating mob defence
function mobDefenceRoll() {
    return (diceRoll(1,6) + combatObj[key].mobDefence);
}

//Monster Constructor. When called it creates a monstor object and pushes it to the monsters array
function CreateMonster(mobName, mobStrength, mobAgility, mobAttack, mobDefence, mobHealth, mobWeapon, weaponDamMin, weaponDamMax) {
    this.mobName = mobName;
    this.mobStrength = mobStrength;
    this.mobAgility = mobAgility;
    this.mobAttack = mobAttack;
    this.mobDefence = mobDefence;
    this.mobHealth = mobHealth;
    this.mobWeapon = mobWeapon;
    this.weaponDamMin = weaponDamMin;
    this.weaponDamMax = weaponDamMax;
    monsterArray.push(this);
}

//Monster Constructor. When called it creates a monstor object and pushes it to the monsters array
function CreateMonster2(mobName, mobStrength, mobAgility, mobAttack, mobDefence, mobHealth, mobWeapon, weaponDamMin, weaponDamMax) {
    this.mobName = mobName;
    this.mobStrength = mobStrength;
    this.mobAgility = mobAgility;
    this.mobAttack = mobAttack;
    this.mobDefence = mobDefence;
    this.mobHealth = mobHealth;
    this.mobWeapon = mobWeapon;
    monsterArray.push(this);
}

//})();

