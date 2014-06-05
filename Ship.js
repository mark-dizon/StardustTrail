function Ship() {
	//capacity
	this.maxCargo = 100;
	this.maxCrew = 5;

	//cargo
	this.fuel = 10;
	this.parts = 5;
	this.supplies = 0;
	this.passengers = 0;

	//stuff
	this.money = 25000;
	this.items = [];
	this.crew = [];

	this.calculateFreeCargo = function(){
		return this.maxCargo - (this.fuel + this.parts + this.supplies + this.passengers);
	}

	this.displayStats = function() {
		return 'Ship\nFuel:'+this.fuel+
			'\nCargo:'+this.calculateFreeCargo()+'/'+this.maxCargo+
			'\nMoney:'+this.money
	}
}