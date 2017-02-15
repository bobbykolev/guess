require('./polyfills');
import Logic from './logic';
import Render from './render';
import DataService from './dataService';

export default function appStart() {
	let ids = {
			startBtnId: 'start-btn',
			submitBtnId: 'submit-btn',
			userInputId: 'user-input',
			messageId: 'message',
			chartId: 'chart',
			answersId: 'answers',
			scoreId: 'score',
			topScoreId: 'top-score',
			winId: 'win',
			winId2: 'win2',
			chartContainerId: 'chart-container'
		}, 
		elements = {
			startBtn: null,
			submitBtn: null,
			input: null,
			message: null,
			chart: null,
			answers: null,
			score: null,
			topScore: null,
			win: null,
			win2: null,
			chartContainer: null,
			body: null
		}, 
		appLogic,
		appRender,
		result,
	  	htmlContent = `
	  	<section>
		  	<header>
		  		<h1>Guess the number</h1>
		  	</header>
		  	<article>
			  	<div>
			  		<button id="${ids.startBtnId}">Start New Game</button>
					<form>
						<input id="${ids.userInputId}" type="number" min="1" max="101" step="1" placeholder="1 - 101">
						<button id="${ids.submitBtnId}" disabled>Go</button>
					</form>
			  	</div>
			  	<div>
					<div class="chart" id="${ids.chartContainerId}">
			  			<div id="${ids.chartId}"></div>
			  			<div></div>
			  			<div></div>
			  		</div>
			  		<div class="message-box">
			  			<ul id="${ids.messageId}">
			  			</ul>
			  		</div>
			  		<div class="stats">
						<ul>
							<li>
								<strong>Answers: </strong><span id="${ids.answersId}"></span>
							</li>
							<li>
								<strong>Score: </strong><span id="${ids.scoreId}"></span>
							</li>
							<li>
								<strong>Top Score: </strong><span id="${ids.topScoreId}"></span>
							</li>
			  			</ul>	
			  		</div>
			  	</div>
		  	</article>
		  	<footer>
				Press the 'Start' button and try to guess the generated number (1-101).<br> 
				The score is formed by the time elapsed and answers count. Smaller number means a better score.<br>
				Game is over if each of your last 4 answers is further away from the previous one.<br>
			</footer>
		</section>
		<div id="${ids.winId2}">
		  	</div>
		  	<div id="${ids.winId}">
	  	</div>`,
		listeners = {
			startNewGame: function (e) {
				e && e.preventDefault();

				appLogic = new Logic();
				appRender = new Render(elements);
				appLogic.start();

				elements.submitBtn.disabled = false;
				elements.input.value = '';
				elements.body.classList.add('animated');
				elements.input.focus();
			},
			submitAnswer: function (e) {
				e && e.preventDefault();

				if (appLogic) {
					result = appLogic.checkResult(parseInt(elements.input.value));

					if (result.isOver) {
						elements.submitBtn.disabled = true;
						elements.body.classList.remove('animated');
						result.score && DataService.setTopScore(result.score);
					}

					appRender.render(result, DataService.getTopScore());
				}
			}
		};

	//attach the initial template
	global.document.getElementById('wrapper').innerHTML = htmlContent;

	(function selectElements() {
		elements.body = document.getElementsByTagName('body')[0];
		elements.startBtn = document.getElementById(ids.startBtnId);
		elements.submitBtn = document.getElementById(ids.submitBtnId);
		elements.input = document.getElementById(ids.userInputId);
		elements.message = document.getElementById(ids.messageId);
		elements.chart = document.getElementById(ids.chartId);

		elements.answers = document.getElementById(ids.answersId);
		elements.score = document.getElementById(ids.scoreId);
		elements.topScore = document.getElementById(ids.topScoreId);

		elements.win = document.getElementById(ids.winId);
		elements.win2 = document.getElementById(ids.winId2);
		elements.chartContainer = document.getElementById(ids.chartContainerId);
	})();

	(function attachListeners() {
		elements.startBtn.addEventListener('click', listeners.startNewGame);
		elements.submitBtn.addEventListener('click', listeners.submitAnswer);
	})();
}
