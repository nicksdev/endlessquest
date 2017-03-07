

window.onload=function() {





    var allRooms = function() {
        return {
            "room0": {
                name: "Room Zero",
                test: "test",
                intro: "Welcome to <roomname>",
                options: function() {
                    return "Options will appear here";
                }
            },
            "room1": {

            }
        }
    };

    var rooms = allRooms();

    console.log(rooms["room0"]["test"]);
    console.log(rooms["room0"]["options"]());












var room10 = {
    options: function() {
        console.log("asomosdfas sadfjakdsf");
    }
};

room10.options();






















}