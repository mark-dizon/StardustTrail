
function MapView() {
	var graphics;
	var state = new Phaser.State();
	var starSystem;
	var cursors;
	var planetText;
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

		//Create bitmap data
		state.bitmap = state.add.bitmapData(state.world.width,state.world.height);
		state.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		state.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
		state.add.image(0, 0, state.bitmap);

		planetText = state.add.text(
			800,800,
			"Current Planet:"+starSystem.getCurrentPlanet().name,
			{ font: "65px Arial", fill: "#ffffff", align: "center" }
		);
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
		if(starSystem.getCurrentPlanet().name != planetText.text) {
			planetText.text = starSystem.getCurrentPlanet().name;
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
        }
	}

	function render() {
	}

	function drawTrajectory() {
		// Clear the bitmap
		state.bitmap.context.clearRect(0, 0, state.world.width, state.world.height);

		// Set fill style to white
		state.bitmap.context.fillStyle = 'rgba(255, 255, 255, 0.5)';

		// Calculate a time offset. This offset is used to alter the starting
		// time of the draw loop so that the dots are offset a little bit each
		// frame. It gives the trajectory a "marching ants" style animation.
		var MARCH_SPEED = 40; // Smaller is faster
		this.timeOffset = this.timeOffset + 1 || 0;
		this.timeOffset = this.timeOffset % MARCH_SPEED;

		// Just a variable to make the trajectory match the actual track a little better.
		// The mismatch is probably due to rounding or the physics engine making approximations.
		var correctionFactor = 0.99;

		// Draw the trajectory
		// http://en.wikipedia.org/wiki/Trajectory_of_a_projectile#Angle_required_to_hit_coordinate_.28x.2Cy.29
		var theta = -this.gun.rotation;
		var x = 0, y = 0;
		for(var t = 0 + this.timeOffset/(1000*MARCH_SPEED/60); t < 3; t += 0.03) {
			x = this.BULLET_SPEED * t * Math.cos(theta) * correctionFactor;
			y = this.BULLET_SPEED * t * Math.sin(theta) * correctionFactor - 0.5 * this.GRAVITY * t * t;
			this.bitmap.context.fillRect(x + this.gun.x, this.gun.y - y, 3, 3);
			if (y < -15) break;
		}

		this.bitmap.dirty = true;
	};

	return state;
}