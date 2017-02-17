


//Monster Array

var monsterArray = [];


//WEAPON TEMPLATES

goblinClaws = {
//    attack: 4,
//    defence: 1,
    name: "claws",
    minDamage: 2,
    maxDamage: 5
//    speed: 3
};

smallBite = {
//    attack: 4,
//    defence: 1,
    name: "bite",
    minDamage: 1,
    maxDamage: 4
//    speed: 3
};

//EQUIPMENT:

var leatherArmour = {
    name: "Leather Armour",
    damResist: 3,
    defence: 3
};

var rustySword = {
    name: "Rusty Sword",
    minDamage: 1,
    maxDamage: 6,
    attack: 3
};

//CHARACTER

var character = {
    charName: "Robbie Badass",
    charStrength: 12,
    charAgility: 12,
    charHealth: 36,
    charAttack: function () {
        return (diceRoll(1,4) + (character.charAgility/3) + character.charWeapon.attack)
    },
    charDefence: function () {
        return (diceRoll(1,4) + (character.charAgility/3) + character.charArmour.defence)
    },
    charWeapon: rustySword,
    charArmour: leatherArmour
};

//MONSTER TEMPLATES

//WeakGoblin Template
var weakGoblin = {
    mobName:"Weak Goblin",
    mobMaxStrength:10,
    mobMinStrength:3,
    mobAgility:5,
    mobAttack: 4,
    mobDefence: 3,
    mobMaxHealth:6,
    mobMinHealth:1,
    mobWeapon:goblinClaws
};

//Cave Viper Template
var caveViper = {
    mobName:"Cave Viper",
    mobMaxStrength:3,
    mobMinStrength:2,
    mobAgility:9,
    mobAttack: 4,
    mobDefence: 3,
    mobMaxHealth:3,
    mobMinHealth:1,
    mobWeapon:smallBite
};