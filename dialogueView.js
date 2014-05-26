
function dialogueView(content) {
	var graphics;
	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.handleInput = handleInput;
	var text;
	var index = 0;
	var line = '';


	function preload(){

	}

	function create(){
		graphics = state.add.graphics(0,0);
		text = game.add.text(32, 380, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
   		nextLine();
	}

	function update(){
	}

	function handleInput(event) {
		game.state.start(states.map);
	}

	function updateLine() {

    if (line.length < content[index].length)
    {
        line = content[index].substr(0, line.length + 1);
        // text.text = line;
        text.setText(line);
    }
    else
    {
        //  Wait 2 seconds then start a new line
        game.time.events.add(Phaser.Timer.SECOND * 1, nextLine, this);
    }

	}

	function nextLine() {

    index++;

    if (index < content.length)
    {
        line = '';
        game.time.events.repeat(80, content[index].length + 1, updateLine, this);
    }

	}

	return state;
}