
//A visual representation of of a character for use by the JobView. Displays Character info and can be dragged on to droppable slots.
function CharacterDraggable(options) { //Extends Sprite
	var x = options.x || 0;
	var y = options.y || 0;
	var character = options.character;
	var state = options.state;

	var anchor = {
		x: x,
		y: y
	}

	var spriteImage = 'cowboy';
	var self = state.add.sprite(x, y, spriteImage);

	var characterName = (character && character.name) ? character.name : "Test";
	self.addChild(new Phaser.Text(game, 0, -20,  characterName, 
						{ font: "16pt Courier", fill: "#FCAE1C", stroke: "#FCAE1C", strokeThickness: 1 }));

	self.inputEnabled = true;
	self.input.allowHorizontalDrag = true;
	self.input.allowVerticalDrag = true;
	self.input.enableDrag(false);

	var currentDragTarget = null;

	self.getCharacter = function(){
		return character;
	}

	self.setAnchor = function(x, y) {
		anchor = {
			x: x,
			y: y
		};
	}


	self.update = function() {
		if(!self.input.isDragged) return;

		//Check collision against all existing drag targets. 
		//This method assumes there won't be more than 10 or so, otherwise
		//it would probably be better to use the physics system's quadtree.
		var overTarget = null;
		for(var i = 0; i < CharacterDropTarget.all.length; ++i) 
		{
			var target = CharacterDropTarget.all[i];
			if(target.checkCollision(self)) {
				overTarget = target;
				break;
			}
		}

		//stick to the first overlapped target until not overlapping it anymore,
		//even if overlapping mutliple targets
		if(overTarget === null) {
			if(currentDragTarget && currentDragTarget.onDragOut) //fire onDragOut
				currentDragTarget.onDragOut(self);
			currentDragTarget = null;
		}
		if(!currentDragTarget && overTarget) {
			currentDragTarget = overTarget;
			if(currentDragTarget.onDragOver) //fire onDragOver event.
				currentDragTarget.onDragOver(self);
		}
	}

	self.events.onDragStop.add(function(){
		if(currentDragTarget){
			var padding = currentDragTarget.padding;
			self.x = currentDragTarget.draggableAnchor.x + padding;
			self.y = currentDragTarget.draggableAnchor.y + padding;
			if(currentDragTarget.onDrop)
				currentDragTarget.onDrop(self); //fire onDrop event
		} 
		else {
			self.x = anchor.x;
			self.y = anchor.y;
		}
	});

	self.events.onDragStart.add(function(){
		if(currentDragTarget && currentDragTarget.onLift)
				currentDragTarget.onLift(self);
	});


	return self;
}

//A rectangle on which you can drop and "stick" a CharacterDraggable.
//Implement onDragOver(Draggable), onDragOut(Draggable), and onDrop(Draggable)
//functions for notifications
function CharacterDropTarget(options) { //extends Phaser.Rectangle
	var x = options.x || 0;
	var y = options.y || 0;
	var width = options.width || characterIconDimensions.width;
	var height = options.height || characterIconDimensions.height;
	var padding = options.padding || 0;

	var rect = new Phaser.Rectangle(x, y, width, height); 

	rect.draggableAnchor = {
		x : options.draggableAnchorX || x,
		y: options.draggableAnchorY || y
	};

	//Events
	rect.onDragOver = options.onDragOver || null;
	rect.onDragOut = options.onDragOut || null;
	rect.onDrop = options.onDrop || null;
	rect.onLift = options.onLift || null;

	rect.checkCollision = function(draggable) {
		var bounds = draggable.getBounds();
		return Phaser.Rectangle.intersects(bounds, rect);
	}

	rect.padding = padding;

	CharacterDropTarget.all.push(rect);
	return rect;
}

//CharacterDropTarget.all = []; //static list of of all DragTargets. 
//Actually initialized by JobView init event so it will clear with the state.
//TODO: Better way to clear this list. 