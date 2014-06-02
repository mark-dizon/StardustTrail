
function JobView() {

	//Members
	var currentJob;
	var node;
	var afterInputCallback = null;
	var tempCompleteSound;

	var state = new Phaser.State();
	state.preload = preload;
	state.create = create;
	state.update = update;
	state.init = initJob;
	state.handleInput = handleInput;

	var textDisplay;

	function preload(){

		game.load.audio("tempCompleteSound", "./sound/Blip_Select2.wav", true);

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
									"Press any other key to exit Job View", 
									{ font: "16pt Tahoma", fill: "#FFFFFF"});


		//mockJobPlaythrough();
	}


	function initJob(job) {
		currentJob = job;
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

	function createJobGraph(job) {
	
		var nodes = job.getNodes();
		var constructedNodes = [];
		var startNode;
		for(var i = 0; i < nodes.length; ++i) {
			var currentNode = nodes[i];
			switch(currentNode.getType()) {
				case "start" :
					constructedNodes[i] = new TaskNode({state: state, name : "Start"});
					startNode = currentNode;
					currentNode.visual = constructedNodes[i];
					break;
				case "goal" :
				case "lose" :
					constructedNodes[i] = new TaskNode({state: state, name : "Goal"});
					currentNode.visual = constructedNodes[i];
					break;
				case "task" :
					constructedNodes[i] = new TaskNode({ 
						state: state, 
						name : currentNode.getData().name 
					});
					currentNode.visual = constructedNodes[i];
			}
		}

		//Make critical path
		function getNextCriticalPathEdge(node) {
			if(node.getType() === "task")
				return node.getSuccessEdge();
			if(node.getType() === "goal" || node.getType() === "lose")
				return null
			else return node.getEdge();
		}
		var current = startNode;
		while (current != null) {
			var edge = getNextCriticalPathEdge(current);
			if(edge === null) break;

			var from = edge.getFrom()[0].visual;
			var toNode = edge.getTo()[0];
			var to = toNode.visual;
			from.setSuccessNode(to);
			current = toNode;
		}
	}

	function waitOnInput(afterInputFunction) {
		afterInputCallback = afterInputFunction;
	}

	//Fake resolving the mockup job graph
	function mockJobPlaythrough() {

		node.setCompletionState(taskNodeStates.inprogress);

		function resolveNode(node, success, callback) {
			tempCompleteSound.play();
			node.setCompletionState( (success) ? taskNodeStates.success : taskNodeStates.failure );
			node.next(success, function(nextNode){
				nextNode.setCompletionState(taskNodeStates.inprogress);
				waitOnInput(function(){ if(callback) callback(nextNode); })
			});
		}

		waitOnInput(function() {
			resolveNode(node, true, function(nextNode) {
				resolveNode(nextNode, true, function(nextNode) {
					resolveNode(nextNode, false, function(nextNode) {
						resolveNode(nextNode, null);
					})
				})
			})
		});
	}

	function makeMockJob() {

		function makeTask(name){
			var task = {
				name: name, 
				desc: "a task",
				checks : { name: "Muscle", value: 10 },
				rewards : [],
				penalties : [],
				modifiers : []
			};
			var taskNode = {
				successEdge : null,
				failEdge : null,
				getData : function() {return task; },
				getSuccessEdge: function() {return this.successEdge; },
				getFailEdge : function() {return this.failEdge; },
				getType : function() {return "task";}
			}
			return taskNode;
		}

		function makeEdge(from, to, container) {
			var edge = {
				getFrom : function(){return [from]; },
				getTo : function() {return [to]; }
			}
			if(container)
				container.push(edge);
			return edge;
		}

		var task1 = makeTask("Take Hostages");
		var task2 = makeTask("Break Into Vault");
		var task3 = makeTask("Getaway");

		var start = {
			edge : null,
			getType: function(){return "start"},
			getEdge: function () {return this.edge;}
		}

		var end = {
			getType: function() {return "goal"}
		}

		var edges = [];
		start.edge = makeEdge(start, task1, edges);
		task1.successEdge = makeEdge(task1, task2, edges);
		task2.successEdge = makeEdge(task2, task3, edges);
		task3.successEdge = makeEdge(task3, end, edges);

		var job = {
			getData : function(){ 
				return {
					name : "Rob Bank",
					desc: "We go'a rob dis bank",
					rewards : [], 
					penalties : [] 
				};
			},
			getNodes : function(){return [start, task1, task2, task3, end]; },
			getEdges : function(){return edges; }
		}

		return job;
	}

	return state;
}
