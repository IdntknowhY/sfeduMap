package repository

import (
	"database/sql"
	"fmt"
	"log"
	module "sfeduMAP/backend/src/modules"
)

type SearchEngine struct {
	DatabaseUser  *sql.DB
	DatabaseAdmin *sql.DB
}

type SearchEngined interface {
	Title() ([]module.TypeQuestions, error)
	AddConnecAdmin(newA *sql.DB)
	GetAdminConnection() *sql.DB
	SearchQuestion(ID_T int) ([]module.Question, error)
	StartUnloadingDB(StatusTitle int) ([]module.TypeQuestions, []module.Question, error)
	AddQusetionUser(q module.NewQuestions) error
	ReadQusetionUser() ([]module.NewQuestions, error)
	DeleteQusetionUser(id int) error
	InsertQuestions(q module.InsertQuestion) error
	UpdatQuestion(q module.UpdatQuestion) error
	DeleteQuestion(q module.DeleteQuestion) error
}

func (db *SearchEngine) AddConnecAdmin(newA *sql.DB) {
	db.DatabaseAdmin = newA
}

func (db *SearchEngine) GetAdminConnection() *sql.DB {
	return db.DatabaseAdmin
}

// Выгрузка категорий
func (db *SearchEngine) Title() ([]module.TypeQuestions, error) {
	AnswerQueryDB, err := db.DatabaseUser.Query("SELECT * FROM public.type_questions;")
	if CheckError(nil, 0, err, "Error Title [query database]") {
		return nil, err
	}
	defer AnswerQueryDB.Close()

	var listModuleTitle []module.TypeQuestions
	for AnswerQueryDB.Next() {
		var q module.TypeQuestions
		err := AnswerQueryDB.Scan(&q.ID_T, &q.Category_en, &q.Category_ru, &q.Status)
		if CheckError(nil, 0, err, "Error Title [scan row]") {
			return nil, err
		}
		listModuleTitle = append(listModuleTitle, q)
	}
	return listModuleTitle, nil
}

func (db *SearchEngine) SearchQuestion(ID_T int) ([]module.Question, error) {
	QueryQuestionDB := `
		SELECT 
			q."QID", 
			t."TID", 
			t."data_en", 
			t."data_ru",
			q."question_en", 
			q."question_ru", 
			q."answer_en",
			q."answer_ru"
		FROM public.questions AS q
		JOIN public.type_questions AS t ON q."TID" = t."TID"
		WHERE t."TID"::text LIKE $1
		ORDER BY t."data_en";
		`
	log.Printf("Query: %s", QueryQuestionDB)
	AnswerQueryQuestionDB, err := db.DatabaseUser.Query(QueryQuestionDB, ID_T)
	if CheckError(nil, 0, err, "Error SearchQuestion [query database]") {
		return nil, err
	}
	defer AnswerQueryQuestionDB.Close()
	var listModuleQuestion []module.Question
	for AnswerQueryQuestionDB.Next() {
		var q module.Question
		err := AnswerQueryQuestionDB.Scan(&q.ID_Q, &q.ID_T, &q.Category_en, &q.Category_ru, &q.QuestionText_en, &q.QuestionText_ru, &q.Answer_en, &q.Answer_ru)
		if CheckError(nil, 0, err, "Error SearchQuestion [scan row]") {
			return nil, err
		}
		listModuleQuestion = append(listModuleQuestion, q)
	}
	return listModuleQuestion, err
}

// Выгрузка всех вопросов из базы данных в буфер
func (db *SearchEngine) StartUnloadingDB(StatusTitle int) ([]module.TypeQuestions, []module.Question, error) {
	log.Println("Функция выгрузки категорий вызвана")
	var listModuleTitle []module.TypeQuestions
	var listModuleQuestion []module.Question
	listModuleTitle, err := db.Title()
	if CheckError(nil, 0, err, "Error StartUnloadingDB [SearchTitle answer]") {
		return nil, nil, err
	}

	for _, t := range listModuleTitle {
		if t.Status == StatusTitle || StatusTitle == 0 {
			ModuleQuestion, err := db.SearchQuestion(t.ID_T)
			if CheckError(nil, 0, err, "Error StartUnloadingDB [SearchQuestion answer]") {
				return nil, nil, err
			}
			listModuleQuestion = append(listModuleQuestion, ModuleQuestion...)
		}
	}
	return listModuleTitle, listModuleQuestion, nil
}

func (db *SearchEngine) AddQusetionUser(q module.NewQuestions) error {
	_, err := db.DatabaseUser.Exec(`INSERT INTO public.new_questions(name_user, mail, question) VALUES ($1, $2, $3);`, q.NameUser, q.Mail, q.NewQuestion)
	if CheckError(nil, 0, err, "Error AddQusetionUser [query database]") {
		return err
	}
	return nil
}

func (db *SearchEngine) ReadQusetionUser() ([]module.NewQuestions, error) {
	answerNewQuestion, err := db.DatabaseUser.Query(`SELECT * FROM public.new_questions ORDER BY id ASC;`)
	if CheckError(nil, 0, err, "Error ReadQusetionUser [query database]") {
		return nil, err
	}
	defer answerNewQuestion.Close()
	var listModuleNewQuestion []module.NewQuestions
	for answerNewQuestion.Next() {
		var nq module.NewQuestions
		err := answerNewQuestion.Scan(&nq.ID, &nq.NameUser, &nq.Mail, &nq.NewQuestion, &nq.Date)
		if CheckError(nil, 0, err, "Error ReadQusetionUser [scan row]") {
			return nil, err
		}
		listModuleNewQuestion = append(listModuleNewQuestion, nq)
	}
	return listModuleNewQuestion, nil
}

func (db *SearchEngine) DeleteQusetionUser(id int) error {
	_, err := db.DatabaseAdmin.Exec(`DELETE FROM public.new_questions WHERE id = $1;`, id)
	if CheckError(nil, 0, err, "Error DeleteQusetionUser [query database]") {
		return err
	}
	return nil
}

func (db *SearchEngine) InsertQuestions(q module.InsertQuestion) error {
	if q.ID_T == 0 || q.QuestionText_en == "" || q.QuestionText_ru == "" || q.Answer_en == "" || q.Answer_ru == "" {
		return fmt.Errorf("category, question, and answer must not be empty for adding")
	}
	_, err := db.DatabaseAdmin.Exec(`INSERT INTO public.questions ("TID", question_en, question_ru, answer_en, answer_ru) VALUES ($1, $2, $3, $4, $5);`, q.ID_T, q.QuestionText_en, q.QuestionText_ru, q.Answer_en, q.Answer_ru)
	if CheckError(nil, 0, err, "Error InsertQuestions [query database]") {
		return fmt.Errorf("error adding question: %v", err)
	}
	return nil
}

func (db *SearchEngine) UpdatQuestion(q module.UpdatQuestion) error {
	if q.ID_Q == 0 || q.ID_T == 0 || q.QuestionText_en == "" || q.QuestionText_ru == "" || q.Answer_en == "" || q.Answer_ru == "" {
		return fmt.Errorf("QID, category, question, and answer must not be empty for updating")
	}
	_, err := db.DatabaseAdmin.Exec(`UPDATE public.questions SET "TID" = $1, question_en = $2, question_ru = $3, answer_en = $4, answer_ru = $5 WHERE "QID" = $6;`, q.ID_T, q.QuestionText_en, q.QuestionText_ru, q.Answer_en, q.Answer_ru, q.ID_Q)
	if CheckError(nil, 0, err, "Error UpdatQuestion [query database]") {
		return fmt.Errorf("error updating question: %v", err)
	}
	return nil
}

func (db *SearchEngine) DeleteQuestion(q module.DeleteQuestion) error {
	if q.ID_Q == 0 {
		return fmt.Errorf("QID must not be empty for deletion")
	}
	_, err := db.DatabaseAdmin.Exec(`DELETE FROM public.questions WHERE "QID" = $1;`, q.ID_Q)
	if CheckError(nil, 0, err, "Error DeleteQuestion [query database]") {
		return fmt.Errorf("error deleting question: %v", err)
	}
	return nil
}
