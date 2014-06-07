
/*A text box in which text appears one character at a time, or is "typed". Speed of text can be adjusted and sound effects set.*/
function TypewriterText(options) {
	options = options || {}

	 //Extends Phaser.Text
	Phaser.Text.call(this, game,  options.x || 0,  options.y || 0, "", options.font || defaultFont);
	var self = this; //can't count on this to be set during setTimeout

	var PUNCTUATION_DELAY_MULT = 15;

	var targetText = options.text || "";
	var duration = options.duration || 20;
	var index = 0;
	var typeSound = game.add.audio('typeText');
	var timer;

	self.setText = setText;
	self.setDuration = setDuration;
	self.play = play;
	self.type = type;

	//Sets the text to ultimatly display
	function setText(text) {
		self.text = "";
		index = 0;
		targetText = text;
	} 

	//Sets the duration *per character in milliseconds* 
	function setDuration(dur) {
		duration = dur;
	}

	function type(text, msecsPerLetter){
		setText(text);
		var msecsPerLetter = msecsPerLetter || duration;
		play(msecsPerLetter);
	}

	function play(msecsPerLetter) {
		var that = self; //keep this in closure scope for setTimeout
		//use inner function around setTimeout to keep self unchanged
		function playInner(msecsPerLetter) {
			msecsPerLetter = msecsPerLetter || duration;
			var newChar = targetText.charAt(index);
			that.text += newChar;
			if(newChar !== ' ')
				typeSound.play();
			++index;
			if(index < targetText.length) {
				if(newChar === "." || newChar === "!" || newChar === "?")
					setOnlyTimeout(playInner, msecsPerLetter * PUNCTUATION_DELAY_MULT); //wait longer on punctuation
				else setOnlyTimeout(playInner, msecsPerLetter);
			}
		}
		playInner(msecsPerLetter);
	}

	function setOnlyTimeout(timedFunc, delay){
		if(timer) {
			clearTimeout(timer);
			timer = null;
		}
		setTimeout(timedFunc, delay);
	}
}

TypewriterText.prototype = Object.create(Phaser.Text.prototype);