package module

type Question struct {
	ID_Q            int    `json:"qid"`
	ID_T            int    `json:"tid"`
	Category_en     string `json:"category_en"`
	Category_ru     string `json:"category_ru"`
	QuestionText_en string `json:"question_en"`
	Answer_en       string `json:"answer_en"`
	QuestionText_ru string `json:"question_ru"`
	Answer_ru       string `json:"answer_ru"`
}

type NewQuestions struct {
	ID          string `json:"id"`
	NameUser    string `json:"user"`
	Mail        string `json:"mail"`
	NewQuestion string `json:"question"`
	Date        string `json:"date"`
}

type TypeQuestions struct {
	ID_T        int    `json:"tid"`
	Category_en string `json:"category_en"`
	Category_ru string `json:"category_ru"`
	Status      int    `json:"status"`
}

type InsertQuestion struct {
	ID_Q            int    `json:"qid"`
	ID_T            int    `json:"tid"`
	QuestionText_en string `json:"question_en"`
	Answer_en       string `json:"answer_en"`
	QuestionText_ru string `json:"question_ru"`
	Answer_ru       string `json:"answer_ru"`
}

type UpdatQuestion struct {
	ID_Q            int    `json:"qid"`
	ID_T            int    `json:"tid"`
	QuestionText_en string `json:"question_en"`
	Answer_en       string `json:"answer_en"`
	QuestionText_ru string `json:"question_ru"`
	Answer_ru       string `json:"answer_ru"`
}

type DeleteQuestion struct {
	ID_Q int `json:"qid"`
}

type Authorization struct {
	Username string `json:"admin_login"`
	Password string `json:"admin_password"`
}

type TitleID struct {
	TID int `json:"tid"`
}

type QuestionID struct {
	ID int `json:"qid"`
}
