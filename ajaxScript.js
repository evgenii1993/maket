console.log("Я подключился!");
var objAddSelect = {
	name: "book",
	arrAddItem: []
}
var objSearch = {
	name: "book"
}


$(document).ready(function(){
	$('body').on("submit", ".global-table__cell",function(event){
		event.preventDefault();
		console.log(this);
		var $parent = $(this).parents(".global-table__cell"),
			nameBook = $("input[name='book']", $parent).val(),
			nameAuthor = $("input[name='author']", $parent).val(),
			idLib = $("input[name=id]", $parent).val();
			$.ajax({
				type: 'POST',
				url: "phpEdit.php",
				data:  $(this).serialize(),
				success: function(data){
					$(".global-table__display").hide();
				},
				error:function(error){
					console.log(error);
				}
			});
	});
	
	$('body').on('click','.global-table__edit',function(){
		$(".global-table__display").hide();
		$("form.global-table__cell input.global-table__input").prop('disabled', true);
		$("button.global-table__button").remove();
		var $row = $(this).parents(".global-table__cell");
		$("input.global-table__input",$row).prop('disabled', false);
		$(".global-table__display",$row).show();
	});

	$("#searchSelect").click(function(){
		var valSel = $("#searchSelect option:selected").val();
		if(!(objSearch.name == valSel)){
			objSearch.name = valSel;
			createSearchSend(objSearch.name);
		}

	});
	$("#deleteElement").click(function(){
		checkboxDelete();

	});
	//Добавить элемент
	$("#sendCreateData").click(function(){
		createElemDB();
	});
	$("#sendSearchData").click(function(){
		var arrInput = $('#searchField input');
		if(!checkFullInput(arrInput)){
			return false;
		}
		if(objSearch.name == 'book'){
			searchList.searchElementBook();
		}else if(objSearch.name == 'author'){
			searchList.searchElementAuthor();
		}else if(objSearch.name == 'all'){
			searchList.searchElementAll();
		}
	});
	$("#clearSearchData").click(function(){
		$(".global-table__cell").css({"display": "flex"});
	});

});
var searchList = {
	searchElementBook: function(){
		this.clearElementBook();
		var arrIn = $("input[name="+objSearch.name+"]");
		if($("#nameSearchBook").val() == ''){
			this.clearElementBook();
			return false;
		}
		for(var i=0;i<arrIn.length;i++){
			if($(arrIn[i]).val() == $("#nameSearchBook").val()){
			}else{
			   $(arrIn[i]).parents(".global-table__cell").css({"display": "none"});
			}
		}
	},
	searchElementAuthor: function(){
		this.clearElementBook();
		var arrIn = $("input[name="+objSearch.name+"]");
		if($("#nameSearchAuthor").val() == ''){
			this.clearElementBook();
			return false;
		}
		for(var i=0;i<arrIn.length;i++){
			if($(arrIn[i]).val() == $("#nameSearchAuthor").val()){
			}else{
			   $(arrIn[i]).parents(".global-table__cell").css({"display": "none"});
			}
		}
	},
	searchElementAll: function(){
		this.clearElementBook();
		var arrInB = $("input[name='book']");
		var arrInA = $("input[name='author']");
		if($("#nameSearchBook").val() == '' || $("#nameSearchAuthor").val()==''){
			this.clearElementBook();
			return false;
		}
		for(var i=0;i<arrInB.length;i++){
			if(!($(arrInB[i]).val() == $("#nameSearchBook").val()) || !($(arrInA[i]).val() == $("#nameSearchAuthor").val())){
				$(arrInB[i]).parents(".global-table__cell").css({"display": "none"});
				$(arrInA[i]).parents(".global-table__cell").css({"display": "none"});
			}
		}	
	},
	clearElementBook: function(){
		$(".global-table__cell").css({"display":"flex"});	
	}
}



// Загрузка готового контекста
function createElemDB(){
	var arrInput = $('#addField input');
	if(!checkFullInput(arrInput)){
		return false;
	}
	var arrVal = objAddSelect.arrAddItem;
	window.editElement.AjaxAdd(arrVal);
	$('#addField input').val('');
}
function checkboxDelete(){
	window.editElement.AjaxInsert("okkk");
	console.log("dadf");
	var arr = $("input:checkbox:checked");
	for(var i = 0; i < arr.length; i++){
		var $parent = $(arr[i]).parents("form.global-table__cell"),
			nameBook = $("input[name='book']", $parent).val(),
			nameAuthor = $("input[name='author']", $parent).val(),
			idLib = $("input[name=id]", $parent).val();
		$($parent[0])	
			$.ajax({
				type: 'POST',
				url: "phpEdit.php",
				data:  {"idLib" : idLib},
				success: function(data){
					console.log(data);
				},
				error:function(error){
					console.log(error);
				}
			});
	}
	$('#windowShowListDate').empty();
	window.editElement.AjaxInsert("okkk");
}

function createSearchSend(obj){
	$('#searchField').empty();
	if(obj == "book"){
		$('#searchField').append('<label class="search-window__description">Введите название: </label><input type="text" id="nameSearchBook"  name = "nameSearchBook" placeholder="название книги">');
	}else if(obj == "author"){
		$('#searchField').append('<label class="search-window__description">Введите название: </label><input type="text" id="nameSearchAuthor"  name = "nameSearchAuthor" placeholder="имя автора">');
	}else if(obj=="all"){
		$('#searchField').append('<label class="search-window__description">Введите название: </label><div class="search-window__block"><input type="text" id="nameSearchBook" name="nameSearchBook" placeholder="название книги"><input type="text" id="nameSearchAuthor"  name = "searchAuthor" placeholder="имя автора"></div>');
	}
}

// 
function checkFullInput(obj){
	var count = 0;
	for(var i = 0; i < obj.length; i++){
		if($(obj[i]).val()){
			count++;
			objAddSelect.arrAddItem[i] = $(obj[i]).val();
		}
	}
	if(count == obj.length){
		return true;
	}else{
		objAddSelect.arrAddItem = [];
		return false;
	}
}

window.editElement.AjaxInsert("okkk");
// $(document).ready(function(){
//           $.ajax({ type: 'POST',
//            url: 'phpEdit.php',
//            dataType:'html',
// 		   response:'html',
//            data: 'name=' + name,
//             success: function(data){
//             	console.log(data);
//                     $('#result').html(data);
//                  }
//           });
// });

