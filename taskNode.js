
function TaskNode(options) { //extends jobNode

	//Constants
	var taskNodeDefaults = {
		width: 200,
		height: 250,
		color: 0x2B2B2A,
		borderColor: 0xFCAE1C,
		borderWidth: 2,
		failEdgeColor :0xFC1C21,
		successEdgeColor: 0x02AF31 ,
		completeEdgeColor : 0x004CAF,
		inProgressEdgeColor: 0xFFFFFF,
		edgeTraceAnimationSecs : 0.5
	}

	var successState = taskNodeStates.incomplete;
	
	var state = options.state;
	var x = options.x;
	var y = options.y;
	var width = options.width || taskNodeDefaults.width;
	var height = options.height || taskNodeDefaults.height;

	var color = options.color || taskNodeDefaults.color;
	var borderColor = options.borderColor || taskNodeDefaults.borderColor;
	var borderWidth = options.borderWidth || taskNodeDefaults.borderWidth;

	var name = options.name || "Unnamed Job";

	var successEdge, failEdge, universalNextEdge;

	
	var graphics = new JobNode(options);

	graphics.addChild(new Phaser.Text(game, 10, 10, name, 
						{ font: "16pt Courier", fill: "#FCAE1C", stroke: "#FCAE1C", strokeThickness: 1 }));

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

	//Sets the next node on the success path
	graphics.setSuccessNode = function(node, direction) {
		direction = direction || directions.right;
		successEdge = {edge: new JobNodeEdge(state, taskNodeDefaults.successEdgeColor, taskNodeDefaults.completeEdgeColor),
					   node: node};
		return graphics.addConnectedNode(node, direction, successEdge.edge);
	}

	//Sets the next node on the fail path
	graphics.setFailNode = function(node, direction) {
		direction = direction || directions.down;
		failEdge = {edge: new JobNodeEdge(state, taskNodeDefaults.failEdgeColor, taskNodeDefaults.completeEdgeColor),
					node: node};
		return graphics.addConnectedNode(node, direction, failEdge.edge);
	}

	//Sets the next node regardless of pass or fail. This removes and success or fail nodes already set
	graphics.setNextNode = function(node, direction) {
		direction = direction || directions.right;
		universalNextEdge = {edge: new JobNodeEdge(state, taskNodeDefaults.borderColor, taskNodeDefaults.completeEdgeColor),
					node: node};
		successEdge = null;
		failEdge = null;
		return graphics.addConnectedNode(node, direction, failEdge.edge);
	}

	graphics.setCompletionState = function(taskNodeState) {
		successState = taskNodeState;
		graphics.redraw();
	}

	//Resolve this node and start moving the next node, on either fail or success path.
	//When finished, callback is invoked with the next node.
	graphics.next = function(isSuccess, callback) {
		var next = (isSuccess) ? successEdge : failEdge;
		if(!next) next = universalNextEdge; 
		if(next) {
			next.edge.playTraceAnimation(taskNodeDefaults.edgeTraceAnimationSecs, function() {
				if(callback) callback(next.node);
			});
		}
	}
	//Methods

	graphics.redraw = draw;

	function draw() {
		graphics.clear();
		//Draw the rectangle
		graphics.beginFill(color);
		graphics.drawRect(0, 0, width, height);
		graphics.endFill();

		//Draw the outline
		var outlineColor = borderColor;
		var outlineWidth = borderWidth;
		switch(successState) {
			case taskNodeStates.success : 
			case taskNodeStates.failure : 
				outlineColor = taskNodeDefaults.completeEdgeColor; //(successState === 1) ? taskNodeDefaults.successEdgeColor : taskNodeDefaults.failEdgeColor;
				outlineWidth = borderWidth + 2;
				break;
			case taskNodeStates.inprogress:
				outlineColor = taskNodeDefaults.inProgressEdgeColor;
				outlineWidth = borderWidth + 4;
				break;
		}

		if(outlineWidth > 0) {
			graphics.lineStyle(outlineWidth, outlineColor);
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
