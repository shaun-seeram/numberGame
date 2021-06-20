// Username
let usersName = prompt("What is your name?");

if (usersName === "") {
    usersName = "Bingus";
    $(".userName").text(usersName);
} else {
    $(".userName").text(usersName);
}

alert("Are you ready to begin the game? A number will appear in the lavender box at top of the page. Find the same number in one of the circular buttons in the main area of the screen. The timers will show you how long you have to make your choice. Every 10 rounds, the timer is reduced by 2 seconds.");

// Variables
let round = 1;
let timeRemaining = 10;
let score = 0;
let numberArray = [];
let chosenNumber = 0;
let mainNumber = 0;
let milliseconds = 1000;

// Chosen Number Generator
function cNumberGenerator() {
    let rIndex = Math.floor(Math.random() * 9);
    $("h2").text(numberArray[rIndex]);
    mainNumber = numberArray[rIndex];
}

// Timer
let timer = setInterval(() => {    
    timeRemaining -= 1;
    $(".timer").text(`Timer: ${timeRemaining}`);

    if (timeRemaining < 0) {
        clearInterval(timer);
        timeRemaining = 0;
        $(".timer").text("GAME OVER");
        alert(`Thanks for playing, ${usersName}! You made it to round ${round} with a score of ${score}.`);
    }
}, milliseconds);

// Array Randomizer
const arrayRandomizer = function() {

    numberArray = []

    for (i = 1; i <= 10; i += 1) {
    let rNum = Math.floor(Math.random() * 100);
    numberArray.push(rNum);
    }

    // Setting buttons
    for (i = 0; i <= 8; i += 1) {
        $(`.b${i + 1}`).text(numberArray[i]);
    }
}   

//New Round
function newRound() {
    timeRemaining = (milliseconds / 100);
}

// Speed Up Logic
function speed() {
    if (round % 10 == 0) {
        milliseconds -= 200;
    }
}

// Score Logic
function scoreTracker() {
    score += (timeRemaining * 10);
    $(".score").text(`Score: ${score}`);
}

// Logic
function logic() {
    if (mainNumber == chosenNumber && timeRemaining > 0) {
        round += 1;
        $(".round").text(`Round ${round}`);
        scoreTracker();
        speed();
        newRound();
        arrayRandomizer();
        cNumberGenerator();
    } else {
        timeRemaining = 0;
    }
}

// On Click Event
$(".button").on("click", function() {
    chosenNumber = $(this).text();
    logic();
});

arrayRandomizer();
cNumberGenerator();


// Score is based on the seconds remaining when the click was made, * 10
// I made it to round 40, with a score of 2160. Macbook w. trackpad.
// Let me know yours if you tried it out :)