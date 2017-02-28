<?php 
	class DB{
		public static function connect($query){
			$dbUrl = "localhost";
		    $dbName = "library";
		    $dbLogin = "root";
		    $dbPassword = "root";
            $link = new mysqli(
                $dbUrl.':3306/'.$dbName,
                $dbLogin, $dbPassword,
                $dbName
            );
		    $res = $link->query($query) or die("\n > Invalid query: " . mysqli_error($link));
			mysqli_close($link);
		    return $res;
		}
	}

	class Author{
	    var $name;
	    var $id;

        /**
         * Author constructor.
         * @param $name
         * @param $id
         */
        public function __construct($id, $name)
        {
            $this->name = $name;
            $this->id = $id;
        }

        /**
         * @return string
         */
        public function getName()
        {
            return $this->name;
        }

        /**
         * @param string $name
         */
        public function setName($name)
        {
            $this->name = $name;
        }

        /**
         * @return string
         */
        public function getId()
        {
            return $this->id;
        }

        /**
         * @param string $id
         */
        public function setId($id)
        {
            $this->id = $id;
        }

    }
	class Book{
	    var $name;
	    var $id;
	    var $authors = [];
        public function __construct($name, $id, array $authors)
        {
            $this->name = $name;
            $this->id = $id;
            $this->authors = $authors;
        }
        public function getName()
        {
            return $this->name;
        }
        public function setName($name)
        {
            $this->name = $name;
        }
        public function getId()
        {
            return $this->id;
        }
        public function setId($id)
        {
            $this->id = $id;
        }
        public function getAuthors()
        {
            return $this->authors;
        }
        public function setAuthors($authors)
        {
            $this->authors = $authors;
        }

        function addAuthors($author){
            $index = Instrument::search($this->authors, "id", $author->id);
            if($index !== false){
                $this->authors[] = $author;
            }
        }
    }
    class Instrument{
	    public static function search($arr, $nameField, $getValue){
            for($i = 0; $i < count($arr); $i++){
                if(get_object_vars($arr[$i])[$nameField] == $getValue){
                    return $arr[$i];
                }else{
                    continue;
                }
            }
            return false;
        }
    }

    switch ($_POST['option']) {
        case 'all':
            $arrRes = [];
            $result = DB::connect("SELECT `repositoryLib`.`id_book`, `repositoryLib`.`id_author`, `book`.`name_b`, `authors`.`name_a`  FROM `book` INNER JOIN `repositoryLib` ON `book`.id_book = `repositoryLib`.id_book  INNER JOIN `authors` ON `authors`.id_author = `repositoryLib`.id_author");

            $books = [];

            while ($row = mysqli_fetch_array($result)) {
                $fount = Instrument::search($books, "id", $row["id_book"]);

                if($fount !== false){
                    $fount -> authors[] = (new Author($row["id_author"],$row["name_a"]));
                }else{
                    $books[] = new Book($row["name_b"],$row["id_book"], [new Author($row["id_author"],$row["name_a"])]);
                }
            }

            $authors = [];

            $result_onlyAuthors = DB::connect("SELECT * FROM `authors`");
            while ($row = mysqli_fetch_array($result_onlyAuthors)) {
                $authors[] = new Author($row["id_author"],$row["name_a"]);
            }

            echo json_encode([
                "result" => $books,
                "authors" => $authors
            ]);
            break;
        case 'update':
        echo 'ИЗМЕНЯЕТ СОСТОЯНИЕ КНИГИ';
            $authorsUp =  $_POST['sendData']['thisAuthors'];
            $idBook = $_POST['sendData']['id_book'];
            $nameBoob = $_POST['sendData']['name_b'];
            $res;
            for($i = 0; $i < count($authorsUp); $i++){
                $res = DB::connect("SELECT * FROM `repositoryLib` WHERE `id_book` = '".$idBook."' AND `id_author` = '".$authorsUp[$i]['id']."'");
                if($res->num_rows == 0){
                    DB::connect("INSERT INTO `repositoryLib` (`id_book`, `id_author`) VALUES ('".$idBook."','".$authorsUp[$i]['id']."')");
                }
                // Проверка было ли это имя изменено 
                $foundDifferentRow = DB::connect("SELECT `repositoryLib`.`id`, `authors`.`id_author` FROM `authors`, `repositoryLib` WHERE `repositoryLib`.`id_author` = '".$authorsUp[$i]['id']."' AND `repositoryLib`.`id_book` = '".$idBook."' AND `authors`.`name_a` <> '".$authorsUp[$i]["name"]."' AND  `authors`.`id_author` = '".$authorsUp[$i]["id"]."'");
                $elemRes = mysqli_fetch_array($foundDifferentRow, MYSQLI_ASSOC);
                // Изменение найдено  
                 if($foundDifferentRow->num_rows > 0){   
                 echo " ДА ТУТ ЕСТЬ ЧТО ИЗМЕНТЬ! "; 
                    DB::connect("DELETE FROM `repositoryLib` WHERE `id` = '".$elemRes["id"]."'");
                        // удаляю запись
                        $findOverlabInAuthors = DB::connect("SELECT `id_author` FROM `authors` WHERE `name_a`='".$authorsUp[$i]["name"]."' ");
                        // Этот автор существует?
                        if($findOverlabInAuthors->num_rows == 0){
                            //НЕТ!
                            DB::connect("INSERT INTO `authors` (`name_a`) VALUES ('".$authorsUp[$i]["name"]."')");
                            $idUsingName = DB::connect("SELECT `id_author` FROM `authors` WHERE `name_a` = '".$authorsUp[$i]["name"]."'");
                            $idUsingNameChoise = mysqli_fetch_array($idUsingName, MYSQLI_ASSOC);
                            DB::connect("INSERT INTO `repositoryLib` (`id_book`, `id_author`) VALUES ('".$idBook."', '".$idUsingNameChoise["id_author"]."')");
                        }else{
                            //ДА!
                            echo 'Если совпадение обнаружено';
                            $idUsingNameChoise = mysqli_fetch_array($findOverlabInAuthors, MYSQLI_ASSOC);
                            DB::connect("INSERT INTO `repositoryLib` (`id_book`, `id_author`) VALUES ('".$idBook."', '".$idUsingNameChoise['id_author']."')");
                        }
                 }
            }

            DB::connect("UPDATE `book` SET `name_b`='".$nameBoob."' WHERE id_book = '".$idBook."'");
        break;
        case 'deleteRepository':
            DB::connect("DELETE FROM `repositoryLib` WHERE `id_book` = '".$_POST['delBook']['id_b']."'");
            DB::connect("DELETE FROM `book` WHERE `id_book` = '".$_POST['delBook']['id_b']."'");
        break;
        case 'deleteAuthorInBook':
            DB::connect("DELETE FROM `repositoryLib` WHERE `id_book` = '".$_POST['delEl']['id_book']."' AND `id_author` = '".$_POST['delEl']['id_a']."'");
        break;
        case 'createAuthor':
            $res = DB::connect("SELECT * FROM `authors` WHERE `name_a` = '".$_POST['nameA']."'");
            if($res->num_rows == 0){
                DB::connect("INSERT INTO `authors`(`name_a`) VALUES ('".$_POST['nameA']."')");
            }
        break;
        case 'deleteAuthor':
            DB::connect("DELETE FROM `authors` WHERE `id_author` = '".$_POST['idDeleteAuthor']."'");
            DB::connect("DELETE FROM `repositoryLib` WHERE `id_author` = '".$_POST['idDeleteAuthor']."'");
        break;
        case 'removeLib':
            $res = DB::connect("DELETE FROM `repositoryLib` WHERE `id_author` = '".$_POST['id_author']."' AND `id_book` = '".$_POST['id_book']."'");
        break;
        case 'createB':
            $checkBook = DB::connect("SELECT * FROM `book` WHERE `name_b` = '".$_POST['dataNewBook']['newNameBook']."'");
            if($checkBook->num_rows > 0){
                return false;
            }
            $quer = DB::connect("INSERT INTO `book` (`name_b`) VALUES ('".$_POST['dataNewBook']['newNameBook']."')");
            $id = DB::connect("SELECT `id_book` FROM `book` WHERE `name_b` = '".$_POST['dataNewBook']['newNameBook']."'");
            $idBookCreate = mysqli_fetch_array($id, MYSQLI_ASSOC);
            $arrAuthors = $_POST['dataNewBook']['arrAuthor'];
            // echo count($_POST['dataNewBook']['arrAuthor']);
            for($i = 0; $i < count($arrAuthors); $i++){
                $resCheckName = DB::connect("SELECT `id_author` FROM `authors` WHERE `name_a` = '".$arrAuthors[$i]."'");
               // echo $arrAuthors[$i].' Название автора из начального массива ';
                //echo  $resCheckName."  ";
                if($resCheckName->num_rows > 0){
                    $elemRes = mysqli_fetch_array($resCheckName, MYSQLI_ASSOC);  
                    echo $elemRes['id_author']." существующий айдишник автора в БД ";
                    DB::connect("INSERT INTO `repositoryLib` (`id_book`, `id_author`) VALUES('".$idBookCreate['id_book']."','".$elemRes['id_author']."')");               
                }else{
                    DB::connect("INSERT INTO `authors` (`name_a`) VALUES('".$arrAuthors[$i]."')");
                    $idNewAuthor = DB::connect("SELECT `id_author` FROM `authors` WHERE `name_a`='".$arrAuthors[$i]."'");
                    $idNewAuthorChoise = mysqli_fetch_array($idNewAuthor, MYSQLI_ASSOC);
                    //echo $idNewAuthorChoise['id_author'].' Это номер айдишника если новый автор ';
                    DB::connect("INSERT INTO `repositoryLib` (`id_book`, `id_author`) VALUES('".$idBookCreate['id_book']."','".$idNewAuthorChoise['id_author']."')"); 
                }
            }
        break;
        default:

            break;
    }

?>
