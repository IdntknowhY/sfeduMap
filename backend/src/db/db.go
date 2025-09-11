package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type ConnectData struct {
	SERVER   string
	USERNAME string
	PASSWORD string
	DBNAME   string
}

func initDB() ConnectData {
	return ConnectData{
		SERVER:   "database",
		USERNAME: "qdb",
		PASSWORD: "QuestionsDB",
		DBNAME:   "questionsDB",
	}
}

// Обычное подключение
func ConnectDB() (*sql.DB, error) {
	DefaultConnection := initDB()
	return ConnectPostgreSQL(&DefaultConnection)
}

// Подключение через админа
func ConnectEditDB(username string, password string) (*sql.DB, error) {
	ConnectionEdit := ConnectData{
		SERVER:   "database",
		USERNAME: username,
		PASSWORD: password,
		DBNAME:   "questionsDB",
	}
	return ConnectPostgreSQL(&ConnectionEdit)
}

// ConnectPostgreSQL подключается к PostgreSQL и возвращает объект базы данных
func ConnectPostgreSQL(cfg *ConnectData) (*sql.DB, error) {
	connstr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", cfg.SERVER, cfg.USERNAME, cfg.PASSWORD, cfg.DBNAME)
	db, err := sql.Open("postgres", connstr)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to the database: %w", err)
	}

	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("failed to check the database connection: %w", err)
	}
	log.Println("Connection established")
	return db, nil
}
