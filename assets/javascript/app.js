var _questionsList = [
    "Who won the 1994 FIFA World Cup?",
    "Which of these star soccer players has never played for Real Madrid?",
    "According to the official FIFA rulebook, how long can a goalkeeper hold onto the ball for?",
    "Anfield is the home of which English Premier League club?",
    "Which of these players has never played for Manchester United?",
    "Why did the Indian national team withdraw from the FIFA World Cup competition in 1950?",
    "In the MLS in what city does the team Chivas USA play?",
    "What are the home colors of the FC Barcelona soccer uniform?",
    "Back in the Mls, who is the all time leading goal scorer in the league?",
    "Which of these teams is not playing in the the EPL in the 2009-2010 season?"
]


//The first item of each array is the corerct answer, second-url correct image, third-url incorrect image
var _answersList = [
    [
        "Brazil",
        "assets/images/correct1.jpg",
        "assets/images/incorrect1.gif",
        "Italy",
        "Argentina",
        "Germany",
        "France",
        "Brazil"
    ],
    [
        "Lionel Messi",
        "assets/images/correct2.jpg",
        "assets/images/incorrect2.gif",
        "David Beckham",
        "ArgeZinedine Zidanentina",
        "Ronaldo",
        "Robinho",
        "Lionel Messi"
    ],
    [
        "5 seconds",
        "assets/images/correct3.jpg",
        "assets/images/incorrect3.gif",
        "3 seconds",
        "5 seconds",
        "30 seconds",
        "10 seconds",
        "Until he feels like letting go"
    ],
    [
        "Liverpool",
        "assets/images/correct4.jpg",
        "assets/images/incorrect4.gif",
        "Manchester United",
        "West Ham United",
        "Manchester City",
        "Liverpool",
        "Everton"
    ],
    [
        "Bobby Moore",
        "assets/images/correct5.jpg",
        "assets/images/incorrect5.gif",
        "Eric Cantona",
        "Bobby Charlton",
        "Ryan Giggs",
        "Mark Hughes",
        "Bobby Moore"
    ],
    [
        "Because they could not play barefoot",
        "assets/images/correct6.jpg",
        "assets/images/incorrect6.gif",
        "As a political protest",
        "Because they did not have enough players to field a full squad",
        "Because they could not play barefoot",
        "Because turbants were not allowed",
        "They didn't just a soccer myth"
    ],
    [
        "Carson, California",
        "assets/images/correct7.jpg",
        "assets/images/incorrect7.gif",
        "Buffalo, New York",
        "Baltimore, Maryland",
        "Carson, California",
        "Miami, Florida",
        "Phoenix, Arizona"
    ],
    [
        "Blue and Red",
        "assets/images/correct8.jpg",
        "assets/images/incorrect8.gif",
        "Orange and White",
        "Black and White",
        "Blue and Red",
        "Yellow and Blue",
        "All Blue"
    ],
    [
        "Jaime Moreno",
        "assets/images/correct9.jpg",
        "assets/images/incorrect9.gif",
        "Landon Donovan",
        "Jaime Moreno",
        "Preki",
        "Carlos Ruiz",
        "David Beckham"
    ],
    [
        "Newcastle United",
        "assets/images/correct10.jpg",
        "assets/images/incorrect10.gif",
        "Wolderhampton Wanderers",
        "Birmingham City",
        "Burnley FC",
        "Wigan Athletic",
        "Newcastle United"
    ],
];


var _correctCounter = 0;
var _incorrectCounter = 0;

var _waitingTime = 10;
var _timeRemaining = 0;
var _questionNumber = 0;
var _questionNumberArray = [];
var _timeUpUrl = "assets/images/timeUp.gif"
var _timeInterval;
var _messageText = "";

start();

function start() {
    _timeRemaining = _waitingTime;
    // resetTime();
    newQuestion();

}

/**
 *Generate a random number to set the question then write the html
 *
 */
function newQuestion() {

    if (_questionNumber < _questionsList.length) {
        resetTime();
        setQuestions(_questionsList[_questionNumber], _answersList[_questionNumber]);
        // _questionNumberArray.push(_questionNumber);
        _questionNumber++;
    }
    else {
        finalResult();
    }
}

/**
 *Decrement the time counter and write in the label
 *
 */
function decrement() {
    _timeRemaining--;
    $("#timeRemaining").text(_timeRemaining);

    if (_timeRemaining === 0) {
        timeUp();
        // newQuestion();
        // _questionNumberArray = [];
    }
}

function timeUp() {

    $("#messageResult").show()
    $("#messageResult").text("TIME IS UP... The correct answer was !!! " + _messageText.toUpperCase() + " !!!")
    _incorrectCounter++;
    $("#imgResult").attr("src", _timeUpUrl)
    stopTime();
    _timeRemaining = _waitingTime;
    setWaitTime();
    // resetTime();    
    clearQuestion();
}

function stopTime() {
    clearInterval(_timeInterval);
}

function setWaitTime() {
    setTimeout(newQuestion, 4000);
}

function resetTime() {
    _timeInterval = setInterval(decrement, 1000);
}


/**
 *Write html with list
 *
 * @param {*} _question questions
 * @param {*} _answers array with the possible answers 
 */
function setQuestions(_question, _answers) {
    $("#imgResult").attr("src", '')
    $(".pScore, #btnReset, #messageResult, #imgResult").hide();

    //Add question
    $("#question").text(_question);

    var _ul = $("<ul>")
    for (i = 3; i < _answers.length; i++) {
        //Create listItem
        var _li = $('<li class="listItem text-center">');
        //Create anchor
        var _a = $('<a class="answerLink">' + _answers[i] + '</a>');
        _a.val(_answers[i]);

        //If the item inserted is equal the first element wich is the correct answer, add data attribute true
        if (_answers[i] === _answers[0]) {
            _a.attr("data-correct", "true");
            _a.attr("data-image", _answers[1]);

        }
        else {
            _a.attr("data-correct", "false");
            _a.attr("data-image", _answers[2]);

        }
        _li.append(_a);
        _ul.append(_li);
        $("#answers").append(_ul);
        _messageText = _answers[0];
    }
}


$(document).on('click', '.answerLink', function () {

    if ($(this).attr("data-correct") === "true") {
        $("#messageResult").text("!!! CORRECT !!!")
        _correctCounter++;
        stopTime();
        _timeRemaining = _waitingTime;
        setWaitTime();
        clearQuestion();
    }
    else {
        $("#messageResult").text("The correct answer was !!! " + _messageText.toUpperCase() + " !!!")
        _incorrectCounter++;
        stopTime();
        _timeRemaining = _waitingTime;
        setWaitTime();
        clearQuestion();

    }

    //add src to image
    $("#imgResult").attr("src", $(this).attr("data-image"))

    //show result message
    $("#messageResult, #imgResult").show();
    // start();

    // resetTime();
    // setWaitTime();
    // newQuestion();

    //Clear question information
    clearQuestion();
    //alert($(this).attr("data-correct"));
});

function clearQuestion() {
    $("#question, #answers").empty();
}



function finalResult() {
    $("#imgResult").attr("src", '')
    $("#messageResult, #imgResult").hide();
    clearQuestion();
    stopTime();
    $(".pScore, #btnReset").show();
    $("#correctScore").text(_correctCounter);
    $("#incorrectScore").text(_incorrectCounter);
    // $("#btnReset").show();
}

$("#btnReset").on('click', function (event) {
    _questionNumber = 0;
    _correctCounter = 0;
    _incorrectCounter = 0;
    start();
});