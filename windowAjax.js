window.editElement = { 

	AjaxInsert: function(name){
		$.ajax({
			type: 'POST',
			url: "phpEdit.php",
			data: 'name=' + name,
			response:'html',
			success: function(data){
				$('#windowShowListDate').html(data);
			},
			error: function(error){
				console.log(error);
			}

		});
	},
	AjaxAdd: function(objArr){
		$.ajax({
			type: 'POST',
			url: "phpEdit.php",
			data:  {"objArr" : objArr},
			success: function(data){
				window.editElement.AjaxInsert();
				console.log(data);
			},
			error:function(error){
				console.log(error);
			}
		});
	}
};

// window.editElement = {

// };