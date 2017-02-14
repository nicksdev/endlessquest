



var character = {
    charName: "Robbie Badass",
    charStrength: 12,
    charAgility: 12,
    charHealth: 36,
    charAttack: 10, //character.charAgility/3 + character.charWeapon.attack,
    charDefence: 10,
    //2 + 2, //character.charAgility, //console.log(character.charAgility),    //character.charAgility + character.charArmour.defence,
    charWeapon: {
        name: "Rusty Sword",
        minDamage: 1,
        maxDamage: 6,
        attack: 3
    },
    charArmour: {
        name: "Leather Armour",
        defence: 3
    }
};





//Monster Array

var monsterArray = [];


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
    mobWeapon:"claws",
    weaponDam:5};


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
    mobWeapon:"bite",
    weaponDam:5};



// //Create a Cave Viper
// var mobCaveViper = new CreateMonster("Cave Viper",6,4,"bite",15);


//WEAPON TEMPLATES

goblinClaws = {
    attack: 4,
    defence: 1,
    minDamage: 1,
    maxDamage: 5,
    speed: 3
};


