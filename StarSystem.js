function StarSystem() {
	this.planets = [
		new Planet(0, 300, 600, 'planet', 'Stan'),
		new Planet(1, 700, 800, 'planet','Kyle'),
		new Planet(2, 300, 100, 'planet', 'Eric'),
		new Planet(3, 500, 300, 'planet', 'Kenny')
	];
	this.edges = [
		[0,1,2,3],
		[4,0,5,6],
		[7,8,0,9],
		[8,7,6,0]
	];
	this.currentPlanet = this.planets[0];
	this.cameraX = 0;
	this.cameraY = 0;

	//distance from current planet to another planet
	this.getDistance = function(planet) {
		return this.edges[this.currentPlanet.index][planet.index];
	}

	this.canTravel = function(planet) {
		return this.getDistance(planet) <= ship.fuel;
	}

	this.travel = function(planet) {
		ship.fuel = ship.fuel - this.getDistance(planet);
		this.currentPlanet = planet;
		console.log('Fuel = ' + ship.fuel + ' Distance = ' + this.getDistance(planet));
	}
}
