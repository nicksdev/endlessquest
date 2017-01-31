/**
 * Created by nickhughes on 20/1/17.
 */


// function getDrink (type) {
//     var drink;
//     var drinks = {
//         'coke': function () {
//             drink = 'Coke';
//         },
//         'pepsi': function () {
//             drink = 'Pepsi';
//         },
//         'lemonade': function () {
//             drink = 'Lemonade';
//         },
//         'default': function () {
//             drink = 'Default item';
//         }
//     };
//
//     // invoke it
//     (drinks[type] || drinks['default'])();
//
//     // return a String with chosen drink
//     return 'The drink I chose was ' + drink;
// }
//
// var drink = getDrink('coke');
// // The drink I chose was Coke
// console.log(drink);


var room1 = function (type) {
    var choice;
    var options = {
        "start": function () {
            choice = "start item";
            //consoleMe.innerHTML += "You arrive at the start. There is really only one option here, head North<br>";
        },
        "help": function () {
            choice = "help item";
            //consoleMe.innerHTML += "Here is some help<br>";
        },
        "default": function () {
            choice = "default item";
            //consoleMe.innerHTML += errorMessage;
        }

    };

    (options[type] || options['default'])();

    return 'You chose ' + choice;
}
var choice = room1("bork");

console.log(choice);
