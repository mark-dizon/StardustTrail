$( document ).ready(function() {
  


$("#attributecheck-button").bind("click", function(){
	var amount = $("#attributecheck-value").val();
	var attribute = $("#attributeCheck-stat").val();

	var AttributeCheck = {
		name : attribute, 
		value : amount 
	}

	$("#attributecheck-result").val('{"attributeCheck":' +JSON.stringify(AttributeCheck)+"}");

	return false;

});

$("#reward-button").bind("click", function(){
	var amount = $("#reward-value").val();
	var attribute = $("#reward-attribute").val();

	var reward = {
		name : attribute, 
		value : amount 
	}

	$("#reward-result").val('{"reward":'+JSON.stringify(reward)+"}");

	return false;

});

$("#penalty-button").bind("click", function(){
	var amount = $("#penalty-value").val();
	var attribute = $("#penalty-attribute").val();

	var penalty = {
		name : attribute, 
		value : amount 
	}

	$("#penalty-result").val('{"penalty":'+JSON.stringify(penalty)+"}");

	return false;

});

$("#attributeCheckModifer-button").bind("click", function(){
	var amount = $("#attributeCheckModifer-value").val();
	var attribute = $("#attributeCheckModifer-stat").val();
	var modifier = $("#attributeCheckModifer-operator").val();

	var AttributeCheckModifier = {
		name : attribute, 
		value : amount, 
		operator: modifier 
	}

	$("#attributeCheckModifer-result").val('{"attributeCheckModifier":'+ JSON.stringify(AttributeCheckModifier)+"}");

	return false;

});

$("#jobdata-button").bind("click", function(){
	var name = $("#jobdata-name").val();
	var description = $("#jobdata-desc").val();
	var reward = JSON.parse($("#jobdata-reward").val());
	var penalty = JSON.parse($("#jobdata-penalty").val());
	var taskdata = JSON.parse($("#jobdata-tasks").val());
	

	var jobData = {
		name : name,
		desc: description,
		rewards : [reward], //zero or more. Reward for whole job
		penalties : [penalty], //zero or more. Penalty for failing whole job.
		tasks : [taskdata]
	};


	$("#jobdata-result").val('{"jobData":'+JSON.stringify(jobData)+"}");

	return false;

});

$("#taskdata-button").bind("click", function(){
	var name = $("#taskdata-name").val();
	var description = $("#taskdata-desc").val();
	var reward = JSON.parse($("#taskdata-reward").val());
	var penalty = JSON.parse($("#taskdata-penalty").val());
	var atribute = JSON.parse($("#taskdata-attribute").val());
	var check = JSON.parse($("#taskdata-check").val());
	var id = $("#taskdata-id").val();
	var pass = $("#taskdata-pass").val();
	var fail = $("#taskdata-fail").val();
	var positionX =$("#taskdata-positionX").val();
	var positionY = $("#taskdata-positionY").val();




	var taskData = {
		name : name,
		desc : description,
		checks : [ check ], //One or more
		rewards : [reward], //zero or more
		penalties: [penalty], //zero or more
		id : id,
		pass : pass,
		fail: fail,
		modifiers : [atribute], //zero or more. These are modifiers for connected tasks if this task is passed
		position : {X: positionX, Y: positionY}
	};



	$("#taskdata-result").val('{"taskData":'+JSON.stringify(taskData)+"}");

	return false;

});


});