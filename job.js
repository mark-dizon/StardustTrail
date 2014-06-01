/*Informal description of the Job interface. Pseudocode. 

  A Job object holds multiple Nodes and Edges. Nodes can have TaskData, which can
  have other types of data like AttributeChecks and Rewards. Starting a job will look something like : game.changeState(states.job, job); 
*/

//Data types
	var AttributeCheck = {
		name : "Muscle", //stat or skill name
		value : 10 //skill check threshold to beat, or some other number indicating difficulty
	}

	var AttributeCheckModifier = {
		name : "Muscle", //stat or skill name
		value : 2, //value to add or subtract from attribute check
		operator: "add" //"add" || "subtract" || "multiply" || "divide"
	}

	var Reward = {} //not sure how to define this yet

	var Penalty = {} //not sure how to define this yet

	var JobData = {
		name : "Rob Bank",
		desc: "We go'a rob dis bank",
		rewards : [Reward], //zero or more. Reward for whole job
		penalties : [Penalty] //zero or more. Penalty for failing whole job.
	};

	var TaskData = {
		name : "Hostage Taker",
		desc : "Take hostages and keep them from escaping",
		checks : [ AttributeCheck ], //One or more
		rewards : [Reward], //zero or more
		penalties: [Penalty], //zero or more
		modifiers : [AttributeCheckModifier] //zero or more. These are modifiers for connected tasks if this task is passed
	};


//Interfaces 

	/**Node can refer to StartNode, EndNode, or TaskNode*/

	var Edge = {
		getFrom : function(){return /*[Node], one or more, that input to this edge (arrow pointing away)*/} 
		getTo : function(){return /*[Node], one or more, that output from this edge (arrow pointing toward)*/} 
	}

	//Node that the job can start from. Must be connected to an end node for job to complete.
	var StartNode = {
		getType : function(){return "start"},
		getEdge : function(){return /*the edge connected to this start node*/}
	}

	//A node that ends the job, could be either a goal or lose node.
	var EndNode = {
		getType : function(){return /* "goal" || "lose" */},
		getEdge : function(){return /*the edge connected to this end node*/}
	}

	//A node representing a task that must be passed or failed. It can have multiple TaskData, which means these tasks must all be completed concurrently to pass the node.
	var TaskNode = {
		getType : function(){return "task"},
		getData : function() {return /*the [TaskData], one or more, for this node. More than one means multiple tasks must be completed to pass this node*/},
		getSuccessEdge : function() {return /*Edge to go to if node is passed*/},
		getFailEdge : function() {return /*Edge to go to if node is failed, or null, if there is no fail edge for this node*/}
	}

	var Job = {
		getData: function() {return JobData},
		getNodes : function() {return /*[Node], all nodes in the job*/},
		getEdges : function() {return /*[Edge], all edges in the job*/}
	}