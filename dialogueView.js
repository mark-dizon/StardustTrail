//Temp takes in whole json object,
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
	var dialogueButton;
	


	function preload(){

	}

	function create(){
		graphics = state.add.graphics(0,0);
		text = game.add.text(64, 380, '', { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
		choiceText = game.add.text(64, 380, '', { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
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
		choiceText = game.add.text(64, offset, '', { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
		choiceText.setText(textLine);
	}
	

	function parseTextObject(contentObject){
		var mainText = contentObject.mainText;
		drawMainText(mainText);
		var choiceOffset = 420;
		//Fuck you Javascript
		for (var i = 0; i < contentObject.choices.length; i++){
			(function(){
			var choice = contentObject.choices[i].textLine;
			var index = i;
			  game.add.button(32, choiceOffset+i*50, 'button' + i, function(){
			 	selectDialogueOption(contentObject,contentObject.choices[index].id)
			 });
   			drawChoice(choice,choiceOffset);
   			choiceOffset+= 20;
   			})();
		} 
	}

	function selectDialogueOption(contentObject,selectedChoice){
		var success = "";
		for(var i in contentObject.choices){
			if(contentObject.choices[i].id === selectedChoice){
				success = contentObject.choices[i].success;
			}
		}
			
   			for (var i in contentObject.results){
				if(success === contentObject.results[i].id){
					choiceText.destroy();
					drawMainText(contentObject.results[i].textLine);
				}
			} 
	}

	

	return state;
}