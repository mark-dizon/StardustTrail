
function JobView() {

	var graphVisuals = {
		jobGraphEdgePadding : 100, //px
		normalEdgeColor : 0xFCAE1C,
		failEdgeColor :0xFC1C21,
		successEdgeColor: 0x02AF31 ,
		completeEdgeColor : 0x004CAF,
	}

	//Members
	var currentJob;
	var afterInputCallback = null;
	var tempCompleteSound;

	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.init = initJob;
	state.handleInput = handleInput;
	state.shutdown = shutdown;

	var textDisplay;

	function preload(){

	    game.load.image('cowboy', 'assets/cowboy.jpg');
	    game.load.image('unknownCharacter', 'assets/unknownCharacter.jpg');

		game.load.audio("tempCompleteSound", "./sound/Blip_Select2.wav", true);
		game.load.audio("characterAssign", "./sound/Hit_Hurt19.wav", true);

	}

	function create(){
		tempCompleteSound = game.add.audio("tempCompleteSound");

		//Mockup job graph
		/*node = new TaskNode( {x: screenWidth/4, y:screenHeight/2 - 250, state: state} );
		node.setSuccessNode(new TaskNode({state: state}))
			.setSuccessNode(new TaskNode({state: state}))
			.setFailNode(new TaskNode({state: state}));*/

		createJobGraph(makeMockJob());

		//Create the text log
		textDisplay = state.add.text(screenWidth * 0.01, screenHeight * 0.75,
									"Press Spacebar to progress Job.\n" +
									"Drag + Drop Characters to assign to Tasks.\n" +
									"Press any other key to exit Job View", 
									{ font: "16pt Tahoma", fill: "#FFFFFF"});

		makeMockCharacters();
		beginJob();
	}


	function initJob(job) {
		currentJob = job;
		CharacterDropTarget.all = []; //TODO: A way to not need to do this.
	}
	
	function update(){
	}

	function handleInput(event) {
		if(event.keyCode == Phaser.Keyboard.SPACEBAR) {
			if(afterInputCallback) {
				var callback = afterInputCallback;
				afterInputCallback = null;
				callback();
			}
		}
		else {
			game.changeState(states.map);
		}
	}

	function shutdown(){
	}

	function createJobGraph(job) {
	
		//Draw nodes
		var nodes = job.getNodes();
		var constructedNodes = [];
		for(var i = 0; i < nodes.length; ++i) {
			var currentNode = nodes[i];
			var gridPos = currentNode.getGridPos();
			var position = gridToScreenPos(gridPos.x, gridPos.y);
			switch(currentNode.getType()) {
				case "start" :
					constructedNodes[i] = new TaskNode({state: state, name : "Start", x: position.x, y: position.y});
					globalStart = constructedNodes[i]; //TEMPORARY, real game must infer where to start based on character placement
					break;
				case "goal" :
				case "lose" :
					constructedNodes[i] = new TaskNode({state: state, name : "End", x: position.x, y: position.y});
					break;
				case "task" :
					constructedNodes[i] = new TaskNode({ 
						state: state, 
						name : currentNode.getData().name , 
						x: position.x, y: position.y
					});
					constructedNodes[i].data = currentNode.getData(); //attach data to visual node for use in resolving.
			}
			currentNode.visual = constructedNodes[i];
		}

		//Connect nodes with edges
		var edges = job.getEdges();
		for(var i = 0; i < edges.length; ++i) {

			var edgeData = edges[i];
			var from = edgeData.getFrom()[0].visual;
			var to = edgeData.getTo()[0].visual;

			var edge;
			switch(edgeData.getType()) {
				case "normal":
					if(from.setNextNode)
						from.setNextNode(to);
					break;
				case "success" :
					if(from.setSuccessNode)
						from.setSuccessNode(to);
					break;
				case "fail":
					if(from.setFailNode)
						from.setFailNode(to);
					break;
			}
		}

	}

	function gridToScreenPos(row, col) {
		var jobGraphEdgePadding = graphVisuals.jobGraphEdgePadding;
		var rowWidth = (screenWidth - jobGraphEdgePadding) / jobGraphDimensions.rows;
		var colHeight = (screenHeight - jobGraphEdgePadding) / jobGraphDimensions.columns;
		return {
			x: (row * rowWidth) + jobGraphEdgePadding,
			y: col * colHeight + jobGraphEdgePadding
		}
	}

	function waitOnInput(afterInputFunction) {
		afterInputCallback = afterInputFunction;
	}

	function beginJob() {

		//TODO: Logic for actually completing job
		function completeTask(nodeData, character){
			if(character) {
				return (character.name && character.name === "Evan") ? false : true;
			}
			return false; //Phaser.Math.randomSign() > 0; //just flip a coin
		}

		function resolveNode(node, success, callback) {
			tempCompleteSound.play();
			node.setCompletionState( (success) ? taskNodeStates.success : taskNodeStates.failure );
			node.next(success, function(nextNode){
				nextNode.setCompletionState(taskNodeStates.inprogress);
				waitOnInput(function(){ if(callback) callback(nextNode); })
			});
		}

		function resolveSuccess(node) {
			var success = completeTask(node.data, node.characterData);
			resolveNode(node, success, resolveSuccess);
		}

		globalStart.setCompletionState(taskNodeStates.inprogress);

		waitOnInput(function(){
			resolveSuccess(globalStart);
		});

	}

	function makeMockCharacters() {
		new CharacterDraggable({state: state, x: screenWidth/2 - 150, y: 50, character: {name : "Reza"}});
		new CharacterDraggable({state: state, x: screenWidth/2 - 50 , y: 50, character: {name : "Evan"}});
		new CharacterDraggable({state: state, x: screenWidth/2 + 50, y: 50, character: {name : "Mark"}});
	}

	function makeMockJob() {

		function makeTask(name, row, col){
			var task = {
				name: name, 
				desc: "a task",
				checks : { name: "Muscle", value: 10 },
				rewards : [],
				penalties : [],
				modifiers : []
			};
			var taskNode = {
				getData : function() {return task; },
				getType : function() {return "task";},
				getGridPos : function() { return {x:row, y: col}; }
			}
			return taskNode;
		}

		function makeEdge(from, to, type) {
			var edge = {
				getFrom : function(){return [from]; },
				getTo : function() {return [to]; },
				getType: function() { return type; }
			}
			return edge;
		}

		var task1 = makeTask("Take Hostages", 1, 1);
		var task2 = makeTask("Break Into Vault", 2, 1);
		var task3 = makeTask("Getaway", 3, 1);

		var start = {
			getType: function(){return "start"},
			getGridPos : function() { return {x: 0, y: 1}; }
		}

		var end = {
			getType: function() {return "goal"},
			getGridPos : function() { return {x:4, y: 1}; }
		}

		var defeat = {
			getType: function() {return "lose"; },
			getGridPos: function() {return {x:2, y:2}; }
		}

		var edges = [];
		edges.push( makeEdge(start, task1, "normal" ) );
		edges.push( makeEdge(task1, task2, "success") );
		edges.push( makeEdge(task2, task3, "success") );
		edges.push( makeEdge(task3, end,   "success") );

		edges.push( makeEdge(task1, defeat, "fail") );
		edges.push( makeEdge(task2, defeat, "fail") );
		edges.push( makeEdge(task3, defeat, "fail") );

		var job = {
			getData : function(){ 
				return {
					name : "Rob Bank",
					desc: "We go'a rob dis bank",
					rewards : [], 
					penalties : [] 
				};
			},
			getNodes : function(){return [start, task1, task2, task3, end, defeat]; },
			getEdges : function(){return edges; }
		}

		return job;
	}

	return state;
}
