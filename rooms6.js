allRooms = function() {
    return {

    "room0": {
        name: "Room 0 Name",
        description:  function() {
            return {
                default: "You pass through the entrance to a cold, dank cave. Water drips from the walls and ceilings.",
                mobAttack: "error",
                mobsDefeated: "error",
                exits: "The passage continues into the darkness to the north."

            };
        },
        hasMobs: false,
        mobsDefeated: false,
        mobs: "",
        exits: function() {
            return {
                north: {
                    description: "You take the Northern Exit",
                    nextRoom: "room1"
                }
            }
        }
    },


    "room1": {
            name: "Room 1 Name",
            description:  function() {
                return {
                    default: "You enter a small square room with a table and chair in the middle.",
                    mobAttack: "A pair of goblins sit at the table and leap up to attack you when you enter the room",
                    mobsDefeated: "The pair of goblin corpses lie on the floor in the corner of the room",
                    exits: "You can go East or West, which way do you wish to go?"
                };
            },
            hasMobs: true,
            mobsDefeated: false,
            mobs: [weakGoblin, caveViper],
            exits: function() {
                return {
                    east: {
                        description: "You take the Eastern Exit",
                        nextRoom: "room0"
                    },
                    west: {
                        description: "You take the Western Exit",
                        nextRoom: "room0"
                    }
                }
            }

        },


    }

};

rooms  = allRooms();