var screenWidth = 1080;
var screenHeight = 720;
var textContent = {
    "mainText":"This is an example dialogue statement",
    "choices" :[{
    	"id" : 1,
    	"textLine" : "this is a text choice"
    },{
    	"id" : 2,
    	"textLine" : "this is a second text choice"
    }
    ]
}

    
    

window.onload = function() {
	//Setup Phaser
    game = new StardustTrailGame(screenWidth, screenHeight, { preload: preload, create: create, update: update });
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



