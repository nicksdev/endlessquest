
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
    charName: "Not Chosen",
    class: "template",
    charStrength: 12,
    charAgility: 6,
    maxHealth: 96,
    charHealth: 96,
    maxMana: 40,
    charMana: 40,
    equipment: {
        weapon:"sharp dagger",
        shield:"",
        chest:"leather armour",
        head:"",
        legs:"",
        feet:"",
        ring:""
    },
    spells: ["firebolt"],
    inventory: ["healing balm", "iron dagger", "wooden shield"]
};

charClass = {

    "warrior": {
        charName: "Not Chosen",
        class: "warrior",
        charStrength: 10,
        charAgility: 8,
        maxHealth: 50,
        charHealth: 50,
        maxMana: 0,
        charMana: 0,
        equipment: {
            weapon:"iron dagger",
            shield:"",
            chest:"cloth shirt",
            head:"",
            legs:"woolen leggings",
            feet:"",
            ring:""
        },
        spells: [],
        inventory: []
    },

    "priest": {
        charName: "Not Chosen",
        class: "priest",
        charStrength: 8,
        charAgility: 6,
        maxHealth: 40,
        charHealth: 40,
        maxMana: 20,
        charMana: 20,
        equipment: {
            weapon:"small iron mace",
            shield:"",
            chest:"cloth shirt",
            head:"",
            legs:"woolen leggings",
            feet:"",
            ring:""
        },
        spells: ["glow heal"],
        inventory: []
    },

    "wizard": {
        charName: "Not Chosen",
        class: "wizard",
        charStrength: 4,
        charAgility: 5,
        maxHealth: 30,
        charHealth: 30,
        maxMana: 40,
        charMana: 40,
        equipment: {
            weapon:"iron dagger",
            shield:"",
            chest:"plain robe",
            head:"",
            legs:"woolen leggings",
            feet:"",
            ring:""
        },
        spells: ["firebolt"],
        inventory: []
    },





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


magic = {

    "firebolt": {
        desc: "fly's swiftly across the room and strikes the target",
        type: "damage",
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["wizard"]
    },

    "glow heal": {
        desc: "you feel a warmth spread throughout your body and your wounds feel lessened",
        type: "heal",
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["priest"]
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