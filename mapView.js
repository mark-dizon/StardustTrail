
function MapView() {
	var graphics;
	var state = new Phaser.State();
	var cursors;
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.handleInput = handleInput;
	state.render = render;

	function preload(){

	}

	function create(){
		state.planetGroup = state.add.group();
		state.world.setBounds(-1000,-1000,3000,3000);
		state.camera.focusOnXY(starSystem.cameraX, starSystem.cameraY);

		cursors = state.input.keyboard.createCursorKeys();

		//Create bitmap data
		state.bitmap = state.add.bitmapData(state.world.width,state.world.height);
		state.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		state.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
		state.add.image(0, 0, state.bitmap);
		createMap();
		drawHud();
	}

	function createMap(){
		graphics = state.add.graphics(0,0);
		starSystem.planets.forEach(function(planet){
			var planetSprite = new Phaser.Sprite(game, planet.x, planet.y, planet.image);
			state.planetGroup.add(planetSprite);
			planetSprite.anchor.setTo(0.5, 0.5);
			planetSprite.inputEnabled = true;
			planetSprite.events.onInputOver.add(function(){
				var planet = starSystem.planets[planetSprite.z - 1];
				var distance = starSystem.edges[starSystem.currentPlanet.index][planetSprite.z - 1];
				state.hoverText.visible = true;
				state.hoverText.setText(planet.name + ' ' + distance + 'mkm away');
			});
			planetSprite.events.onInputOut.add(function(){
				state.hoverText.visible = false;
			});
			planetSprite.events.onInputDown.add(function(){
				starSystem.currentPlanet = starSystem.planets[planetSprite.z - 1];
				state.planetText.setText('Current Planet: '+starSystem.currentPlanet.name);
				state.camera.focusOnXY(planet.x, planet.y);
				state.hoverText.visible = false;
				starSystem.cameraX = planet.x;
				starSystem.cameraY = planet.y;
			});
		});
		graphics.beginFill(0xFFFFFF);
		for(var i = 0; i < 500; i++) {
			graphics.drawCircle(state.world.randomX, state.world.randomY, 1);
		}
	}

	function drawHud(){
		state.hoverText = state.add.text(state.camera.width/2, state.camera.height - 100,  "", { font: "65px Arial", fill: "#ffffff", align: "center" });
		state.hoverText.anchor.setTo(0.5,0.5);
		state.hoverText.visible = false;
		state.hoverText.fixedToCamera = true;
		state.planetText = state.add.text(state.camera.width/2, 100,
			'Current Planet: '+starSystem.currentPlanet.name , { font: "65px Arial", fill: "#ffffff", align: "center" });
		state.planetText.anchor.setTo(0.5, 0.5);
		state.planetText.fixedToCamera = true;
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
				console.log(state.camera.x, state.camera.y);
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

	return state;
}