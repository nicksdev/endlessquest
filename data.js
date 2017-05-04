
//CHARACTER

var character = {
    charName: "default",
    class: "warrior",
    charLevel: 1,
    charXp: 0,
    charStrength: 10,
    charAgility: 10,
    maxHealth: 50,
    charHealth: 50,
    maxMana: 50,
    charMana: 50,
    equipment: {
        weapon:"sharp dagger",
        shield:"wooden shield",
        chest:"leather armour",
        head:"",
        legs:"",
        feet:"",
        ring:""
    },
    spells: ["firebolt","glow heal"],
    inventory: ["healing balm", "wizards hat","silver sword"]
};

charClass = {

    "warrior": {
        charName: "Not Chosen",
        class: "warrior",
        charLevel: 1,
        charXp: 0,
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
        inventory: ["chainmail armour","sharp dagger","healing balm"]
    },

    "priest": {
        charName: "Not Chosen",
        class: "priest",
        charLevel: 1,
        charXp: 0,
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
        charLevel: 1,
        charXp: 0,
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

equipment = {

    // "full template": {
    //     desc: "",
    //     type: "",
    //     use: <equip or consume>
    //     levelReq: number, can be 0;
    //     minDamage:,
    //     maxDamage:,
    //     attack:,
    //     defence:,
    //     locked:,
    //     trapped:,
    //     contents:,
    //     damResist: <not used>,
    //     minValue:,
    //     maxValue:
    //     moveable: false or undefined
    //     useable: true or undefined
    //     class: wizard, warrior, priest
    // },

    "iron dagger": {
        name: "iron dagger",
        desc: "a small iron dagger with a short dull blade",
        type: "weapon",
        levelReq: 0,
        use: "equip",
        minDamage: 1,
        maxDamage: 2,
        attack: 1,
        class: ["wizard","warrior"]
    },


    "small iron mace": {
        name: "small iron mace",
        desc: "a small iron mace with a dull rusty head",
        type: "weapon",
        levelReq: 0,
        use: "equip",
        minDamage: 1,
        maxDamage: 3,
        attack: 1,
        class: ["priest","warrior"]
    },

    "sharp dagger": {
        name: "sharp dagger",
        desc: "a long steel dagger with a wickedly sharp blade",
        type: "weapon",
        levelReq: 0,
        use: "equip",
        minDamage: 10,
        maxDamage: 30,
        attack: 2,
        class: ["wizard","warrior"]
    },

    "rusty sword": {
        name: "rusty sword",
        desc: "two and half feet of heavy rusted metal",
        type: "weapon",
        levelReq: 0,
        use: "equip",
        minDamage: 2,
        maxDamage: 4,
        attack: 3,
        class: ["warrior"]
    },

    "silver sword": {
        name: "silver sword",
        desc: "a light and slim blade with a silvered edge",
        type: "weapon",
        levelReq: 4,
        use: "equip",
        minDamage: 3,
        maxDamage: 10,
        attack: 9,
        class: ["warrior"]
    },

    "cloth shirt": {
        name: "cloth shirt",
        desc: "a flimsy shirt that provides almost no protection",
        type: "chest",
        levelReq: 0,
        use: "equip",
        // damResist: 2,
        defence: 1,
        class: ["priest","warrior","wizard"]
    },

    "plain robe": {
        name: "plain robe",
        desc: "a long robe made of rough wool",
        type: "chest",
        levelReq: 0,
        use: "equip",
        // damResist: 2,
        defence: 2,
        class: ["priest","warrior","wizard"]
    },

    "wizards hat": {
        name: "wizards hat",
        desc: "a black pointy hat made of felt",
        type: "head",
        levelReq: 0,
        use: "equip",
        // damResist: 2,
        defence: 1,
        class: ["wizard"]
    },

    "woolen leggings": {
        name: "woolen leggings",
        desc: "warm woolen leg coverings",
        type: "legs",
        levelReq: 0,
        use: "equip",
        // damResist: 2,
        defence: 1,
        class: ["priest","warrior","wizard"]
    },


    "leather armour": {
        name: "leather armour",
        desc: "tough leather panels stitched together to provide some protection",
        type: "chest",
        levelReq: 0,
        use: "equip",
        // damResist: 2,
        defence: 3,
        class: ["priest","warrior"]
    },

    "chainmail armour": {
        name: "chainmail armour",
        desc: "fine iron link forged together to form a long mail shirt providing good protection",
        type: "chest",
        levelReq: 6,
        // damResist: 2,
        defence: 7,
        class: ["warrior"]
    },

    "wooden shield": {
        name: "wooden shield",
        desc: "a small round disc of wood with a handle on the back",
        type: "shield",
        levelReq: 0,
        use: "equip",
        // damResist: 2,
        defence: 2,
        class: ["priest","warrior"]
    },

    "iron pot helm": {
        name: "iron pot helm",
        desc: "a thin round cylinder of iron that fits over the top half of your head",
        equip: true,
        type: "head",
        levelReq: 0,
        use: "equip",
        // damResist: 2,
        defence: 1,
        class: ["priest","warrior"]
    },

    "small oak chest": {
        name: "small oak chest",
        desc: "a small chest made of oak",
        type: "container",
        levelReq: 0,
        use: "",
        locked: false,
        trapped: false,
        contents: ["wooden shield"],
        moveable: false
    },

    "healing balm": {
        name: "healing balm",
        desc: "a perfumed ointment that is used for treating wounds",
        type: "usable",
        levelReq: 3,
        use: "heal",
        charges: 2,
        minValue: 3,
        maxValue: 8,
        class: ["wizard","warrior","priest"]
    }

};

magic = {

    "firebolt": {
        name: "firebolt",
        desc: "fly's swiftly across the room and strikes the target",
        type: "damage",
        levelReq: 1,
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["wizard"]
    },

    "firebolt2": {
        name: "firebolt2",
        desc: "fly's swiftly across the room and strikes the target",
        type: "damage",
        levelReq: 1,
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["wizard","priest"]
    },

    "firebolt3": {
        name: "firebolt3",
        desc: "fly's swiftly across the room and strikes the target",
        type: "damage",
        levelReq: 5,
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["wizard","priest"]
    },

    "firebolt4": {
        name: "firebolt4",
        desc: "fly's swiftly across the room and strikes the target",
        type: "damage",
        levelReq: 5,
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["wizard","priest"]
    },

    "firebolt5": {
        name: "firebolt5",
        desc: "fly's swiftly across the room and strikes the target",
        type: "damage",
        levelReq: 5,
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["wizard"]
    },

    "glow heal": {
        name: "glow heal",
        desc: "you feel a warmth spread throughout your body and your wounds feel lessened",
        type: "heal",
        levelReq: 1,
        manaCost: 4,
        minDamage: 2,
        maxDamage: 5,
        class: ["priest"]
    }


};


xptable = {

    "1": 0,
    "2": 500,
    "3": 1000,
    "4": 1800

};



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

//MONSTER TEMPLATES
mob = {

    "weakGoblin": {
        mobName: "Weak Goblin",
        mobXP: 200,
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
        mobXP: 200,
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