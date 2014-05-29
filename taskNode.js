
	function TaskNode(options) { //extends jobNode

		var distance_between_nodes = 400;

		//Constants
		var taskNodeDefaults = {
			width: 150,
			height: 200,
			color: 0x2B2B2A,
			borderColor: 0xFCAE1C,
			borderWidth: 2,
			failEdgeColor :0xFC1C21,
			successEdgeColor: 0x004CAF
		}
		
		var state = options.state;
		var x = options.x;
		var y = options.y;
		var width = options.width || taskNodeDefaults.width;
		var height = options.height || taskNodeDefaults.height;

		var color = options.color || taskNodeDefaults.color;
		var borderColor = options.borderColor || taskNodeDefaults.borderColor;
		var borderWidth = options.borderWidth || taskNodeDefaults.borderWidth;

		var name = options.name || "Unnamed Job";
		
		var graphics = new JobNode(options);

		graphics.addChild(new Phaser.Text(game, 10, 10, name, 
							{ font: "12pt Courier", fill: "#FCAE1C", stroke: "#FCAE1C", strokeThickness: 1 }));

		//Public members 
		//override to specify the correct edge for connection points
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

		graphics.setSuccessNode = function(node, direction) {
			direction = direction || directions.right;
			graphics.lineStyle(borderWidth, taskNodeDefaults.successEdgeColor);
			return graphics.addConnectedNode(node, direction);
		}

		graphics.setFailNode = function(node, direction) {
			direction = direction || directions.down;
			graphics.lineStyle(borderWidth, taskNodeDefaults.failEdgeColor);
			return graphics.addConnectedNode(node, direction);
		}
		//Methods

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
