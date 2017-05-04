
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
            default: "You are in the reg room. Choose your class, are you a Wizard, a Priest or a Warrior? <br> e.g. type choose warrior",
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




