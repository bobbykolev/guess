import * as messages from './messages';

export default class Logic {
	constructor () {
		this.number = this.start();
		this.userChoices = [];
		this.lastThree = [];
		this.wrapper = this.getWrapperDefult();
		this.log();
	}

	start () {
		return this.getRandomInt(1, 101);
	}

	getWrapperDefult () {
		return {
			number: this.number,
			lastThree: [],
			message: '',
			startTime: new Date().getTime(),
			endTime: 0,
			isBigger: false,
			isWin: false,
			isOver: false,
			percentage: 0,
			lastInput: '',
			count: 0,
			score: null
		};
	}

	validateInput (userInput) {
		return Number.isInteger(userInput) && userInput > 0 && userInput < 102;
	}

	isAlreadySubmitted (input) {
		for (let i = 0; i < this.userChoices.length; i++) {
			if (this.userChoices[i] == input) {
				return true;
			} 
		}

		return false;
	}

	isWin (input) {
		return this.number == input;
	}

	checkExitCode (input) {
		//1. userChoices.length == 100//no need in current impl
		//2. lastThree check
		if (this.userChoices.length === 100) {
			return 1;
		} else if (this.lastThree.length > 2 && this.lastThreeFail(input)) {
			return 2;
		}

		return 3;
	}

	lastThreeFail (input) {
		let one = Math.abs(this.number - this.lastThree[0]),
			two = Math.abs(this.number - this.lastThree[1]),
			three = Math.abs(this.number - this.lastThree[2]),
			four = Math.abs(this.number - input);

		if (four > three && three > two && two > one) {
			return true;
		} 
		
		return false;
	}

	checkResult (userInput) {
		if (this.validateInput(userInput)) {
			if(!this.isAlreadySubmitted(userInput)) {
				if(!this.isWin(userInput)) {
					switch(this.checkExitCode(userInput)) {
						case 1:
						case 2:
							this.wrapper.message = messages.GAME_OVER_2;
							this.wrapper.endTime = new Date().getTime();
							this.wrapper.isOver = true;
							break;
						case 3:
						default:
							this.wrapper.message = messages.TRY_AGAIN;
							this.wrapper.lastThree = this.lastThree;
							this.updateUserArrays(userInput);
							break;
					}
				} else {
					this.wrapper.message = messages.WIN;
					this.wrapper.isWin = this.wrapper.isOver = true;
					this.wrapper.endTime = new Date().getTime();
					this.wrapper.score = this.calcScore();
				}

				this.wrapper.isBigger = userInput > this.number;
				this.wrapper.count = this.userChoices.length;
				this.setPercentage(userInput);
			} else {
				this.wrapper.message = messages.SUBMITTED;	
			}

			this.wrapper.lastInput = userInput;
		} else {
			this.wrapper.lastInput = '';
			this.wrapper.message = messages.INVALID_INPUT;
		}

		return this.wrapper;
	}

	updateUserArrays(input) {
		this.userChoices.push(input);
		if (this.lastThree.length > 2) {
			this.lastThree.shift();
		}

		this.lastThree.push(input);
	}

	setPercentage(input) {
		let absDifference = Math.abs(this.number - input),
			biggerInput = input > this.number,
			startChartVal = 0,
			halfChartVal = 50,
			topChartVal = 100;
		
		if (biggerInput) {
			let temp = halfChartVal + absDifference;
			this.wrapper.percentage =  temp > topChartVal ? topChartVal : temp;
		} else {
			let temp = halfChartVal - absDifference;
			this.wrapper.percentage = temp < startChartVal ? startChartVal : temp;
		}
	}

	getRandomInt(min, max) {
	  return (Math.floor(Math.random() * (max - min + 1)) + min);
	}

	calcScore() {
		return (this.userChoices.length + 1) * Math.floor(Math.abs(this.wrapper.endTime - this.wrapper.startTime)/100);
	}

	log() {
		let temp = (new Date()).toString().split(':');
		temp.pop();
		console.log(temp.join(':') + ':' + this.number);
	}
}