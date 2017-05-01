
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

//CHARACTER

var character = {
    charName: "Robbie Badass",
    charStrength: 12,
    charAgility: 6,
    charHealth: 96,
    equipment: {
        weapon:"sharp dagger",
        shield:"",
        chest:"leather armour",
        head:"",
        legs:"",
        feet:"",
        ring:""
    },
    inventory: ["healing balm", "iron dagger", "wooden shield"]
};

//MONSTER TEMPLATES


mob = {

    "weakGoblin": {
        mobName: "Weak Goblin",
        mobMaxStrength: 10,
        mobMinStrength: 3,
        mobAgility: 5,
        mobAttack: 4,
        mobDefence: 3,
        mobMaxHealth: 26,
        mobMinHealth: 6,
        mobWeapon: goblinClaws
    },

    "caveViper": {
        mobName:"Cave Viper",
        mobMaxStrength:3,
        mobMinStrength:2,
        mobAgility:9,
        mobAttack: 4,
        mobDefence: 3,
        mobMaxHealth:20,
        mobMinHealth:5,
        mobWeapon:smallBite
    }

};


//WeakGoblin Template
// var weakGoblin = {
//     mobName:"Weak Goblin",
//     mobMaxStrength:10,
//     mobMinStrength:3,
//     mobAgility:5,
//     mobAttack: 4,
//     mobDefence: 3,
//     mobMaxHealth:26,
//     mobMinHealth:6,
//     mobWeapon:goblinClaws
// };

// var strongGoblin = {
//     mobName:"Strong Goblin",
//     mobMaxStrength:15,
//     mobMinStrength:8,
//     mobAgility:5,
//     mobAttack: 4,
//     mobDefence: 3,
//     mobMaxHealth:36,
//     mobMinHealth:16,
//     mobWeapon:goblinClaws
// };

//Cave Viper Template
// var caveViper = {
//     mobName:"Cave Viper",
//     mobMaxStrength:3,
//     mobMinStrength:2,
//     mobAgility:9,
//     mobAttack: 4,
//     mobDefence: 3,
//     mobMaxHealth:20,
//     mobMinHealth:5,
//     mobWeapon:smallBite
// };