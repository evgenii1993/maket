<?php 

if(empty($_POST)){
echo 13;

}

class SystemSettings{
    var $dbUrl = "localhost";
    var $dbName = "id805223_library";
    var $dbLogin = "id805223_root";
    var $dbPassword = "123456";
}

class DB{
    public static function connect($query, $type){
        $settings = new SystemSettings;
        $link = mysqli_connect("localhost", "id805223_root", "123456", "id805223_library");
        $res = $link->query($query) or die("\n > Invalid query: " . mysqli_error());
        switch ($type) {
        	case 'get':
        		$res = $link->insert_id;
        		break;
        	case 'set':
        		break;
        }
	mysqli_close($link);
        return $res;
    }
}

class EditDB{
	 function insertInto($arr){
		$queryCheck = DB::connect("select * from book WHERE `name_b` = '".$arr[0]."'");
			if($queryCheck->num_rows==0){
				$addB = DB::connect("INSERT INTO `book` (`name_b`) VALUES('".$arr[0]."')",'get');
			}else{
				$id = DB::connect("SELECT `id_book` FROM `book` WHERE `name_b`='".$arr[0]."'");
				$addB = $id->fetch_row()[0];
			}
		$queryCheck = DB::connect("select * from `authors` WHERE `name_a` = '".$arr[1]."'");
			if($queryCheck->num_rows==0){
				$addA = DB::connect("INSERT INTO `authors` (`name_a`) VALUES('".$arr[1]."')",'get');
			}else{
				$id = DB::connect("SELECT `id_author` FROM `authors` WHERE `name_a`='".$arr[1]."'");
				$addA = $id->fetch_row()[0];
			}
			$addL = DB::connect("INSERT INTO `repositoryLib`(`id_book`, `id_author`) VALUES ('".$addB."', '".$addA."')");
	}
	function updateInto(){
		$idRoot = DB::connect("SELECT id_book, id_author FROM repositoryLib WHERE id = '".$_POST['id']."'",'');
		$id = $idRoot->fetch_assoc();
		echo $id['id_book'] ."  sddsddsfv   ". $id['id_author'];
		DB::connect("UPDATE `book` SET `name_b`= '".$_POST['book']."' WHERE id_book = '".$id['id_book']."'",'');
		DB::connect("UPDATE `authors` SET `name_a`= '".$_POST['author']."' WHERE id_author = '".$id['id_author']."'",'');
	}
	function deleteInto(){
		DB::connect("DELETE FROM `repositoryLib` WHERE id = '".$_POST['idLib']."' ",'');
	}
}

class SelectResult {
	 function watchDataAll(){
		$line = '<div class="global-table"><div class="global-table__head">
							<div> Название книги</div><div class="global-table__author"> Автор</div>
						</div>';
		$result = DB::connect('SELECT * FROM repositoryLib','');
		while($row = $result->fetch_row()){
			$book = DB::connect("SELECT `name_b` FROM `book` WHERE `id_book` = '".$row[1]."'",'');
			$author = DB::connect("SELECT `name_a` FROM `authors` WHERE `id_author` = '".$row[2]."'",'');
			$bookU = $book->fetch_row();
			$authors = $author->fetch_row();
			$line = $line."<form class='global-table__cell'>
									<input class='global-table__input' name='book' type='text' value = ".$bookU[0]." disabled/>
									<input name='id' type='text' value = ".$row[0]." class='global-table__input' disabled style='display:none'/>		
									<input class='global-table__input' name='author' type='text' value = ".$authors[0]." disabled/>
									<button class='global-table__edit' type='button'> </button>
									<input type='checkbox' class='global-table__clear'/>
									<button type='submit' style='display:none' class='global-table__display'>S</button>
							</form>";
		}
		$line = $line."</div>";
		echo $line;
	}	
}

if($_POST['name']) {
	return SelectResult::watchDataAll();
}
if($_POST['objArr']){
	return EditDB::insertInto($_POST['objArr']);
}
if($_POST['book'] && $_POST['id'] && $_POST['author']){
	EditDB::updateInto();
}
if($_POST['idLib']){
          
	EditDB::deleteInto();
}

?>