package handler

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"sfeduMAP/backend/src/api/service"
	"sfeduMAP/backend/src/db"
	module "sfeduMAP/backend/src/modules"
	"sfeduMAP/backend/src/repository"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var adminSessions = make(map[string]*sql.DB)
var adminSessionsMutex sync.RWMutex

// Подключкние нового пользователя
func AdminLoginHandler(c *gin.Context) {
	var req module.Authorization
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный формат JSON"})
		return
	}
	adminConn, err := db.ConnectEditDB(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный логин или пароль администратора"})
		return
	}
	token := uuid.NewString()
	adminSessionsMutex.Lock()
	adminSessions[token] = adminConn
	adminSessionsMutex.Unlock()

	c.JSON(http.StatusOK, gin.H{
		"token":      token,
		"expires_in": 3600,
	})
}

// Защита соединения авторизацией
func AdminAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		if c.Request.Method == "OPTIONS" {
			c.Next()
			return
		}

		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == authHeader {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Bearer token required"})
			return
		}

		adminSessionsMutex.RLock()
		dbConn, ok := adminSessions[token]
		adminSessionsMutex.RUnlock()

		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			return
		}

		c.Set("adminDB", dbConn)
		c.Next()
	}
}

func AddUserQuestion(c *gin.Context) {
	log.Println("Вызов функции AddUserQuestion")
	var answerAddQuestion module.NewQuestions
	err := c.ShouldBindJSON(&answerAddQuestion)
	if err != nil {
		fmt.Printf("Ошибка при обработке запроса: %v\n", err)
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Неверный формат JSON"})
		return
	}
	err = DbAPIConn.GetAddUserQuestion(answerAddQuestion)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении данных"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Данные успещно добавлены"})
}

func DeleteUserQuestion(c *gin.Context) {
	log.Println("Вызов функции DeleteUserQuestion")
	var id module.QuestionID
	err := c.ShouldBindJSON(&id)
	if err != nil {
		fmt.Printf("Ошибка при обработке запроса: %v\n", err)
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Неверный формат JSON"})
		return
	}
	dbConnI, errr := c.Get("adminDB")
	if !errr {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Подключение к базе данных не найдено"})
		return
	}
	dbConn, errr := dbConnI.(*sql.DB)
	if !errr {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Неверный тип подключения к базе данных"})
		return
	}
	log.Print(id)
	repo := &repository.SearchEngine{Database: dbConn}
	svc := &service.QuestionService{Repo: repo}
	err = svc.GetDeleteUserQuestion(id.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении данных"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Данные успещно удалены"})
}

func InsertQuestionHandler(c *gin.Context) {
	log.Println("Вызов функции InsertQuestionHandler")
	dbConn, err := checkDBConn(c)
	if err != nil {
		fmt.Printf("Ошибка проверки пользователя: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var answerInsertQuestions module.InsertQuestion
	err = c.ShouldBindJSON(&answerInsertQuestions)
	if err != nil {
		fmt.Printf("Ошибка при обработке запроса: %v\n", err)
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Неверный формат JSON"})
		return
	}
	repo := &repository.SearchEngine{Database: dbConn}
	svc := &service.QuestionService{Repo: repo}
	err = svc.GetInsertQuestions(answerInsertQuestions)
	if err != nil {
		fmt.Printf("Ошибка при добавлении данных: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при изменении данных"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Запрос успешно выполнен"})
}

func UpdatQuestionHandler(c *gin.Context) {
	log.Println("Вызов функции UpdatQuestionHandler")
	dbConn, err := checkDBConn(c)
	if err != nil {
		fmt.Printf("Ошибка проверки пользователя: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var answerUpdateQuestions module.UpdatQuestion
	err = c.ShouldBindJSON(&answerUpdateQuestions)
	if err != nil {
		fmt.Printf("Ошибка при обработке запроса: %v\n", err)
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Неверный формат JSON"})
		return
	}
	repo := &repository.SearchEngine{Database: dbConn}
	svc := &service.QuestionService{Repo: repo}
	err = svc.GetUpdatQuestions(answerUpdateQuestions)
	if err != nil {
		fmt.Printf("Ошибка при изменении данных: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при изменении данных"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Запрос успешно выполнен"})
}

func DeleteQuestionHandler(c *gin.Context) {
	log.Println("Вызов функции DeleteQuestionHandler")
	dbConn, err := checkDBConn(c)
	if err != nil {
		fmt.Printf("Ошибка при подключении к базе данных: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var answerDeleteQuestions module.DeleteQuestion
	err = c.ShouldBindJSON(&answerDeleteQuestions)
	if err != nil {
		fmt.Printf("Ошибка при обработке запроса: %v\n", err)
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Неверный формат JSON"})
		return
	}
	repo := &repository.SearchEngine{Database: dbConn}
	svc := &service.QuestionService{Repo: repo}
	err = svc.GetDeleteQuestions(answerDeleteQuestions)
	if err != nil {
		fmt.Printf("Ошибка удалении данных: %v\n", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при изменении данных"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Запрос успешно выполнен"})
}

func AdminLogoutHandler(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Отсутствует токен"})
		return
	}
	adminSessionsMutex.Lock()
	if conn, ok := adminSessions[token]; ok {
		conn.Close()
		delete(adminSessions, token)
	}
	adminSessionsMutex.Unlock()
	c.JSON(http.StatusOK, gin.H{"message": "Пользователь отключен"})
}

func checkDBConn(c *gin.Context) (*sql.DB, error) {
	dbConnI, errr := c.Get("adminDB")
	if !errr {
		return nil, fmt.Errorf("нодключение к базе данных не найдено")
	}
	dbConn, errr := dbConnI.(*sql.DB)
	if !errr {
		return nil, fmt.Errorf("неверный тип подключения к базе данных")
	}
	return dbConn, nil
}
