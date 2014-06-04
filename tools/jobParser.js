


var jobParser = function (file){

	$.ajax({
			type: "GET",  
			url: /jobs/+file +".json",
			success: function(data, textStatus, jqXHR){
				console.log(data);
			}
        });


}

var parseJob = function (data){
	console.log(data);
}



