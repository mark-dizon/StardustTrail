

function JobView() {
	var graphics;

	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.handleInput = handleInput;

	function preload(){

	}

	function create(){
		graphics = state.add.graphics(0,0);
		showJobView(0x111300);
	}
	
	function update(){
	}

	function handleInput(event) {
		game.state.start(states.map);
	}

	function showJobView(color) {
		graphics.beginFill(color);
		graphics.drawPolygon( makeSquare({x: 0, y: 0}, 500) );
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





function makeSquare(topLeft, length) {
	return new Phaser.Polygon([
		new Phaser.Point(topLeft.x, topLeft.y),
		new Phaser.Point(topLeft.x, topLeft.y + length),
		new Phaser.Point(topLeft.x + length, topLeft.y + length),
		new Phaser.Point(topLeft.x + length, topLeft.y)
	]);
}

function makeTriangle(sideLength, center) {
	return new Phaser.Polygon([
		new Phaser.Point(0, 0),
		new Phaser.Point(0, 10),
		new Phaser.Point(10, 10)
	]);
}