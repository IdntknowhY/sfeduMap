package repository

import (
	"database/sql"
	"fmt"
	"log"
	module "sfeduMAP/backend/src/modules"
)

type SearchEngine struct {
	Database *sql.DB
}

// Выгрузка категорий
func (db *SearchEngine) Title() ([]module.TypeQuestions, error) {
	AnswerQueryDB, err := db.Database.Query("SELECT * FROM public.type_questions;")
	if err != nil {
		log.Printf("Error Title [query database]: %v", err)
		return nil, err
	}
	defer AnswerQueryDB.Close()

	var listModuleTitle []module.TypeQuestions
	for AnswerQueryDB.Next() {
		var q module.TypeQuestions
		err := AnswerQueryDB.Scan(&q.ID_T, &q.Category_en, &q.Category_ru, &q.Status)
		if err != nil {
			log.Printf("Error Title [scan row]: %v", err)
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
	AnswerQueryQuestionDB, err := db.Database.Query(QueryQuestionDB, ID_T)
	if err != nil {
		log.Printf("Error SearchQuestion [query database]: %v", err)
		return nil, err
	}
	defer AnswerQueryQuestionDB.Close()
	var listModuleQuestion []module.Question
	for AnswerQueryQuestionDB.Next() {
		var q module.Question
		err := AnswerQueryQuestionDB.Scan(&q.ID_Q, &q.ID_T, &q.Category_en, &q.Category_ru, &q.QuestionText_en, &q.QuestionText_ru, &q.Answer_en, &q.Answer_ru)
		if err != nil {
			log.Printf("Error SearchQuestion [scan row]: %v", err)
			return nil, err
		}
		listModuleQuestion = append(listModuleQuestion, q)
	}
	return listModuleQuestion, err
}

// Выгрузка всех вопросов из базы данных в буфер
func (db *SearchEngine) StartUnloadingDB(StatusTitle int) ([]module.TypeQuestions, []module.Question, error) {
	log.Println("Функция выгрузки категорий вызвана")
	currectuser, err := db.GetCurrentUser()
	if err != nil {
		log.Printf("Error GetStartUnloadingDB [user validation]: %v", err)
		return nil, nil, err
	}
	log.Printf("Текущий пользователь: %v\n", currectuser)
	var listModuleTitle []module.TypeQuestions
	var listModuleQuestion []module.Question
	listModuleTitle, err = db.Title()
	if err != nil {
		log.Printf("Error GetStartUnloadingDB [SearchTitle answer]: %v", err)
		return nil, nil, err
	}
	//Логирование
	for i, t := range listModuleTitle {
		fmt.Printf("\n========================== Titles %v ==========================\n", i+1)
		fmt.Printf("ID title: %v\n", t.ID_T)
		fmt.Printf("Title [en]: %v\n", t.Category_en)
		fmt.Printf("Title [ru]: %v\n", t.Category_ru)
		fmt.Printf("Status title: %v", t.Status)
		fmt.Printf("\n=================================================================\n")
	}

	for _, t := range listModuleTitle {
		if t.Status == StatusTitle || StatusTitle == 0 {
			ModuleQuestion, err := db.SearchQuestion(t.ID_T)
			if err != nil {
				log.Printf("Error GetStartUnloadingDB [SearchQuestion answer]: %v", err)
				return nil, nil, err
			}
			listModuleQuestion = append(listModuleQuestion, ModuleQuestion...)

		}
	}

	//Логирование
	for i, q := range listModuleQuestion {
		fmt.Printf("\n========================== Question %v ==========================\n", i+1)
		fmt.Printf("ID questions: %v\n", q.ID_Q)
		fmt.Printf("Type questions [en]: %v\n", q.Category_en)
		fmt.Printf("Type questions [ru]: %v\n", q.Category_ru)
		fmt.Printf("Question [en]: %v\n", q.QuestionText_en)
		fmt.Printf("Question [ru]: %v\n", q.QuestionText_ru)
		fmt.Printf("Answer to question [en]: %v", q.Answer_en)
		fmt.Printf("Answer to question [ru]: %v", q.Answer_ru)
		fmt.Printf("\n=================================================================\n")
	}
	return listModuleTitle, listModuleQuestion, nil
}

func (db *SearchEngine) GetCurrentUser() (string, error) {
	var currentUser string
	query := `SELECT current_user;`

	err := db.Database.QueryRow(query).Scan(&currentUser)
	if err != nil {
		return "", fmt.Errorf("failed to get current user: %w", err)
	}

	return currentUser, nil
}

func (db *SearchEngine) AddQusetionUser(q module.NewQuestions) error {
	_, err := db.Database.Exec(`INSERT INTO public.new_questions(name_user, mail, question) VALUES ($1, $2, $3);`, q.NameUser, q.Mail, q.NewQuestion)
	if err != nil {
		log.Printf("Error adding question: %v", err)
		return err
	}
	return nil
}

func (db *SearchEngine) ReadQusetionUser() ([]module.NewQuestions, error) {
	answerNewQuestion, err := db.Database.Query(`SELECT * FROM public.new_questions ORDER BY id ASC;`)
	if err != nil {
		log.Printf("Error read question: %v", err)
		return nil, err
	}
	defer answerNewQuestion.Close()
	var listModuleNewQuestion []module.NewQuestions
	for answerNewQuestion.Next() {
		var nq module.NewQuestions
		err := answerNewQuestion.Scan(&nq.ID, &nq.NameUser, &nq.Mail, &nq.NewQuestion, &nq.Date)
		if err != nil {
			log.Printf("Error ReadQusetionUser [scan row]: %v", err)
			return nil, err
		}
		listModuleNewQuestion = append(listModuleNewQuestion, nq)
	}
	return listModuleNewQuestion, nil
}

func (db *SearchEngine) DeleteQusetionUser(id int) error {
	_, err := db.Database.Exec(`DELETE FROM public.new_questions WHERE id = $1;`, id)
	if err != nil {
		log.Printf("Error delete question: %v", err)
		return err
	}
	return nil
}

func (db *SearchEngine) InsertQuestions(q module.InsertQuestion) error {
	currectuser, err := db.GetCurrentUser()
	if err != nil {
		return fmt.Errorf("error adding question: %v", err)
	}
	log.Printf("Текущий пользователь: %v\n", currectuser)
	if q.ID_T == 0 || q.QuestionText_en == "" || q.QuestionText_ru == "" || q.Answer_en == "" || q.Answer_ru == "" {
		fmt.Printf("Error InsertQuestions [validation]: %v\n", err)
		return fmt.Errorf("category, question, and answer must not be empty for adding")
	}
	_, err = db.Database.Exec(`INSERT INTO public.questions ("TID", question_en, question_ru, answer_en, answer_ru) VALUES ($1, $2, $3, $4, $5);`, q.ID_T, q.QuestionText_en, q.QuestionText_ru, q.Answer_en, q.Answer_ru)
	if err != nil {
		return fmt.Errorf("error adding question: %v", err)
	}
	return nil
}

func (db *SearchEngine) UpdatQuestion(q module.UpdatQuestion) error {
	currectuser, err := db.GetCurrentUser()
	if err != nil {
		return fmt.Errorf("error adding question: %v", err)
	}
	log.Printf("Текущий пользователь: %v\n", currectuser)
	if q.ID_Q == 0 || q.ID_T == 0 || q.QuestionText_en == "" || q.QuestionText_ru == "" || q.Answer_en == "" || q.Answer_ru == "" {
		fmt.Printf("Error UpdateQuestions [validation]: %v\n", err)
		return fmt.Errorf("QID, category, question, and answer must not be empty for updating")
	}
	_, err = db.Database.Exec(`UPDATE public.questions SET "TID" = $1, question_en = $2, question_ru = $3, answer_en = $4, answer_ru = $5 WHERE "QID" = $6;`, q.ID_T, q.QuestionText_en, q.QuestionText_ru, q.Answer_en, q.Answer_ru, q.ID_Q)
	if err != nil {
		return fmt.Errorf("error updating question: %v", err)
	}
	return nil
}

func (db *SearchEngine) DeleteQuestion(q module.DeleteQuestion) error {
	currectuser, err := db.GetCurrentUser()
	if err != nil {
		return fmt.Errorf("error adding question: %v", err)
	}
	log.Printf("Текущий пользователь: %v\n", currectuser)
	if q.ID_Q == 0 {
		fmt.Printf("Error DeleteQuestions [validation]: %v\n", err)
		return fmt.Errorf("QID must not be empty for deletion")
	}
	_, err = db.Database.Exec(`DELETE FROM public.questions WHERE "QID" = $1;`, q.ID_Q)
	if err != nil {
		return fmt.Errorf("error deleting question: %v", err)
	}
	return nil
}
