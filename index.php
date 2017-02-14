<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf8" />
	<script src="jquery.min.js"></script>
	<script src="windowAjax.js"></script>
	<script src="ajaxScript.js"></script>
	<link rel="stylesheet" type="text/css" href="./style/reset.css">
	<link rel="stylesheet" type="text/css" href="./style/main.css">
	<title></title>
</head>
<body>

	<div class="menu">
		<div class="menu__head">
			Поиск, удаление, редактирование, добавление
		</div>
		<div class="menu__body">
			<div class="menu__panel-add">
				<label class="menu__description">Добавить книгу: </label>
				<div id="addField">
					<input type="text" id=dataCreateBook placeholder="Название книги">
					<input type="text" id=dataCreateAuthor placeholder="Имя автора">
				</div>
				<button id="sendCreateData"> Добавить </button>
			</div>
			<div class="frame">
				<div id="windowShowListDate" class="frame__result">
					
				</div>
			</div>
			<div class="search-window">
				<div class="search-window__body">
					<div class="search-window__name" id="searchField">
						<label class="search-window__description">Введите название: </label><input type="text" id="nameSearchBook" name = "searchBook" placeholder="название книги">
					</div>
					<div class="search-window__choice-table">
						<label class="search-window__description">поиск в: </label>
						<select id="searchSelect">
							<option value="book"> книгах </option>
							<option value="author"> авторах </option>
							<option value="all"> всё </option>
						</select>
					</div>
					<div class="search-window__button">
						<button id="sendSearchData" type="submit"> Поиск </button>
						<button id="clearSearchData" type="submit"> Очистить </button>
					</div>
				</div>
				<button id="deleteElement"> Удалить выбранное </button>
			</div>
		</div>
		<div id="result">
		</div>
	</div>
	<?php
		include 'phpEdit.php';
	?>
</body>
</html>