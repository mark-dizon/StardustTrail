function StarSystem(state) {
	this.planets = [
		new Planet(game, 300, 600, 'planet', 'Stan', this),
		new Planet(game, 700, 800, 'planet','Kyle', this),
		new Planet(game, 300, 100, 'planet', 'Eric', this),
		new Planet(game, 500, 300, 'planet', 'Kenny', this)
	];
	this.currentPlanet = this.planets[0];
	this.cameraX = 0;
	this.cameraY = 0;
	this.ship = new Ship();

	this.drawMap = function(graphics) {
		graphics.beginFill(0xFFFFFF);
		for(var i = 0; i < 500; i++) {
			graphics.drawCircle(state.world.randomX, state.world.randomY, 1);
		}
	}
}
