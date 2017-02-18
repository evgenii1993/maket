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
				alert(2);
			}
		});
	}
};