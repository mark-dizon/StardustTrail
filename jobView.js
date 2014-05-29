
function JobView() {

	//Members
	var currentJob;
	var node;

	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.init = initJob;
	state.handleInput = handleInput;

	var textDisplay;

	function preload(){

	}

	function create(){
		//Mockup job graph
		node = new TaskNode( {x: 10, y:10, state: state} );
		node.setSuccessNode(new TaskNode({state: state}))
			.setSuccessNode(new TaskNode({state: state}))
			.setFailNode(new TaskNode({state: state}));

		//Create the text log
		textDisplay = state.add.text(screenWidth * 0.01, screenHeight * 0.75,
									"Press Spacebar to progress Job.\n" +
									"Press any other key to exit Job View", 
									{ font: "12pt Courier", fill: "#FFFFFF", stroke: "#FFFFFF", strokeThickness: 1 });
	}
	
	function update(){
	}

	function handleInput(event) {
		if(event.keyCode == Phaser.Keyboard.SPACEBAR) {
			//Fake resolving the mockup job graph
			node.setCompletionState(taskNodeStates.success);
			node.next(true, function(nextNode){
				nextNode.setCompletionState(taskNodeStates.success);
				nextNode.next(true, function(nextNode){
					nextNode.setCompletionState(taskNodeStates.success);
					nextNode.next(false, function(nextNode){
						nextNode.setCompletionState(taskNodeStates.failure);
						nextNode.next();
					});
				});
			});
		}
		else {
			game.changeState(states.map);
		}
	}

	function initJob(job) {
		currentJob = job;
	}


	return state;
}
