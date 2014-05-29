function StarSystem(state) {
	var currentPlanet = 0;
	var numPlanets= 9;
	var planets = [
		new Planet(game, 300, 300, 'planet', 'Stan'),
		new Planet(game, 700, 300, 'planet','Kyle'),
		new Planet(game, 0,0, 'planet', 'Eric'),
		new Planet(game, -100,-100, 'planet', 'Kenny'),
	];
	var edges = [];


	function getCurrentPlant() {
		return planets[currentPlanet];
	}

	function drawMap(graphics) {
		graphics.beginFill(0xFFFFFF);
		for(var i = 0; i < 2000; i++) {
			graphics.drawCircle(state.world.randomX, state.world.randomY, 1);
		}
	}

	function getPlanets() {
		return planets;
	}

	return {
		getCurrentPlanet: getCurrentPlant,
		getPlanets: getPlanets,
		drawMap: drawMap
	};
}
