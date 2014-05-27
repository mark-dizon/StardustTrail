

function JobView() {

	//Constants
	var taskNodeDefaults = {
		width: 150,
		height: 200,
		color: 0x2B2B2A,
		borderColor: 0xFCAE1C,
		borderWidth: 2
	}

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
		var rect = taskNodeDefaults;
		rect.x = 10;
		rect.y = 10;
		rect.state = state;
		node = new TaskNode(rect);

		node.addConnectedNode(new TaskNode(rect))
			.addConnectedNode(new TaskNode(rect));
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






















function makeTaskNode(prev, isSuccess){
	var taskNode = {};
	taskNode.type = "Fake task here";
	if(isSuccess)
		prev.success = taskNode;
	else
		prev.failure = taskNode;

	return taskNode;
};

var dummyJob = {};
dummyJob.type = "start";
makeTaskNode( makeTaskNode(dummyJob, true), true);
