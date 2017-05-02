
rooms = {


    "lobby": {
        name: "Room Lobby",
        description:  {
            default: "You are in the lobby, please choose a name by typing name yourname",
            mobAttack: "error",
            mobsDefeated: "error",
            exits: "There are doors to the north and east."
        },
        special: "",
        hasMobs: false,
        mobsDefeated: false,
        mobs: [],
        items: [""],
        exits: {
            north: {
                description: "You go North",
                nextRoom: "room0"
            },

            east: {
                description: "You go East",
                nextRoom: "registration"
            }


        }
    },




    "registration": {
        name: "Room Registration",
        description:  {
            default: "You are in the reg room. Choose your class, are you a Wizard, a Priest or a Warrior?",
            mobAttack: "error",
            mobsDefeated: "error",
            exits: "There is a door to the west."
        },
        special: {
            choose: "charSelect",
            },
        hasMobs: false,
        mobsDefeated: false,
        mobs: [],
        items: [""],
        exits: {
            west: {
                description: "You go West",
                nextRoom: "lobby"
            }

        }
    },




    "room0": {
        name: "Room 0 Name",
        description:  {
            default: "You pass through the entrance to a cold, dank cave. Water drips from the walls and ceilings.",
            mobAttack: "error",
            mobsDefeated: "error",
            exits: "The passage continues into the darkness to the north."
        },
        special: "",
        hasMobs: false,
        mobsDefeated: false,
        mobs: [],
        items: ["small oak chest","iron pot helm"],
        exits: {
            north: {
                description: "You take the Northern Exit",
                nextRoom: "room1"
            }

        }
    },

    "room1": {
        name: "Room 1 Name",
        description:  {
            default: "You enter a small square room with a table and chair in the middle.",
            mobAttack: "A pair of goblins sit at the table and leap up to attack you when you enter the room",
            mobsDefeated: "The pair of goblin corpses lie on the floor in the corner of the room",
            exits: "You can go East or West, which way do you wish to go?"
        },
        special: "",
        hasMobs: true,
        mobsDefeated: false,
        mobs: ["weakGoblin", "caveViper"],
        items: [],
        exits:  {
            east: {
                description: "You take the Eastern Exit",
                nextRoom: "room0"
            },
            west: {
                description: "You take the Western Exit",
                nextRoom: "room0"
            }
        }

    },


};


equipment = {

    // "full template": {
    //     desc: "",
    //     type: "",
    //     use: <equip or consume>
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
        desc: "a small iron dagger with a short dull blade",
        type: "weapon",
        use: "equip",
        minDamage: 1,
        maxDamage: 2,
        attack: 1,
        class: ["wizard","warrior"]
    },


    "small iron mace": {
        desc: "a small iron mace with a dull rusty head",
        type: "weapon",
        use: "equip",
        minDamage: 1,
        maxDamage: 3,
        attack: 1,
        class: ["priest","warrior"]
    },

    "sharp dagger": {
        desc: "a long steel dagger with a wickedly sharp blade",
        type: "weapon",
        use: "equip",
        minDamage: 10,
        maxDamage: 30,
        attack: 2,
        class: ["wizard","warrior"]
    },

    "rusty sword": {
        desc: "two and half feet of heavy rusted metal",
        type: "weapon",
        use: "equip",
        minDamage: 2,
        maxDamage: 4,
        attack: 3,
        class: ["warrior"]
    },

    "silver sword": {
        desc: "a light and slim blade with a silvered edge",
        type: "weapon",
        use: "equip",
        minDamage: 3,
        maxDamage: 10,
        attack: 9,
        class: ["warrior"]
    },

    "cloth shirt": {
        desc: "a flimsy shirt that provides almost no protection",
        type: "chest",
        use: "equip",
        // damResist: 2,
        defence: 1,
        class: ["priest","warrior","wizard"]
    },

    "plain robe": {
        desc: "a long robe made of rough wool",
        type: "chest",
        use: "equip",
        // damResist: 2,
        defence: 2,
        class: ["priest","warrior","wizard"]
    },



    "woolen leggings": {
        desc: "warm woolen leg coverings",
        type: "legs",
        use: "equip",
        // damResist: 2,
        defence: 1,
        class: ["priest","warrior","wizard"]
    },


    "leather armour": {
        desc: "tough leather panels stitched together to provide some protection",
        type: "chest",
        use: "equip",
        // damResist: 2,
        defence: 3,
        class: ["priest","warrior"]
    },

    "chainmail armour": {
        desc: "fine iron link forged together to form a long mail shirt providing good protection",
        type: "chest",
        // damResist: 2,
        defence: 7,
        class: ["warrior"]
    },

    "wooden shield": {
        desc: "a small round disc of wood with a handle on the back",
        type: "shield",
        use: "equip",
        // damResist: 2,
        defence: 2,
        class: ["priest","warrior"]
    },

    "iron pot helm": {
        desc: "a thin round cylinder of iron that fits over the top half of your head",
        equip: true,
        type: "head",
        use: "equip",
        // damResist: 2,
        defence: 1,
        class: ["priest","warrior"]
    },

    "small oak chest": {
        desc: "a small chest made of oak",
        type: "container",
        use: "",
        locked: false,
        trapped: false,
        contents: ["wooden shield"],
        moveable: false
    },

    "healing balm": {
        desc: "a perfumed ointment that is used for treating wounds",
        type: "usable",
        use: "heal",
        charges: 2,
        minValue: 3,
        maxValue: 8,
        class: ["wizard","warrior","priest"]
    }

};

