package route

import (
	h "sfeduMAP/backend/src/api/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, adminConn *h.Authorization) {
	r.Static("/maps360", "../maps360")
	r.OPTIONS("/api/*any", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.AbortWithStatus(204)
	})
	api := r.Group("/api")
	{
		api.GET("/data", h.GetQuestionsUnload)
		api.GET("/alldata", h.GetAllQuestionsUnload)
		api.GET("/get/question", h.GetQuestionsSearch)
		api.GET("/get/userquestion", h.GetUserQuestionUnload)
		api.POST("/post/addquestion", h.AddUserQuestion)
		api.POST("/admin/login", h.AdminLoginHandler(adminConn))
		admin := api.Group("/admin")
		admin.Use(h.AdminAuthMiddleware(adminConn))
		{
			admin.POST("/insert", h.InsertQuestionHandler)
			admin.PUT("/update", h.UpdatQuestionHandler)
			admin.DELETE("/delete", h.DeleteQuestionHandler)
			admin.POST("/logout", adminConn.AdminLogoutHandler)
			admin.POST("/deletequestion", h.DeleteUserQuestion)
		}
	}
}
