

//Monster Array

var monsters = [];

//Monster Constructor. When called it creates a monstor object and pushes it to the monsters array

function CreateMonster(mobName, mobStrength, mobHealth, mobWeapon, weaponDam) {
    this.mobName = mobName;
    this.mobStrength = mobStrength;
    this.mobHealth = mobHealth;
    this.mobWeapon = mobWeapon;
    this.weaponDam = weaponDam;
    monsters.push(this);
}


//WeakGoblin Template
var weakGoblin = {mobName:"Weak Goblin",
    mobMaxStrength:10,
    mobMinStrength:3,
    mobMaxHealth:6,
    mobMinHealth:1,
    mobWeapon:"claws",
    weaponDam:5};

// //Create First Weak Goblin using the WeakGoblin Template
// var mobWeakGoblin = new CreateMonster(
//     weakGoblin.mobName,
//     diceRoll(weakGoblin.mobMinStrength, weakGoblin.mobMaxStrength),
//     diceRoll(weakGoblin.mobMinHealth, weakGoblin.mobMaxHealth),
//     weakGoblin.mobWeapon,
//     weakGoblin.weaponDam);
//
// //Create Second Weak Goblin using the WeakGoblin Template
// var mobWeakGoblin2 = new CreateMonster(
//     weakGoblin.mobName,
//     diceRoll(weakGoblin.mobMinStrength, weakGoblin.mobMaxStrength),
//     diceRoll(weakGoblin.mobMinHealth, weakGoblin.mobMaxHealth),
//     weakGoblin.mobWeapon,
//     weakGoblin.weaponDam);
//
//
// //Create a Cave Viper
// var mobCaveViper = new CreateMonster("Cave Viper",6,4,"bite",15);

//Log to console for testing
// console.log("You are attacked by a " + monsters[0].mobName);
// console.log("You are attacked by a " + monsters[1].mobName);
// console.log("You are attacked by a " + monsters[2].mobName);

