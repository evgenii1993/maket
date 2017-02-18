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
		    $res = $link->query($query) or die("\n > Invalid query: " . mysqli_error());
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
        public function __construct($name, $id)
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

        /**
         * Book constructor.
         * @param $name
         * @param $id
         * @param array $authors
         */
        public function __construct($name, $id, array $authors)
        {
            $this->name = $name;
            $this->id = $id;
            $this->authors = $authors;
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

        /**
         * @return array
         */
        public function getAuthors()
        {
            return $this->authors;
        }

        /**
         * @param array $authors
         */
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
                    return $i;
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
                $index = Instrument::search($books, "id", $row["id_book"]);

                if($index !== false){
                    $books[$index]->addAuthors(new Author($row["id_author"],$row["name_a"]));
                }else{
                    $books[] = new Book($row["name_b"],$row["id_book"], [new Author($row["id_author"],$row["name_a"])]);
                }
            }

            echo json_encode(["result" => $books]);
            break;
        case 'update':

        break;
        default:
            # code...
            break;
    }

?>