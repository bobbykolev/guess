import Logic from '../public/src/logic.js';
import * as messages from '../public/src/messages.js';

describe('Test Game Logic', () => {
  it('should generate number between 1 and 101', () => {
  	let result, appLogic = new Logic();

  	result = appLogic.checkResult(1);

  	expect(result.number).toBeLessThan(102);
  	expect(result.number).not.toBeLessThan(1);
  });

  it('should retrn error for invalid input', () => {
  	let result, appLogic = new Logic(), invalidInput = [105, -1, "sdf"];

    for (var i = 0; i < invalidInput.length; i++) {
      result = appLogic.checkResult(invalidInput[i]);
      expect(result.message.indexOf('Invalid') > -1).toBeTruthy();
    }

    result = appLogic.checkResult(5);
    result = appLogic.checkResult(result.number + 0.1);
    expect(result.message.indexOf('Invalid') > -1).toBeTruthy();
  });

  it('should retrn relatively correct percentage', () => {
  	let result, appLogic = new Logic(), userChoice = 35, half = 50;

  	result = appLogic.checkResult(userChoice);

  	if (result.number < userChoice) {
  		expect(result.percentage).not.toBeLessThan(half);
  		expect(result.isBigger).toBeTruthy();
  	} else if (result.number > userChoice) {
  		expect(result.percentage).toBeLessThan(half);
  		expect(result.isBigger).toBeFalsy();
  	} else {
  		expect(result.percentage).toEqual(half);
  	}
  });

  it('should retrn win message on win', () => {
  	let result, appLogic = new Logic();

  	result = appLogic.checkResult(0);
  	result = appLogic.checkResult(result.number);
  	
  	expect(result.message).toEqual(messages.WIN);
  });

  it('should has score on win', () => {
  	let result, appLogic = new Logic();
  	
	result = appLogic.checkResult(0);
	result = appLogic.checkResult(result.number);

	expect(result.isWin).toBeTruthy();
	expect(result.score).not.toBeLessThan(0);
  });

  it('should not has score on lose', () => {
  	let result, appLogic = new Logic();

  	result = appLogic.checkResult(0);

  	for (let i = 0; i < 4; i++) {
  		if (result.number < 96) {
  			result = appLogic.checkResult(result.number + i+1);
	  	} else {
	  		result = appLogic.checkResult(result.number - (i+1));
	  	}	
	}

  	expect(result.message).toEqual(messages.GAME_OVER_2);
  	expect(result.score).toEqual(null);
  });

  it('should lose on more than 3 colder guesses', () => {
  	let result, appLogic = new Logic();

  	result = appLogic.checkResult(0);

  	for (let i = 0; i < 4; i++) {
  		if (result.number < 6) {
  			result = appLogic.checkResult(result.number + i+1);
	  	} else {
	  		result = appLogic.checkResult(result.number - (i+1));
	  	}	
	}

  	expect(result.message).toEqual(messages.GAME_OVER_2);
  	expect(result.isWin).toEqual(false);
  	expect(result.isOver).toEqual(true);
  });

  it('should return submitted message if already submitted', () => {
  	let result, appLogic = new Logic();

  	result = appLogic.checkResult(0);
    if (result.number > 99) {
      result = appLogic.checkResult(result.number - 1);
      result = appLogic.checkResult(result.number - 1);
    } else {
      result = appLogic.checkResult(result.number + 1);
      result = appLogic.checkResult(result.number + 1);
    }

  	expect(result.message).toEqual(messages.SUBMITTED);
  });

  it('should return Try Again message if guess is wrong', () => {
    let result, appLogic = new Logic();

    result = appLogic.checkResult(0);

    if (result.number > 1) {
        result = appLogic.checkResult(result.number - 1);
    } else {
        result = appLogic.checkResult(result.number + 1);
    }

    expect(result.message).toEqual(messages.TRY_AGAIN);
  });

});