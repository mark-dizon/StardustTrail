function Planet(game, x, y, image, name) {
	var sprite = new Phaser.Sprite(game, x, y, image);
	sprite.name = name;
	sprite.inputEnabled = true;
	sprite.events.onInputOver.add(displayInfo, this);
	sprite.events.onInputOut.add(removeInfo, this);

	function displayInfo() {
		sprite.text = game.state.getCurrentState().add.text(
			x + 20,y + 150,
			name, { font: "65px Arial", fill: "#ffffff", align: "center" }
		);
		sprite.text.anchor.setTo(0.5, 0.5);
	}
	function removeInfo() {
		sprite.text.destroy();
	}

	return sprite;
}