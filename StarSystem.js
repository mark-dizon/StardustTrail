function StarSystem(state) {
	var currentPlanet = 0;
	var numPlanets= 9;
	var planets = [
		{
			x : 300,
			y : 300,
			rad : 125,
			color: 0xFF3300
		},

		{
			x : 700,
			y : 300,
			rad : 100,
			color: 0x330033
		},

		{
			x : 0,
			y : 0,
			rad : 100,
			color: 0x335533
		},
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
		planets.forEach(function(planet) {
			graphics.beginFill(planet.color);
			graphics.drawCircle(planet.x, planet.y, planet.rad);
		});
	}

	return {
		getCurrentPlanet: getCurrentPlant,
		drawMap: drawMap
	};
}
