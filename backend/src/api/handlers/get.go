package handler

import (
	"fmt"
	"log"
	"net/http"
	module "sfeduMAP/backend/src/modules"
	rp "sfeduMAP/backend/src/repository"

	"github.com/gin-gonic/gin"
)

func GetQuestionsUnload(c *gin.Context) {
	log.Println("Вызов функции GetQuestionsUnload")
	titleAPI, questionAPI, err := DBService.GetDocumentQuestions()
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка при получении данных") {
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
	userQuestion, err := DBService.GetReadUserQuestion()
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка при получении данных") {
		return
	}
	c.JSON(http.StatusOK, userQuestion)
}

func GetAllQuestionsUnload(c *gin.Context) {
	log.Println("Вызов функции GetAllQuestionsUnload")
	titleAPI, questionAPI, err := DBService.GetAllQuestions()
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка при получении данных") {
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
	if rp.CheckError(c, http.StatusInternalServerError, err, "Неверный формат JSON") {
		return
	}
	questionAPI, err := DBService.GetSearchQuestions(ID_T.TID)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка выгрузки данных из базы данных") {
		return
	}
	c.JSON(http.StatusOK, questionAPI)
}
