
function JobView() {

	//Members
	var currentJob;
	var node;
	var afterInputCallback = null;
	var tempCompleteSound;

	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.init = initJob;
	state.handleInput = handleInput;

	var textDisplay;

	function preload(){

		game.load.audio("tempCompleteSound", "./sound/Blip_Select2.wav", true);

	}

	function create(){
		tempCompleteSound = game.add.audio("tempCompleteSound");

		//Mockup job graph
		node = new TaskNode( {x: screenWidth/4, y:screenHeight/2 - 250, state: state} );
		node.setSuccessNode(new TaskNode({state: state}))
			.setSuccessNode(new TaskNode({state: state}))
			.setFailNode(new TaskNode({state: state}));

		//Create the text log
		textDisplay = state.add.text(screenWidth * 0.01, screenHeight * 0.75,
									"Press Spacebar to progress Job.\n" +
									"Press any other key to exit Job View", 
									{ font: "16pt Courier", fill: "#FFFFFF", stroke: "#FFFFFF", strokeThickness: 1 });


		mockJobPlaythrough();
	}


	function initJob(job) {
		currentJob = job;
	}
	
	function update(){
	}

	function handleInput(event) {
		if(event.keyCode == Phaser.Keyboard.SPACEBAR) {
			if(afterInputCallback) {
				var callback = afterInputCallback;
				afterInputCallback = null;
				callback();
			}
		}
		else {
			game.changeState(states.map);
		}
	}

	function waitOnInput(afterInputFunction) {
		afterInputCallback = afterInputFunction;
	}

	//Fake resolving the mockup job graph
	function mockJobPlaythrough() {

		node.setCompletionState(taskNodeStates.inprogress);

		function resolveNode(node, success, callback) {
			tempCompleteSound.play();
			node.setCompletionState( (success) ? taskNodeStates.success : taskNodeStates.failure );
			node.next(success, function(nextNode){
				nextNode.setCompletionState(taskNodeStates.inprogress);
				waitOnInput(function(){ if(callback) callback(nextNode); })
			});
		}

		waitOnInput(function() {
			resolveNode(node, true, function(nextNode) {
				resolveNode(nextNode, true, function(nextNode) {
					resolveNode(nextNode, false, function(nextNode) {
						resolveNode(nextNode, null);
					})
				})
			})
		});
	}

	return state;
}
