package repository

import (
	"log"

	"github.com/gin-gonic/gin"
)

func CheckError(c *gin.Context, status int, err error, mes string) bool {
	if err != nil {
		if c != nil {
			c.AbortWithStatusJSON(status, gin.H{"error": mes})
		}
		log.Printf("%v: %v", mes, err)

		return true
	}
	return false
}
