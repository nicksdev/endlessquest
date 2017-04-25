

//Random Number Generator
function diceRoll(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}

//Function to send a template to the CreateMonster constructor
var createMob = function (mobType) {
    new CreateMonster(
        mob[mobType].mobName,
        diceRoll(mob[mobType].mobMinStrength, mob[mobType].mobMaxStrength),
        mob[mobType].mobAgility,
        mob[mobType].mobAttack,
        mob[mobType].mobDefence,
        diceRoll(mob[mobType].mobMinHealth, mob[mobType].mobMaxHealth),
        mob[mobType].mobWeapon,
        mob[mobType].weaponDamMin,
        mob[mobType].weaponDamMax
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

// function charArmour() {
//
//         //get chest defence value
//         charChest = character.equipment.chest;
//         console.log(charChest);
//         console.log(equipment[charChest].defence);
//
//     // console.log(character.equipment.chest); //returns leather armour
//     // console.log(equipment[charChest].defence);
//
//
//
//
// }

function charAttackRoll() {
    return (diceRoll(1,6) + character.charAgility/3 + equipment[heldWeapon].attack);
}

function charDefenceRoll() {
    return (diceRoll(1,20) + character.charAgility + charDef());
}

function charDamageRoll() {
    return (diceRoll(equipment[heldWeapon].minDamage, equipment[heldWeapon].maxDamage) + (character.charStrength / 3));
}

function mobAttackRoll() {
    return (diceRoll(1,20) + combatObj[key].mobAttack + combatObj[key].mobAgility);
}

function mobDefenceRoll() {
    return (diceRoll(1,6) + combatObj[key]["mobDefence"]);
}

function mobDamageRoll() {
    return (combatObj[key].mobStrength + diceRoll(combatObj[key].mobWeapon.minDamage,combatObj[key].mobWeapon.maxDamage));
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

// function calcArm() {

    // search equipment object for type: "armour"
    // if found add defence to variable

    // for (var property in object) {
    //     if (object.hasOwnProperty(property)) {
    //         // do stuff
    //     }
    // }
    //
    // if (equipment.hasOwnProperty("armour")) {
    //     console.log(equipment.type);
    //
    // } else {
    // console.log("Not Found...");
    //



    // for (var key in equipment) {
    //     if (equipment.hasOwnProperty(key)) {
    //         console.log(key + " -> " + equipment[key].defence);
    //     }
    // }

    // var totArm;
    //
    // for (var key in equipment) {
    //     if (equipment.hasOwnProperty(key)) {
    //         console.log(key + " -> " + equipment[key].type);
    //
    //         if (equipment[key].type = "chest") {
    //             console.log(equipment[key].defence);
    //             totArm = totArm + equipment[key].defence;
    //         }
    //     }
    // }
    // console.log(totArm);
    //


    // }

    //get a list of equipped items
    //check the type of each of the equipped items
    //if the type === armour, get the defence value and aggregate




    // console.log(equipment["iron dagger"].desc);
    // console.log(equipment);
    // console.log(equipment["iron dagger"]);
    // console.log(equipment.indexOf()[1]);
    // console.log(equipment[1].type);


