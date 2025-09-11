package route

import (
	h "sfeduMAP/backend/src/api/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, adminConn *h.Authorization) {
	api := r.Group("/api")
	{
		api.GET("/data", h.GetQuestionsUnload)
		api.GET("/alldata", h.GetAllQuestionsUnload)
		api.GET("/get/question", h.GetQuestionsSearch)
		api.GET("/get/userquestion", h.GetUserQuestionUnload)
		api.POST("/post/addquestion", h.AddUserQuestion)
		api.POST("/admin/login", h.AdminLoginHandler(adminConn))
		api.GET("/healthz", func(c *gin.Context) { c.Status(204) })
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
