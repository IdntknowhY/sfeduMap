package handler

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"sfeduMAP/backend/src/api/service"
	"sfeduMAP/backend/src/db"
	module "sfeduMAP/backend/src/modules"
	rp "sfeduMAP/backend/src/repository"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const (
	USER  = "user"
	ADMIN = "adminDB"
)

type Authorization struct {
	AdminSessions      []string
	AdminSessionsMutex sync.RWMutex
}

var DBService *service.QuestionService

// Подключкние нового пользователя
func AdminLoginHandler(a *Authorization) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req module.Authorization
		err := c.ShouldBindJSON(&req)
		if rp.CheckError(c, http.StatusBadRequest, err, "Неверный формат JSON") {
			return
		}
		adminConn := DBService.Repo.GetAdminConnection()
		adminConnAuth, err := db.ConnectEditDB(req.Username, req.Password)
		if rp.CheckError(c, http.StatusUnauthorized, err, "Неверный логин или пароль администратора") {
			return
		}
		var ok bool
		err = adminConnAuth.QueryRow("SELECT has_table_privilege(current_user, 'public.questions', 'INSERT');").Scan(&ok)
		if rp.CheckError(c, http.StatusUnauthorized, err, "Oшибка при проверке прав администратора") {
			return
		}
		if !ok {
			rp.CheckError(c, http.StatusUnauthorized, err, "Недостаточно прав администратора")
			return
		}
		if adminConn == nil {
			DBService.Repo.AddConnecAdmin(adminConnAuth)
		} else {
			adminConnAuth.Close()
		}

		token := uuid.NewString()
		a.AdminSessionsMutex.Lock()
		a.AdminSessions = append(a.AdminSessions, token)
		a.AdminSessionsMutex.Unlock()
		c.JSON(http.StatusOK, module.TokenAutorization{
			Token: token,
			Exp:   3600,
		})
	}
}

// Защита соединения авторизацией
func AdminAuthMiddleware(a *Authorization) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Next()
			return
		}
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, module.ErrorMessage{Error: "Authorization header required"})
			return
		}
		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == authHeader {
			c.AbortWithStatusJSON(http.StatusUnauthorized, module.ErrorMessage{Error: "Bearer token required"})
			return
		}
		var ok bool
		a.AdminSessionsMutex.RLock()
		for _, t := range a.AdminSessions {
			if t == token {
				ok = true
				break
			}
		}
		a.AdminSessionsMutex.RUnlock()

		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, module.ErrorMessage{Error: "Invalid or expired token"})
			return
		}
		c.Set(ADMIN, DBService.Repo.GetAdminConnection())
		c.Next()
	}
}

func AddUserQuestion(c *gin.Context) {
	log.Println("Вызов функции AddUserQuestion")
	var answerAddQuestion module.NewQuestions
	err := c.ShouldBindJSON(&answerAddQuestion)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Неверный формат JSON") {
		return
	}
	err = DBService.GetAddUserQuestion(answerAddQuestion)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка при получении данных") {
		return
	}
	c.JSON(http.StatusOK, module.Message{Message: "Данные успещно добавлены"})
}

func DeleteUserQuestion(c *gin.Context) {
	log.Println("Вызов функции DeleteUserQuestion")
	err := checkAdminConn(c)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка проверки пользователя") {
		return
	}
	var id module.QuestionID
	err = c.ShouldBindJSON(&id)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Неверный формат JSON") {
		return
	}
	err = DBService.GetDeleteUserQuestion(id.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении данных"})
		return
	}
	c.JSON(http.StatusOK, module.Message{Message: "Данные успещно удалены"})
}

func InsertQuestionHandler(c *gin.Context) {
	log.Println("Вызов функции InsertQuestionHandler")
	err := checkAdminConn(c)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка проверки пользователя") {
		return
	}
	var answerInsertQuestions module.InsertQuestion
	err = c.ShouldBindJSON(&answerInsertQuestions)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Неверный формат JSON") {
		return
	}
	err = DBService.GetInsertQuestions(answerInsertQuestions)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка при получении данных") {
		return
	}
	c.JSON(http.StatusOK, module.Message{Message: "Запрос успешно выполнен"})
}

func UpdatQuestionHandler(c *gin.Context) {
	log.Println("Вызов функции UpdatQuestionHandler")
	err := checkAdminConn(c)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка проверки пользователя") {
		return
	}
	var answerUpdateQuestions module.UpdatQuestion
	err = c.ShouldBindJSON(&answerUpdateQuestions)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Неверный формат JSON") {
		return
	}
	err = DBService.GetUpdatQuestions(answerUpdateQuestions)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка при получении данных") {
		return
	}
	c.JSON(http.StatusOK, module.Message{Message: "Запрос успешно выполнен"})
}

func DeleteQuestionHandler(c *gin.Context) {

	log.Println("Вызов функции DeleteQuestionHandler")
	err := checkAdminConn(c)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка проверки пользователя") {
		return
	}
	var answerDeleteQuestions module.DeleteQuestion
	err = c.ShouldBindJSON(&answerDeleteQuestions)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Неверный формат JSON") {
		return
	}
	err = DBService.GetDeleteQuestions(answerDeleteQuestions)
	if rp.CheckError(c, http.StatusInternalServerError, err, "Ошибка при получении данных") {
		return
	}
	c.JSON(http.StatusOK, module.Message{Message: "Запрос успешно выполнен"})
}

func (a *Authorization) AdminLogoutHandler(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Отсутствует токен"})
		return
	}
	a.AdminSessionsMutex.Lock()
	for i, t := range a.AdminSessions {
		if t == token {
			a.AdminSessions = append(a.AdminSessions[:i], a.AdminSessions[i+1:]...)
			break
		}
	}
	a.AdminSessionsMutex.Unlock()
	c.JSON(http.StatusOK, module.Message{Message: "Пользователь отключен"})
}

func checkAdminConn(c *gin.Context) error {
	dbConnI, errorBool1 := c.Get(ADMIN)
	if !errorBool1 {
		return fmt.Errorf("подключение к базе данных не найдено")
	}
	dbConn, errorBool2 := dbConnI.(*sql.DB)
	if !errorBool2 {
		return fmt.Errorf("неверный тип подключения к базе данных")
	}
	var ok bool
	err := dbConn.QueryRow("SELECT has_table_privilege(current_user, 'public.questions', 'INSERT');").Scan(&ok)
	if rp.CheckError(c, http.StatusUnauthorized, err, "Oшибка при проверке прав администратора") {
		return err
	}
	if !ok {
		rp.CheckError(c, http.StatusUnauthorized, err, "Недостаточно прав администратора")
		return fmt.Errorf("недостаточно прав администратора")
	}
	return nil
}
