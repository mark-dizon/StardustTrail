
	function TaskNode(options) {

		var distance_between_nodes = 400;
		
		var state = options.state;
		var x = options.x;
		var y = options.y;
		var width = options.width;
		var height = options.height;


		var color = options.color || 0xffffff;
		var borderColor = options.borderColor || 0;
		var borderWidth = options.borderWidth || 0;

		var name = options.name || "Unnamed Job";
		
		var graphics = state.add.graphics(x,y);
		graphics.addChild(new Phaser.Text(game, 10, 10, name, 
							{ font: "12pt Courier", fill: "#FCAE1C", stroke: "#FCAE1C", strokeThickness: 1 }));

		//Public members
		graphics.upperEdge = function(){ 
			return {x: width /2, y: graphics.y};
		};

		graphics.lowerEdge = function(){ 
			return {x: width/2, y: height}; 
		};
		graphics.leftEdge = function(){ 
			return {x: graphics.x, y: height/2}; 
		};
		graphics.rightEdge = function(){ 
			return {x: width, y: height/2};
		};


		//Methods
		graphics.addConnectedNode = function(otherNode, direction, lineColor) {
			lineColor = lineColor || borderColor;
			direction = direction || directions.right;

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
					case directions.up    : return node.x = -distance_between_nodes;
					case directions.down  : return node.x = distance_between_nodes;
				}
			}

			//make the other node anchored relative to this one
			graphics.addChild(otherNode);
			setConnectedNodePosition(otherNode, direction);

			//draw a line between them
			var start = getNodeEdge(graphics, direction);
			var end = getNodeEdge(otherNode, -direction);
			graphics.lineStyle(borderWidth, lineColor);
			graphics.moveTo(start.x, start.y);
			graphics.lineTo(end.x, end.y);

			return otherNode;
		}

		graphics.redraw = draw;

		function draw() {
			//Draw the rectangle
			graphics.beginFill(color);
			graphics.drawRect(0, 0, width, height);
			graphics.endFill();

			//Draw the outline
			if(borderWidth > 0) {
				graphics.lineStyle(borderWidth, borderColor);
				graphics.moveTo(0,0);
				graphics.lineTo(0, height);
				graphics.lineTo(width, height);
				graphics.lineTo(width, 0);
				graphics.lineTo(0, 0);
			}
		}

		//draw immediatly on creation
		draw();
		return graphics;

	}
