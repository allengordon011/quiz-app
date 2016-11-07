$(document).ready(function(){
//  create state object
var state = {
	score: 0,
	next: 2,
	current: false,
	questions: [
		{question: 'Who is Ironman\'s love interest?',
		answers: ['A) Wonder Woman', 'B) Batman', 'C) Pepper Potts', 'D) Black Widow'],
		correct: [2]
		},
		{question: 'What world does Thor come from?',
		answers: ['A) Earth','B) Nebulae','C) Asgard','D) Tatooine'],
		correct: [2]
		}
	]
}

state.current=state.questions[0];
// function that change your object (modify)
function genAnswerMarkUp(answer, id){
	var markUp='<input type="checkbox" data-id="'+ id +'"></input> '+answer+'<br>';
	return markUp;
}
var answersMarkUp='';
state.current.answers.forEach(function(answer, i){
	var current= genAnswerMarkUp(answer, i);
	answersMarkUp+= current;
});

// functions change the DOM (render HTML)
// 1) Hide or replace start up screen
$('.js-question-page').hide();
$('.js-results-page').hide();
// 2) Bring up the first question
$('#js-question-header').html(state.current.question);
$('#js-answers').html(answersMarkUp);
// 3) alert correct or incorrect
// 4) Move to next question
	//point state.current to new question
// 5) Start over
// 6) Update current score


// event listeners
	//when start button is submitted
	$('.js-start').on('click', function(event) {
		event.preventDefault();
		//hide start page and show question page
		$('.js-start-page').hide();
		$('.js-question-page').show();
	});
	   //call function to handle questions
	//current answer is submitted
	$('.js-questions').submit(function(event){
		event.preventDefault();

		var answer = $('input[type=checkbox]:checked')[0].getAttribute("data-id");
		var answerNumber = Number.parseInt(answer);
		// if more than 1 checked or none checked alert('Error')
		if (answerNumber===2) {
			alert('Correct!');
			//go to next question
			// $('#js-question-header').html(state.current.question);
			// $('#js-answers').html(answersMarkUp);
		}
		else {
			alert('Wrong!');
			//go to next question

		}
	});
	//next question
	$('.next').click(function(event){});
	//restart button is clicked
	$('.restart').click(function(event){});
});
