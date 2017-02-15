import * as messages from './messages';

export default class Render {
	constructor (elements) {
		this.messageEl = elements.message;
		this.chartEl = elements.chart;
		this.answersEl = elements.answers;
		this.scoreEl = elements.score;
		this.topScoreEl = elements.topScore;
		this.winEl = elements.win;
		this.winEl2 = elements.win2;
		this.chartContainerEl = elements.chartContainer;
		this.clear();
	}

	clear () {
		this.messageEl.innerHTML = '';
		this.chartEl.innerHTML = '';
		this.chartEl.style.left = 0;

		this.answersEl.innerHTML = '';
		this.scoreEl.innerHTML = '';
		this.topScoreEl.innerHTML = '';
	}

	render (data, score) {
		this.renderMessage(data, score);
		this.renderStats(data, score);
		this.shakeIfInvalid(data);

		this.chartEl.style.left = 'calc(' + data.percentage + '%' + ' - 10px)';
	}

	renderMessage(data, score) {
		let li = document.createElement('LI'),
			message,
			textnode;

		if (data.isWin) {
			this.renderWin(data);
			message = data.message + ' Score: ' + data.score + '! Top Score: ' + (score || '-');
		} else {
			message = data.lastInput + ' - ' + data.message + (data.lastInput > data.number ? ' ↓' : ' ↑');
		}

		textnode = document.createTextNode(message);
		li.appendChild(textnode);
		this.messageEl.insertBefore(li, this.messageEl.childNodes[0]);
	}

	renderStats(data, score) {
		this.answersEl.innerHTML = data.count;
		this.scoreEl.innerHTML = data.score;
		this.topScoreEl.innerHTML = score;
	}

	renderWin (data) {
		let that = this;

		this.winEl.classList.add('active');
		this.winEl2.innerHTML = `<div>Congrats!</div><div>Score: ${data.score}</div>`;
		this.winEl2.classList.add('active');		

		this.winTO && global.clearTimeout(this.winTO);
		this.winTO = global.setTimeout(function(){
			that.winEl2.classList.remove('active');
			that.winEl2.innerHTML = '';
			that.winEl.classList.remove('active');
		}, 3500);
	}

	shakeIfInvalid(data) {
		let that = this;

		if (data.message === messages.INVALID_INPUT || data.message === messages.SUBMITTED) {
			this.chartContainerEl.classList.add('shake');

			this.shakeTO && global.clearTimeout(this.shakeTo);
			this.shakeTO = global.setTimeout(function(){
				that.chartContainerEl.classList.remove('shake');
			}, 800);
		}
	}
}