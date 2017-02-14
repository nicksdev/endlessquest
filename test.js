


if (roomStatus = "notvisited") {
    console.log("In Start: Setting status to visited");
    roomStatus = "visited";
    console.log(roomStatus);
    window.currentRoom.intro();
} else {
    console.log("Start Option 2");
    window.currentRoom.combat();
}





if (roomStatus = "visited") {
    window.currentRoom.combat();
} else {
    window.currentRoom.encounter();
}