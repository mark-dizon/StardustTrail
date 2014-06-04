$( document ).ready(function() {
  


$("#attributecheck-button").bind("click", function(){
	var amount = $("#attributecheck-value").val();
	var attribute = $("#attributeCheck-stat").val();

	var AttributeCheck = {
		name : attribute, 
		value : amount 
	}

	$("#attributecheck-result").val(JSON.stringify(AttributeCheck));

	return false;

});

$("#reward-button").bind("click", function(){
	var amount = $("#reward-value").val();
	var attribute = $("#reward-attribute").val();

	var reward = {
		name : attribute, 
		value : amount 
	}

	$("#reward-result").val(JSON.stringify(reward));

	return false;

});

$("#penalty-button").bind("click", function(){
	var amount = $("#penalty-value").val();
	var attribute = $("#penalty-attribute").val();

	var penalty = {
		name : attribute, 
		value : amount 
	}

	$("#penalty-result").val(JSON.stringify(penalty));

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

	$("#attributeCheckModifer-result").val(JSON.stringify(AttributeCheckModifier));

	return false;

});

$("#jobdata-button").bind("click", function(){
	var name = $("#jobdata-name").val();
	var description = $("#jobdata-desc").val();
	var reward = $("#jobdata-reward").val();
	var penalty = $("#jobdata-penalty").val();
	

	var jobData = {
		name : name,
		desc: description,
		rewards : reward, //zero or more. Reward for whole job
		penalties : penalty //zero or more. Penalty for failing whole job.
	};


	$("#jobdata-result").val(JSON.stringify(jobData));

	return false;

});

$("#taskdata-button").bind("click", function(){
	var name = $("#taskdata-name").val();
	var description = $("#taskdata-desc").val();
	var reward = $("#taskdata-reward").val();
	var penalty = $("#taskdata-penalty").val();
	var atribute = $("#taskdata-attribute").val();
	var check = $("#taskdata-checks").val();
	var id = $("#taskdata-id").val();
	var pass = $("#taskdata-pass").val();




	var taskData = {
		name : name,
		desc : description,
		checks : [ check ], //One or more
		rewards : [reward], //zero or more
		penalties: [penalty], //zero or more
		id : id,
		pass : pass,
		modifiers : [atribute] //zero or more. These are modifiers for connected tasks if this task is passed
	};


	$("#taskdata-result").val(JSON.stringify(taskData));

	return false;

});











});