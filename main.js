var textContent = {
    "mainText":"This is an example dialogue statement",
    "choices" :[{
        "id" : 1,
        "textLine" : "this is a text choice",
        "success" : 4,
        "failure" : 3
    },{
        "id" : 2,
        "textLine" : "this is a second text choice",
        "success" : 4,
        "failure" : 3
    }
    ],
    "results" : [{
        "id" : 4,
        "textLine" : "you have made the right choice"
    },
    {
        "id" : 3,
        "textline " : "that was the wrong choice"
    }
    ]
};

    
    

window.onload = function() {
	//Setup Phaser
    game = new StardustTrailGame(screenWidth, screenHeight, { preload: preload, create: create, update: update, render: render });
};


function preload(){
	//Load assets
	game.load.image('planet', 'planet.png');
}

function create() {
    //Setup the scaling configuration
	starSystem = new StarSystem();
	ship = new Ship();
    game.scale.setShowAll();
    game.scale.refresh();

	//Initialize
	game.input.keyboard.addCallbacks(null, null, input);
	
	game.state.add( states.main, new MainMenu() );
	game.state.add( states.map, new MapView() );
    game.state.add( states.job, new JobView() );
    game.state.add( states.event, new EventView() );
    game.state.add( states.dialogue, new DialogueView(textContent) );
//	game.state.add( states.planet, new PlanetView());
    game.changeState( states.main );
}

function update() {
	//Frame update
}

function render() {

	game.debug.cameraInfo(game.camera, 32, 32);
}

function input(event) {
	game.state.getCurrentState().handleInput(event);
}



