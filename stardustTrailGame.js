
/* Constructor the StardustTrailGame object, which is a Phaser.Game with some augmentations. */

function StardustTrailGame(screenWidth, screenHeight, gameLoopCallbacks){

    game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, '', gameLoopCallbacks);

    //Shortcut functions for state transitions:

    var stateStack = [];
    var currentStateKey;

    //Change to state key given as first parameter. Further parameters are arguments to the state's init function
    game.changeState = function(newState){
    	currentStateKey = newState;

		var argsRequired = [newState, true, false];
		var argsOptional = Array.prototype.slice.call(arguments, 1);
		game.state.start.apply(game.state, argsRequired.concat(argsOptional) );

	}

	//Change to newState while remembering the previous state. Will not clear the world for the previous state
	game.pushState = function(newState){
		stateStack.push(currentStateKey);
		currentStateKey = newState;

		var argsRequired = [newState, false, false];
		var argsOptional = Array.prototype.slice.call(arguments, 1);
		game.state.start.apply(game.state, argsRequired.concat(argsOptional) );
	}

	//ChangeState back to the previous state before the call to pushState. If no state has been pushed, this does nothing.
	game.popState = function(){
		if(stateStack.length > 0)
			game.changeState(stateStack.pop());
	}

	return game;
}
