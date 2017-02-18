window.gl = {
	ajax: function(query, view){
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: "API.php",
			data:  query,
			success: function(data){
				if(view != undefined){
					view.setState({
						loading: false,
						data: data
					});
				}
			},
			error:function(error){
				alert("ERROR");
				console.log(error);
			}
		});
	},
	foundInArr: function(arr, val){
		var result = false;
		for(var i  = 0; i<arr.length; i++){
			if(arr[i] == val){
                result = true;
                break;
			}
		}
        return result;
	}
};