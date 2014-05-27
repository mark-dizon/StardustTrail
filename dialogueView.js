
function DialogueView(contentObject) {
	var graphics;
	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.handleInput = handleInput;
	var text;
	var choiceText;
	var line = '';
	


	function preload(){

	}

	function create(){
		graphics = state.add.graphics(0,0);
		text = game.add.text(32, 380, '', { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
   		parseTextObject(contentObject);
	}

	function update(){
	}

	function handleInput(event) {
		game.popState();
	}


	function drawMainText(mainText){
		 text.setText(mainText);
	}

	function drawChoice(textLine, offset){
		text = game.add.text(32, offset, '', { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
		text.setText(textLine);
	}
	

	function parseTextObject(contentObject){
		var mainText = contentObject.mainText;
		drawMainText(mainText);
		var choiceOffset = 420;

		for (var i in contentObject.choices){
			var choice = contentObject.choices[i].textLine;
   			drawChoice(choice,choiceOffset);
   			choiceOffset+= 20
		} 
	}

	

	return state;
}