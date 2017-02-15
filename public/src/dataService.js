export default class DataService {
	static getTopScore () {
		return this.getFromLS(); 		
	}

	static setTopScore (score) {
		let last = this.getFromLS();

		return last && last < score ? '' : this.saveToLS(score);		
	}

	static saveToLS (score) {
		global.localStorage.setItem('bscore', score);
	}

	static getFromLS () {
		let result = global.localStorage.getItem('bscore');

		return result ? parseInt(result) : null;
	}
}