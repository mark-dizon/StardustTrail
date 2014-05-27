function StarSystem() {
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
		}
	];
	var edges = [];


	function getCurrentPlant() {
		return planets[currentPlanet];
	}

	function drawMap(graphics) {
		graphics.beginFill(0xFFFFFF);
		for(var i = 0; i < 300; i++) {
			var randomX = Math.floor(Math.random() * screenWidth);
			var randomY = Math.floor(Math.random() * screenHeight);
			graphics.drawCircle(randomX, randomY, 1);
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
