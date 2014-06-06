
function PlanetView() {
	var graphics;
	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.handleInput = handleInput;
	state.render = render;

	function preload(){

	}

	function create(){
		graphics = state.add.graphics(0,0);
		console.log(state.camera.x, state.camera.y);
		state.world.setBounds(-1000,-1000,3000,3000);
		state.camera.focusOnXY(starSystem.cameraX, starSystem.cameraY);

		drawMenu();
	}

	function drawMenu(){
		// Status line
		state.hoverText = state.add.text(state.camera.width/2, state.camera.height - 100,  "", { font: "65px Arial", fill: "#ffffff", align: "center" });
		state.hoverText.anchor.setTo(0.5,0.5);
		state.hoverText.visible = false;
		state.hoverText.fixedToCamera = true;

		// Deal - Buy stuff
		state.planetText = state.add.text(state.camera.width/2, state.camera.height/2 - 100,
			'Deal', { font: "65px Arial", fill: "#ffffff", align: "center" });
		state.planetText.anchor.setTo(0.5, 0.5);
		state.planetText.fixedToCamera = true;

		// Meet - Get tasks
		state.planetText = state.add.text(state.camera.width/2, state.camera.height/2,
			'Meet', { font: "65px Arial", fill: "#ffffff", align: "center" });
		state.planetText.anchor.setTo(0.5, 0.5);
		state.planetText.fixedToCamera = true;

		// Misbehave - Start a Job
		state.planetText = state.add.text(state.camera.width/2, state.camera.height/2 + 100,
			'Misbehave', { font: "65px Arial", fill: "#ffffff", align: "center" });
		state.planetText.anchor.setTo(0.5, 0.5);
		state.planetText.fixedToCamera = true;

	}

	function update(){

	}

	function handleInput(event)	{
	}

	return state;
}