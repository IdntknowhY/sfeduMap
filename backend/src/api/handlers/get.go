package handler

import (
	"fmt"
	"log"
	"net/http"
	"sfeduMAP/backend/src/api/service"
	module "sfeduMAP/backend/src/modules"

	"github.com/gin-gonic/gin"
)

var DbAPIConn *service.QuestionService

func GetQuestionsUnload(c *gin.Context) {
	log.Println("Вызов функции GetQuestionsUnload")
	titleAPI, questionAPI, err := DbAPIConn.GetDocumentQuestions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении данных"})
		return
	}

	response := gin.H{
		"titles":    titleAPI,
		"questions": questionAPI,
	}

	c.JSON(http.StatusOK, response)
}

func GetUserQuestionUnload(c *gin.Context) {
	log.Println("Вызов функции GetUserQuestionUnload")
	userQuestion, err := DbAPIConn.GetReadUserQuestion()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении данных"})
		return
	}
	c.JSON(http.StatusOK, userQuestion)
}

func GetAllQuestionsUnload(c *gin.Context) {
	log.Println("Вызов функции GetAllQuestionsUnload")
	titleAPI, questionAPI, err := DbAPIConn.GetAllQuestions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении данных"})
		return
	}

	response := gin.H{
		"titles":    titleAPI,
		"questions": questionAPI,
	}
	fmt.Printf("body: %v", response)
	c.JSON(http.StatusOK, response)
}

func GetQuestionsSearch(c *gin.Context) {
	log.Println("Вызов функции GetQuestions")
	var ID_T module.TitleID
	err := c.ShouldBindJSON(&ID_T)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Неверный формат JSON"})
		return
	}
	questionAPI, err := DbAPIConn.GetSearchQuestions(ID_T.TID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка выгрузки данных из базы данных"})
		return
	}
	c.JSON(http.StatusOK, questionAPI)
}
