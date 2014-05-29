
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
		node = new TaskNode( {x: 10, y:10, state: state} );
		node.setSuccessNode(new TaskNode({state: state}))
			.setSuccessNode(new TaskNode({state: state}))
			.setFailNode(new TaskNode({state: state}));
	}
	
	function update(){
	}

	function handleInput(event) {
		game.changeState(states.map);
	}

	function initJob(job) {
		currentJob = job;
	}


	return state;
}
