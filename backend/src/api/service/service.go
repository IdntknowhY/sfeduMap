package service

import (
	module "sfeduMAP/backend/src/modules"
	"sfeduMAP/backend/src/repository"
)

type QuestionService struct {
	Repo *repository.SearchEngine
}

func (db *QuestionService) GetAllQuestions() ([]module.TypeQuestions, []module.Question, error) {
	return db.Repo.StartUnloadingDB(0)
}

func (db *QuestionService) GetDocumentQuestions() ([]module.TypeQuestions, []module.Question, error) {
	return db.Repo.StartUnloadingDB(1)
}

func (db *QuestionService) GetAddUserQuestion(q module.NewQuestions) error {
	return db.Repo.AddQusetionUser(q)
}

func (db *QuestionService) GetReadUserQuestion() ([]module.NewQuestions, error) {
	return db.Repo.ReadQusetionUser()
}

func (db *QuestionService) GetDeleteUserQuestion(id int) error {
	return db.Repo.DeleteQusetionUser(id)
}

func (db *QuestionService) GetSearchQuestions(t int) ([]module.Question, error) {
	return db.Repo.SearchQuestion(t)
}

func (db *QuestionService) GetInsertQuestions(qs module.InsertQuestion) error {
	return db.Repo.InsertQuestions(qs)
}

func (db *QuestionService) GetUpdatQuestions(qs module.UpdatQuestion) error {
	return db.Repo.UpdatQuestion(qs)
}

func (db *QuestionService) GetDeleteQuestions(qs module.DeleteQuestion) error {
	return db.Repo.DeleteQuestion(qs)
}
