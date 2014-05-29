
//Represents one graphical node in the job graph
function JobNode(options) {

	var distanceBetweenNodes = 400;
	
	var state = options.state;
	var x = options.x;
	var y = options.y;
	
	var graphics = state.add.graphics(x,y);

	var edgeData = [];

	//Public members
	graphics.upperEdge = function(){ 
		return {x: graphics.x, y: graphics.y};
	};

	graphics.lowerEdge = function(){ 
		return {x: graphics.x, y: graphics.y};
	};
	graphics.leftEdge = function(){ 
		return {x: graphics.x, y: graphics.y}; 
	};
	graphics.rightEdge = function(){ 
		return {x: graphics.x, y: graphics.y};
	};

	graphics.state = state; 


	//Methods

	//Connects a node to this one. Optional third parameter is the class of Edge to use to make the connection
	graphics.addConnectedNode = function(otherNode, direction, edge) {
		edge = edge || JobNodeEdge(state);

		function getNodeEdge(node, direction) {
			switch(direction) {
				case directions.left  : return node.leftEdge();
				case directions.right : return node.rightEdge();
				case directions.up    : return node.upperEdge();
				case directions.down  : return node.lowerEdge();
			}
		}

		function setConnectedNodePosition(node, direction){
			node.x = 0;
			node.y = 0;
			switch(direction) {
				case directions.left  : return node.x = -distanceBetweenNodes;
				case directions.right : return node.x = distanceBetweenNodes;
				case directions.up    : return node.y = -distanceBetweenNodes;
				case directions.down  : return node.y = distanceBetweenNodes;
			}
		}

		//make the other node anchored relative to this one
		graphics.addChild(otherNode);
		setConnectedNodePosition(otherNode, direction);

		//draw a line between them
		var start = getNodeEdge(graphics, direction);
		var end = getNodeEdge(otherNode, -direction);
		edge.initEdge(graphics, start, end);
		edgeData.push({edge: edge, node: otherNode});

		return otherNode;
	}

	graphics.animateToNext = function(edgeIndex){
		var edge = edgeData[edgeIndex].edge;
		edge.playTraceAnimation(10);
	}

	graphics.redraw = draw;

	graphics.update = function() {
		graphics.children.forEach(function(child){
			child.update();
		});
	}

	function draw() { 
		graphics.clear(); //Stub. Real implemenation in subclass
	}

	return graphics;

}


//Represents one graphical edge in the job graph.
//Has playTraceAnimation function to animate a change in color from start to end.
function JobNodeEdge(state, color, completeColor) {
	color = color || 0xFCAE1C;
	completeColor = completeColor || 0xFFFFFF;

	var graphics = state.add.graphics(0,0);
	var start = {x:0, y:0};
	var end = {x:0, y:0};

	function draw(progress){
		graphics.clear();
		var nonProgressStart = start;
		if(progress > 0){
			graphics.lineStyle(3, completeColor);
			graphics.moveTo(start.x, start.y);
			var progressEnd = {
				x: start.x + (end.x - start.x) * progress,
				y: start.y + (end.y - start.y) * progress
			};
			graphics.lineTo(progressEnd.x, progressEnd.y);
			nonProgressStart = progressEnd;
		}

		graphics.lineStyle(2, color);
		graphics.moveTo(nonProgressStart.x, nonProgressStart.y);
		graphics.lineTo(end.x, end.y);
	}

	graphics.redraw = draw;

	graphics.initEdge = function(parent, startIn, endIn) {
		start = startIn;
		end = endIn;
		parent.addChild(graphics);
		draw();
	}

	graphics.playTraceAnimation = function(duration, callback) {
		var progress = 0;
		graphics.update = function() {
			progress += (game.time.elapsed/1000 )/duration ; //get frame delta time here
			if(progress >= 1) {
				progress = 1
				graphics.update = function(){};
				if(callback) callback();
			}
			draw(progress);
		}
	}

	return graphics;
}
