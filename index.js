var quizContent = [
    {
        question: "What tag is used to connect your .js to your .html?",
        answers: ["<script>", "<link>", "<hr>", "<a>"] 
    },
    {
        question: "Which symbol is used to call a class element to: 'document.querySelector(class)",
        answers: [". (Period)", "/ (Forward Slash)", "# (Hashtag)", "@ (At)"] 
    },
    {
        question: "What would be best to use to go through an array?",
        answers: ["for", "if...then...", "while", "prompt"] 
    },
    {
        question: "What should proceed any css changes after a .setAttribute method is used?",
        answers: ["style", "css", "change", "switch"] 
    },
    {
        question: "What should surround the values of an array variable?",
        answers: ["Paranthesis ()", "Quotation Marks \"\"", "Curly Brackets {}", "Squared Brackets []"] 
    }
];
var corrAnsw = '';
var currentIndex = 0;
var timer = 60000;



// makes it so that start button begins function 'start'
var startButton = document.querySelector(".startbutton");
startButton.addEventListener("click", loopQuestions);


function loopQuestions() {
    start();
    populate();
    currentIndex++;
}

function start() {
    //removed start button
    startButton.remove();

    var h2 = document.createElement("h2");
    h2.setAttribute("id", "current-quest");
    h2.textContent = "PLACEHOLDER QUESTION";

    var button0 = document.createElement("button");
    button0.setAttribute("class", "btn btn-primary button0 aButton");
    button0.setAttribute("type", "button");
    button0.textContent = "Placeholder";

    var button1 = document.createElement("button");
    button1.setAttribute("class", "btn btn-primary button1 aButton");
    button1.setAttribute("type", "button");
    button1.textContent = "Placeholder";

    var button2 = document.createElement("button");
    button2.setAttribute("class", "btn btn-primary button2 aButton");
    button2.setAttribute("type", "button");
    button2.textContent = "Placeholder";

    var button3 = document.createElement("button");
    button3.setAttribute("class", "btn btn-primary button3 aButton");
    button3.setAttribute("type", "button");
    button3.textContent = "Placeholder";

    var quiz = document.getElementById("quiz");
    quiz.innerHTML = "";
    quiz.appendChild(h2);
    quiz.appendChild(button0);
    quiz.appendChild(button1);
    quiz.appendChild(button2);
    quiz.appendChild(button3);
    return;  
} 




function populate () {
    var currQuestion = quizContent[currentIndex].question;
    var answerArray = quizContent[currentIndex].answers;
    corrAnsw = answerArray[0]

    var shuffledArray = shuffle(answerArray)
    console.log("shuffled: " + shuffledArray);
    console.log("Answer = " + corrAnsw);

    document.querySelector("#current-quest").textContent = currQuestion;
    document.querySelector(".button0").textContent = shuffledArray[0];
    document.querySelector(".button1").textContent = shuffledArray[1];
    document.querySelector(".button2").textContent = shuffledArray[2];
    document.querySelector(".button3").textContent = shuffledArray[3];

    var button = document.querySelector("#quiz");
    button.addEventListener("click", function (event) {
    var selection = event.target.textContent;
    console.log(selection);

    if (selection === corrAnsw) {
        alert("right");
    } else {
        alert("wrong");
    } } )
    return;
}

function shuffle(array) {
    var copy = [], n = array.length, i;
    
    // While there remain elements to shuffle…
    while (n) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);
    
        // And move it to the new array.
        copy.push(array.splice(i, 1)[0]);
    }
    
    return copy;
}

    // timer = setInterval(, 1000);
    // console.log("timer" + timer);

