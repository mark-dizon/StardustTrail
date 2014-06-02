function StarSystem(state) {
	var that = {
		getCurrentPlanet: getCurrentPlanet,
		setCurrentPlanet: setCurrentPlanet,
		getPlanets: getPlanets,
		drawMap: drawMap
	};
	var planets = [
		new Planet(game, 300, 300, 'planet', 'Stan', that),
		new Planet(game, 700, 300, 'planet','Kyle', that),
		new Planet(game, 0,0, 'planet', 'Eric', that),
		new Planet(game, -100,-100, 'planet', 'Kenny', that)
	];
	var currentPlanet = planets[0];

	function getCurrentPlanet() {
		return currentPlanet;
	}

	function setCurrentPlanet(planet) {
		currentPlanet = planet;
	}

	function drawMap(graphics) {
		graphics.beginFill(0xFFFFFF);
		for(var i = 0; i < 500; i++) {
			graphics.drawCircle(state.world.randomX, state.world.randomY, 1);
		}
	}

	function getPlanets() {
		return planets;
	}
	return that;
}
