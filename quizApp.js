$(document).ready(function() {
    //  create state object
    var state = {
        score: 0,
        total: 5,
        next: 0,
        current: false,
        questions: [{
            question: 'Who is Ironman\'s love interest?',
            answers: ['A) Wonder Woman', 'B) Batman', 'C) Pepper Potts', 'D) Black Widow'],
            correct: 2
        }, {
            question: 'What world does Thor come from?',
            answers: ['A) Earth', 'B) Nebulae', 'C) Asgard', 'D) Tatooine'],
            correct: 2
        }, {
            question: 'What is Captain America\'s real name?',
            answers: ['A) Jack Johnson', 'B) Samuel Smith', 'C) Steve Rogers', 'D) Simon Pearson'],
            correct: 2
        }, {
            question: 'Who is the leader of S.H.I.E.L.D.?',
            answers: ['A) Tony Stark', 'B) Captain America', 'C) Nick Fury', 'D) Superman'],
            correct: 2
        }, {
            question: 'Which actor plays Dr Strange?',
            answers: ['A) Chris Hemsworth', 'B) Robert Downey Jr.', 'C) Benedict Cumberbatch', 'D) Sylvester Stallone'],
            correct: 2
        }]
    }

    // state.current = state.questions[0];

    // function that change your state (modify)
    var scoreUpdate = function(myState) {
        // console.log(state.score[0]);
        myState.score++;
    }
    var goToNext = function(myState) {
        myState.next++; 
        myState.current = myState.questions[myState.next];
    }
    var reset = function(myState) {
        myState.score = 0;
        myState.next = 0;
        myState.current = false;
    }
    var getCurrentQuestion = function(myState) {
        console.log(myState);
        return myState.questions[myState.next];
    }



    // update the dom
    function genAnswerMarkUp() {
        // console.log(state.current)
        var answersMarkUp = '';
        var current = getCurrentQuestion(state);
        current.answers.forEach(function(answer, i) {
            // console.log(answer, i)
            answersMarkUp += '<input type="radio" name="answers" value=' + i + '></input> ' + answer + '<br>';
        })
        return answersMarkUp
    };
    var moveForward = function() {
        goToNext(state);
        var current = getCurrentQuestion(state);
        $('#js-question-header').html(current.question);
        // run genMarkup
        var markup = genAnswerMarkUp();
        $('#js-answers').html(markup);
        buildFooter();
    }
    var buildFooter = function() {
        $('footer').text('You have ' + state.score + ' out of ' + 5 + ' correct.');
    }

    // functions change the DOM (render HTML)
    // Hide start up screen and results
    $('.js-question-page').hide();
    $('.js-results-page').hide();


    // event listeners
    //when start button is submitted
    $('.js-start').on('click', function(event) {
        var current = getCurrentQuestion(state);
        event.preventDefault();
        //hide start page and show question page
        $('.js-start-page').hide();
        $('.js-question-page').show();
        //set up first question
        $('#js-question-header').html(current.question);
        var markup = genAnswerMarkUp();
        $('#js-answers').html(markup);
    });
    //restart button is clicked
    $('.js-restart').on('click', function(event) {
        event.preventDefault();
        reset(state);
        genAnswerMarkUp();
        $('.js-question-page').hide();
        $('.js-start-page').show();
        buildFooter();
    });

    //call function to handle questions
    //current answer is submitted
    $('.js-questions').submit(function(event) {
        event.preventDefault();
        var answer = $('input[type="radio"]:checked').val();
        var current = getCurrentQuestion(state);
        var answerNumber = Number.parseInt(answer);

        // if more than 1 checked or none checked alert('Error')

        if (answerNumber === 2) {
            scoreUpdate(state);
            alert('Correct!');
            //go to next question
            //set current to next question
            moveForward();

        } else if (answerNumber === undefined) {
            alert('Please select your answer before hitting \"Submit\".')
        } else {
            //display correct answer
            alert('Wrong! The answer is ' + current.answers[2] + '.');
            //go to next question
            moveForward();
        }
    });

    //next question
    $('.next').click(function(event) {});
});