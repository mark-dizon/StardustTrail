
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

	function preload(){

	}

	function create(){
		//Mockup job graph
		node = new TaskNode( {x: 10, y:10, state: state} );
		node.setSuccessNode(new TaskNode({state: state}))
			.setSuccessNode(new TaskNode({state: state}))
			.setFailNode(new TaskNode({state: state}));
	}
	
	function update(){
	}

	function handleInput(event) {
		if(event.keyCode == Phaser.Keyboard.SPACEBAR) {
			//Fake resolving the mockup job graph
			node.next(true, function(nextNode){
				nextNode.next(true, function(nextNode){
					nextNode.next(false, function(nextNode){
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
