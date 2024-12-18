<?php
    class DB {
        private static $instance = null;
        private $pdo;

        private static function loadEnv($path) {
            if (!file_exists($path)) {
                throw new Exception(".env file not found at: $path");
            }

            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) {
                    continue;
                }

                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                putenv("$key=$value");
            }
        }

        private function __construct($host, $dbname, $username, $password) {
            $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
            $this->pdo = new PDO($dsn, $username, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        public static function getInstance() {
            if (self::$instance == null) {
                self::loadEnv(__DIR__ . '/../.env');                
                self::$instance = new self(getenv('DB_HOST'), getenv('DB_NAME'), getenv('DB_USER'), getenv('DB_PASS'));
            }

            return self::$instance;
        }
        
        public function query($query, $params = array()) {
            $statement = $this->pdo->prepare($query);            
            $statement->execute($params);

            // Return results for SELECT queries
            if (strpos(strtoupper($query), 'SELECT') === 0) {
                return $statement->fetchAll(PDO::FETCH_ASSOC);
            }

            // Return rowCount for non-SELECT queries (INSERT, UPDATE, DELETE)
            return $statement->rowCount();
        }
    }
?>
