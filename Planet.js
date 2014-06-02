function Planet(game, x, y, image, name, starSystem) {
	var sprite = new Phaser.Sprite(game, x, y, image);
	sprite.name = name;
	sprite.starSystem = starSystem;
	sprite.text = game.state.getCurrentState().add.text(
		x + 20,y + 150,
		name, { font: "65px Arial", fill: "#ffffff", align: "center" }
	);
	sprite.text.visible = false;
	sprite.text.anchor.setTo(0.5, 0.5);
	sprite.inputEnabled = true;
	sprite.events.onInputOver.add(displayInfo, this);
	sprite.events.onInputDown.add(travel, this);
	sprite.events.onInputOut.add(removeInfo, this);

	function displayInfo() {
		sprite.text.visible = true;
	}
	function removeInfo() {
		sprite.text.visible = false;
	}
	function travel(){
		game.state.getCurrentState().camera.focusOnXY(x, y);
		var planet = sprite.starSystem.getCurrentPlanet();
		if(planet === sprite) {
			//switch state
			alert("Traveling to planet "+planet.name);
		}
		else {
			planet.text.visible = false;
			sprite.starSystem.setCurrentPlanet(sprite);
		}
	}

	return sprite;
}