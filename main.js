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
    game = new StardustTrailGame(screenWidth, screenHeight, { preload: preload, create: create, update: update, render: render });
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
    game.state.add( states.dialogue, new DialogueView(textContent) );
    game.changeState( states.map );
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



