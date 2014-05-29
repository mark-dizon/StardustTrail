	
	//Represents one graphical edge in the job graph
	function JobNodeEdge(parent, start, end) {

		var graphics = new Phaser.Graphics(0, 0);
		parent.addChild(graphics);

		function draw(progress){
			graphics.lineStyle(2, 0xFCAE1C);
			graphics.moveTo(start.x, start.y);
			graphics.lineTo(end.x, end.y);
		}

		graphics.redraw = draw;

		draw(0); //draw right away
		return graphics;
	}

	//Represents one graphical node in the job graph
	function JobNode(options) {

		var distance_between_nodes = 400;
		
		var state = options.state;
		var x = options.x;
		var y = options.y;
		
		var graphics = state.add.graphics(x,y);

		var edges = [];

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


		//Methods

		//Connects a node to this one. Use graphics.lineStyle to setup the the appearance of connecting lines
		graphics.addConnectedNode = function(otherNode, direction) {

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
					case directions.left  : return node.x = -distance_between_nodes;
					case directions.right : return node.x = distance_between_nodes;
					case directions.up    : return node.y = -distance_between_nodes;
					case directions.down  : return node.y = distance_between_nodes;
				}
			}

			//make the other node anchored relative to this one
			graphics.addChild(otherNode);
			setConnectedNodePosition(otherNode, direction);

			//draw a line between them
			var start = getNodeEdge(graphics, direction);
			var end = getNodeEdge(otherNode, -direction);
			var edge =  new JobNodeEdge(graphics, start, end);
			edges.push(edge);

			return otherNode;
		}

		graphics.animateToNext = function(){}

		graphics.redraw = draw;

		function draw() {
		}

		return graphics;

	}
