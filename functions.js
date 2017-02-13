





//Display a list of the current Mobs
var mobList = function() {
    for (i = 0; i < monsterArray.length; i++) {
        document.getElementById("consoleDiv").innerHTML += "A " + monsterArray[i].mobName + "<br>";
    }
};

//Monster Constructor. When called it creates a monstor object and pushes it to the monsters array
function CreateMonster(mobName, mobStrength, mobHealth, mobWeapon, weaponDam) {
    this.mobName = mobName;
    this.mobStrength = mobStrength;
    this.mobHealth = mobHealth;
    this.mobWeapon = mobWeapon;
    this.weaponDam = weaponDam;
    monsterArray.push(this);
}

//Function to send a template to the CreateMonster constructor
var createMob = function (mobType) {
    new CreateMonster(
        mobType.mobName,
        diceRoll(mobType.mobMinStrength, mobType.mobMaxStrength),
        diceRoll(mobType.mobMinHealth, mobType.mobMaxHealth),
        mobType.mobWeapon,
        mobType.weaponDam
    )
};


//Define the variable consoleMe which creates some shorthand for pushing copy to the console.
var consoleMe = document.getElementById("consoleDiv");