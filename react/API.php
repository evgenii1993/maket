<?php 
	class DB{
		public static function connect($query){
			$dbUrl = "localhost";
		    $dbName = "library";
		    $dbLogin = "root";
		    $dbPassword = "123456";
        $link = new mysqli(
            $dbUrl.':3306/'.$dbName,
            $dbLogin, $dbPassword,
            $dbName
        );
		    $res = $link->query($query) or die("\n > Invalid query: " . mysqli_error());
			mysqli_close($link);
		    return $res;
		}
	}
	// class Convert{
		
	// 	public static function toJson(){

	// 	}
	// }

switch ($_POST['option']) {
	case 'all':
		$respunse = [];
		$arrRes = [];
		$result = DB::connect("SELECT `repositoryLib`.`id`, `repositoryLib`.`id_book`, `repositoryLib`.`id_author`, `book`.`name_b`, `authors`.`name_a`  FROM `repositoryLib` INNER JOIN `book` ON `book`.id_book = `repositoryLib`.id_book  INNER JOIN `authors` ON `authors`.id_author = `repositoryLib`.id_author");
		    while($row = $result->fetch_assoc()){
		    	$respunse[] = json_encode($row);
		    }
		    
		    echo json_encode($respunse);
		break;
	case 'update':
		
	break;
	default:
		# code...
		break;
}
// 		print_r($result);
?>