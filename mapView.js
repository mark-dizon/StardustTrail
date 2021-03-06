
function MapView() {
	var graphics;
	var state = new Phaser.State();
	var starSystem;
	var cursors;
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.handleInput = handleInput;
	state.render = render;

	function preload(){

	}

	function create(){
		state.world.setBounds(-1000,-1000,3000,3000);
		state.camera.x = 0;
		state.camera.y = 0

		graphics = state.add.graphics(0,0);
		starSystem = new StarSystem(state);
		starSystem.drawMap(graphics);
		starSystem.getPlanets().forEach(function(planet) {
			state.add.existing(planet);
		});
		cursors = state.input.keyboard.createCursorKeys();
	}

	function update(){
		if (cursors.up.isDown) {
			if (cursors.up.shiftKey) {
				state.world.scale = state.world.scale.add(.05,.05);
			}
			else {
				state.camera.y -= 4;
			}
		}
		else if (cursors.down.isDown) {
			if (cursors.down.shiftKey) {
				state.world.scale = state.world.scale.add(-.05, -.05);
				if(state.world.scale.x < 0)	{
					state.world.scale.x = 0;
				}
				if(state.world.scale.y < 0)	{
					state.world.scale.y = 0;
				}
			}
			else {
				state.camera.y += 4;
			}
		}

		if (cursors.left.isDown) {
			state.camera.x -= 4;
		}
		else if (cursors.right.isDown) {
			state.camera.x += 4;
		}
	}

	function handleInput(event) {
		switch (event.keyCode) {
	        case Phaser.Keyboard.A:
	        	game.pushState(states.event);
	            break;
	        case Phaser.Keyboard.M:
	        	game.pushState(states.Dialogue);
	        case Phaser.Keyboard.S:
	            break;
	         case Phaser.Keyboard.D:
	         	game.pushState(states.dialogue);
	            break;
	        case Phaser.Keyboard.F:
	        	game.changeState(states.job);
	            break;
			case Phaser.Keyboard.Z:
				state.world.camera.
	            break;
        }
	}

	return state;
}