var screenWidth = 1080;
var screenHeight = 720;
var textContent = [" ",
    "photon storm presents",
    "a phaser production",
    " ",
    "Kern of Duty",
    " ",
    "directed by rich davey",
    "rendering by mat groves",
    "    ",
    "03:45, November 4th, 2014",
    "somewhere in the north pacific",
    "mission control bravo ...",
    ];

window.onload = function() {
	//Setup Phaser
    game = new Phaser.Game(screenWidth, screenHeight,
                             Phaser.AUTO, '', { preload: preload, create: create, update: update });
}


function preload(){
	//Load assets


}

function create() {
	//Initialize
	game.input.keyboard.addCallbacks(null, null, input);
	
	game.state.add( states.map, new MapView() );
    game.state.add( states.job, new JobView() );
    game.state.add( states.event, new EventView() );
    game.state.add( states.dialogue, new dialogueView(textContent) );
    game.state.start( states.map );
}

function update() {
	//Frame update
}

function input(event) {
	game.state.getCurrentState().handleInput(event);
}



