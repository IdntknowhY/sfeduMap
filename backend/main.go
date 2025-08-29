package main

import (
	"bytes"
	"io"
	"log"
	handler "sfeduMAP/backend/src/api/handlers"
	route "sfeduMAP/backend/src/api/routes"
	"sfeduMAP/backend/src/api/service"
	"sfeduMAP/backend/src/db"
	"sfeduMAP/backend/src/repository"
	"os"
	"strings"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	dbConnection, err := db.ConnectDB()
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}
	defer dbConnection.Close()

	repo := &repository.SearchEngine{Database: dbConnection}
	scv := &service.QuestionService{Repo: repo}
	handler.DbAPIConn = scv

	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:3000,http://127.0.0.1:3000"
	}

	origins := strings.Split(allowedOrigins, ",")

	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(LoggingRequests)
	r.Use(cors.New(cors.Config{
		AllowOrigins:     origins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	route.SetupRoutes(r)

	log.Println("Сервер запущен на http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Ошибка запуска сервера: %v", err)
	}
}

func LoggingRequests(c *gin.Context) {
	log.Printf("[REQ] %s %s from %s", c.Request.Method, c.Request.URL.Path, c.ClientIP())
	log.Println("Headers:")
	for name, values := range c.Request.Header {
		for _, v := range values {
			log.Printf("  %s: %s", name, v)
		}
	}
	cookies := c.Request.Cookies()
	if len(cookies) > 0 {
		log.Println("Cookies:")
		for _, ck := range cookies {
			log.Printf("  %s = %s", ck.Name, ck.Value)
		}
	} else {
		log.Println("No cookies")
	}
	if c.Request.Body != nil {
		bodyBytes, err := io.ReadAll(c.Request.Body)
		if err != nil {
			log.Printf("[ERROR] reading body: %v", err)
		} else {
			log.Printf("Body: %s", string(bodyBytes))
		}
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
	}
	c.Next()
}
