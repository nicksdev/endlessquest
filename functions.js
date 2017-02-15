



//var charDamage = function() {
//    character.charWeapon.minDamage + character.charWeapon.maxDamage
//    diceRoll(character.charWeapon.minDamage, character.charWeapon.maxDamage)
//};
//
// var charDamage =  {
//     var rollThis = function() {diceRoll(character.charWeapon.minDamage, character.charWeapon.maxDamage)};
//     return rollThis;
// };



//mobHit



//Function for calculating damage inflicted by character
function charDamage() {
    return (diceRoll(character.charWeapon.minDamage, character.charWeapon.maxDamage) + (character.charStrength / 3));
}

//Function for calculating characters defence for a round
function charDefence() {
    return (diceRoll(1,20) + character.charAgility + character.charArmour.defence);
}

//Function for calculating mob damage
function mobDamage() {
        return (monsterArray[i].mobStrength + diceRoll(monsterArray[i].weaponDamMin,monsterArray[i].weaponDamMax) - character.charArmour.damResist);
//    return (monsterArray[i].mobStrength + diceRoll(monsterArray[i].weaponDamMin,monsterArray[i].weaponDamMax) - character.charArmour.defence);
}


function mobAttack() {
    return (diceRoll(1,20) + monsterArray[i].mobAttack + monsterArray[i].mobAgility);
}

//Display a list of the current Mobs
var mobList = function() {
    for (i = 0; i < monsterArray.length; i++) {
        document.getElementById("consoleDiv").innerHTML += "A " + monsterArray[i].mobName + "<br>";
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


//Define the variable consoleMe which creates some shorthand for pushing copy to the console.
var consoleMe = document.getElementById("consoleDiv");