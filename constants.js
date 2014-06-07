
gameTitleText = 'Stardust Trail';
gameStartText = 'Press Any Key To Launch';

//Enums
states = {
	job: "Job",
	map: "Map",
	dialogue: "Dialogue",
	event: "Event",
	main: "MainMenu",
	planet: "Planet"
};

directions = {
	left: -1,
	right: 1,
	up: 2,
	down: -2
};

taskNodeStates = {
	incomplete: 0,
	inprogress: 1,
	success: 2,
	failure: -2
};

jobGraphDimensions = {
	rows: 5, 
	columns: 3
}

characterIconDimensions = {
	width: 84,
	height : 84
}

screenWidth = 1920;
screenHeight = 1080;

defaultFont = { font: "16pt Tahoma", fill: "#FFFFFF"};

StatNames = ['smarts', 'swagger', 'moxy', 'muscle'];

SkillStats = {
  piloting: 'smarts',
  lockpicking: 'swagger',
  bluffing: 'moxy'
};

SkillBonus = 3;