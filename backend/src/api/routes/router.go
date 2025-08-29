package route

import (
	handler "sfeduMAP/backend/src/api/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.Static("/maps360", "../maps360")
	api := r.Group("/api")
	{
		api.GET("/data", handler.GetQuestionsUnload)
		api.GET("/alldata", handler.GetAllQuestionsUnload)
		api.GET("/get/question", handler.GetQuestionsSearch)
		api.GET("/get/userquestion", handler.GetUserQuestionUnload)
		api.POST("/post/addquestion", handler.AddUserQuestion)
		api.POST("/admin/login", handler.AdminLoginHandler)
		admin := api.Group("/admin")
		admin.Use(handler.AdminAuthMiddleware())
		{
			admin.POST("/insert", handler.InsertQuestionHandler)
			admin.PUT("/update", handler.UpdatQuestionHandler)
			admin.DELETE("/delete", handler.DeleteQuestionHandler)
			admin.POST("/logout", handler.AdminLogoutHandler)
			admin.POST("/deletequestion", handler.DeleteUserQuestion)
		}
	}
	r.OPTIONS("/api/*any", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.AbortWithStatus(204)
	})
}
