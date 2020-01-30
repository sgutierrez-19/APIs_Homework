var quizContent = [
  {
    question: 'Which tag is used to connect your .js to your .html?',
    answers: ['<script>', '<link>', '<hr>', '<a>']
  },
  {
    question:
      "Which symbol is used to call a class element to: 'document.querySelector(class)",
    answers: ['.', '/', '#', '@']
  },
  {
    question: 'What would be best to use to go through an array?',
    answers: ['for', 'if...then...', 'while', 'prompt']
  },
  {
    question:
      'What is the index of "Apple" in: var arr = ["Orange", "Apple", "Banana"]?',
    answers: ['1', '0', '2', 'A']
  },
  {
    question: 'What should surround the values of an array variable?',
    answers: [
      'Squared Brackets []',
      'Paranthesis ()',
      'Quotation Marks ""',
      'Curly Brackets {}'
    ]
  }
];

var corrAnsw = '';
var currentIndex = 0;
var scores = JSON.parse(localStorage.getItem('scores')) || [];
console.log('high scores', scores);
var time = 59;
var counttime;

// makes it so that start button begins function 'start'
var startButton = document.getElementById('start-button');
startButton.addEventListener('click', loopQuestions);

function loopQuestions() {
  start();
  populate();
  countdown();
}

function start() {
  //removed start button
  startButton.classList.add('collapse');
  document.getElementById('quiz').classList.remove('collapse');

  var h5 = document.createElement('h5');
  h5.setAttribute('id', 'current-quest');
  h5.setAttribute('class', 'display-5');

  var button0 = document.createElement('button');
  button0.setAttribute('class', 'btn btn-primary btn-lg button0 aButton');
  button0.setAttribute('role', 'button');

  var button1 = document.createElement('button');
  button1.setAttribute('class', 'btn btn-primary btn-lg button1 aButton');
  button1.setAttribute('role', 'button');

  var button2 = document.createElement('button');
  button2.setAttribute('class', 'btn btn-primary btn-lg button2 aButton');
  button2.setAttribute('role', 'button');

  var button3 = document.createElement('button');
  button3.setAttribute('class', 'btn btn-primary btn-lg button3 aButton');
  button3.setAttribute('role', 'button');

  var hr = document.createElement('hr');
  hr.setAttribute('class', 'my-4');

  var quizForm = document.getElementById('quiz');
  quizForm.innerHTML = '';

  quizForm.appendChild(h5);
  quizForm.appendChild(hr);
  quizForm.appendChild(button0);
  quizForm.appendChild(button1);
  quizForm.appendChild(button2);
  quizForm.appendChild(button3);
  return;
}

function populate() {
  var currQuestion = quizContent[currentIndex].question;
  var answerArray = quizContent[currentIndex].answers;
  corrAnsw = answerArray[0];

  var shuffledArray = shuffle(answerArray);
  console.log('shuffled: ' + shuffledArray);
  console.log('Answer = ' + corrAnsw);

  document.querySelector('#current-quest').textContent = currQuestion;
  document.querySelector('.button0').textContent = shuffledArray[0];
  document.querySelector('.button1').textContent = shuffledArray[1];
  document.querySelector('.button2').textContent = shuffledArray[2];
  document.querySelector('.button3').textContent = shuffledArray[3];
}

var button = document.querySelector('#quiz');
button.addEventListener('click', function(event) {
  var target1 = event.target.className;
  console.log(target1.includes('aButton'));
  var selection = event.target.textContent;
  console.log(selection);
  if (target1.includes('aButton')) {
    if (selection !== corrAnsw) {
      time = time - 15;
      document.querySelector('#timer-h1').textContent = time;
      wrongAnswer();
    } else if (selection === corrAnsw) {
      rightAnswer();
    }
    currentIndex++;
    if (currentIndex === 5) {
      quizPassed();
    }
    populate();
    return;
  }
});

function shuffle(array) {
  var copy = [],
    n = array.length,
    i;
  while (n) {
    i = Math.floor(Math.random() * n--);
    copy.push(array.splice(i, 1)[0]);
  }
  return copy;
}

function countdown() {
  document.querySelector('#timer-h1').textContent = 60;
  counttime = setInterval(function() {
    document.querySelector('#timer-h1').textContent = time;
    time--;

    if (time < 0) {
      clearInterval(counttime);
      document.querySelector('#timer-h1').textContent = '00 - Times Up!';
      quizFailed();
    }
  }, 1000);
}

function rightAnswer() {
  var rightDuration = 15;

  var right = setInterval(function() {
    document.querySelector('#wrong-answer').textContent =
      'Correct!  Keep it up!';
    rightDuration--;
    if (currentIndex === 4) {
      return;
    } else if (rightDuration < 0) {
      clearInterval(right);
      document.querySelector('#wrong-answer').textContent = '';
    } else if (time < 0) {
      clearInterval(right);
      document.querySelector('#wrong-answer').textContent = '';
    }
  }, 100);
}

function wrongAnswer() {
  var wrongDuration = 15;

  var wrong = setInterval(function() {
    document.querySelector('#wrong-answer').textContent = 'Wrong!  -15 Seconds';
    wrongDuration--;
    if (currentIndex === 4) {
      return;
    } else if (wrongDuration < 0) {
      clearInterval(wrong);
      document.querySelector('#wrong-answer').textContent = '';
    } else if (time < 0) {
      clearInterval(wrong);
      document.querySelector('#wrong-answer').textContent = '';
    }
  }, 100);
}

function quizFailed() {
  var quiz = document.getElementById('quiz');
  quiz.innerHTML = '';
  var h2create = document.createElement('h2');
  h2create.textContent = 'Test Failed!  You ran out of time!';
  var restartButton = document.createElement('button');
  restartButton.setAttribute('class', 'btn btn-primary btn-lg start-button');
  restartButton.setAttribute('role', 'button');
  quiz.appendChild(h2create);
  quiz.appendChild(hr);
  quiz.appendChild(restartButton);
}

function quizPassed() {
  clearInterval(counttime);
  var quiz = document.getElementById('quiz');
  quiz.innerHTML = '';

  var h1create = document.createElement('h1');
  h1create.textContent = 'You Passed!';

  scores.push({
    score: time + 1,
    name: 'placeholder'
  });

  scores.sort(function(a, b) {
    return b.score - a.score;
  });
  if (scores.length > 5) {
    scores.pop();
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  if (localStorage.score < time) {
    var h2create = document.createElement('h2');
    h2create.textContent =
      "Congratulations!  You've got the top score: " + (time + 1);
  } else {
    var h2create = document.createElement('h2');
    h2create.textContent = 'Your new score is: ' + (time + 1);
  }

  quiz.appendChild(h1create);
  quiz.appendChild(h2create);
}
