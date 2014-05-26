
function MapView() {
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
	}

	function update(){
	}

	function handleInput(event) {
		switch (event.keyCode) {
	        case Phaser.Keyboard.LEFT:
	        	game.state.start(states.event, false);
	            break;
	        case Phaser.Keyboard.RIGHT:
	            break;
	         case Phaser.Keyboard.UP:
	         	game.state.start(states.dialogue,false);
	            break;
	        case Phaser.Keyboard.DOWN:
	        	game.state.start(states.job);
	            break;
	        default:
				break;
        }
	}

	function drawSomething() {
		graphics.beginFill(0xFF3300);
		graphics.drawPolygon( makeSquare({x: 0, y: 0}, 500) );
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