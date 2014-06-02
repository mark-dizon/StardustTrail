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

	EdgeType = "normal" || "success" || "fail" ;
	NodeType = "start" || "goal" || "lose" || "task";

	Edge = {
		getType : function() { return /*EdgeType*/ }
		getFrom : function(){return /*[Node], one or more, that input to this edge (arrow pointing away)*/} 
		getTo : function(){return /*[Node], one or more, that output from this edge (arrow pointing toward)*/} 
	}

	//A node in the job graph.
	Node = {
		getType : function(){return /*NodeType*/},
		getData : function() {return /*the [TaskData], one or more, for this node. More than one means multiple tasks must be completed to pass this node
										if the node is not a task node this should return null. */},
		getGridPos : function() {return {x: /*0-4*/ y: /*0-2*/}};
	}

	Job = {
		getData: function() {return /*JobData*/},
		getNodes : function() {return /*[Node], all nodes in the job*/},
		getEdges : function() {return /*[Edge], all edges in the job*/}
	}