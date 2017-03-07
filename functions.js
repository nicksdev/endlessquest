

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

//Display a list of the current Mobs
var mobList = function() {
    for (key in combatObj) {
        if (combatObj.hasOwnProperty(key))
            var num = parseInt(key.charAt(3)) + 1;
        document.getElementById("consoleDiv").innerHTML += num + ") A " + combatObj[key].mobName + " with " +  combatObj[key].mobHealth + " health<br>";
    }
};

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

//CHARACTER SHEET DISPLAY
updateChar = function() {
    document.getElementById("statsDiv").innerHTML = "HEALTH : " + character.charHealth;
};


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





