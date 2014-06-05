function EventView() {
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
		drawSomething();
		console.log(state.camera.x, state.camera.y);
		state.world.setBounds(-1000,-1000,3000,3000);
		state.camera.focusOnXY(starSystem.cameraX, starSystem.cameraY);

	}

	function update(){
	}

	function handleInput(event) {
		game.popState();
	}

	function drawSomething() {
		graphics.beginFill(0x888800);
		graphics.drawPolygon( makeSquare({x: 300, y: 300}, 500) );
	}


	function makeSquare(topLeft, length) {
		return new Phaser.Polygon([
			new Phaser.Point(topLeft.x, topLeft.y),
			new Phaser.Point(topLeft.x, topLeft.y + length),
			new Phaser.Point(topLeft.x + length, topLeft.y + length),
			new Phaser.Point(topLeft.x + length, topLeft.y)
		]);
	}

	return state;
}