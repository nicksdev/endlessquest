// initEqFunc = function() {
//
//         var loadRoom = function(roomName) {
//             console.log(roomName);
//             console.log(rooms);
//         };
//
// //         function loadRoom(roomName) {
// // //    console.log(rooms[roomName]["name"]);
// //         console.log(roomName);
// //         console.log(rooms);
// //     };
//
//
// };
//
//
// initEqFunc();

//Random Number Generator
function diceRoll(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
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






function charAttackRoll() {
    return (diceRoll(1,6) + character.charAgility/3 + character.charWeapon.attack);
}
function charDefenceRoll() {
    return (diceRoll(1,20) + character.charAgility + character.charArmour.defence);
}
function charDamageRoll() {
    return (diceRoll(character.charWeapon.minDamage, character.charWeapon.maxDamage) + (character.charStrength / 3));
}

function mobAttackRoll() {
    return (diceRoll(1,20) + combatObj[key].mobAttack + combatObj[key].mobAgility);
}
function mobDefenceRoll() {
    return (diceRoll(1,6) + combatObj[key]["mobDefence"]);
}
function mobDamageRoll() {
    return (combatObj[key].mobStrength + diceRoll(combatObj[key].mobWeapon.minDamage,combatObj[key].mobWeapon.maxDamage) - character.charArmour.damResist);
}


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