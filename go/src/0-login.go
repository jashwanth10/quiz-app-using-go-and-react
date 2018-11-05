package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB // declaring the db globally
var err error

type User struct {
	gorm.Model
	Name     string
	Password string
}

type Genre struct {
	gorm.Model
	Name string
}

type Quiz struct {
	gorm.Model
	Name    string
	Genreid int
}

type Question struct {
	gorm.Model
	Question string
	Optiona  string
	Answera  bool
	Optionb  string
	Answerb  bool
	Optionc  string
	Answerc  bool
	Optiond  string
	Answerd  bool
	Type     int
	Quizid   int
}
type Userquiz struct {
	gorm.Model
	Username string
	Quizname string
	Genreid  int
	Score    int
}
type Leaderboard struct {
	gorm.Model
	Genreid  int
	Username string
	Score    int
}
type Rows struct {
	Name  string
	Total int
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &Genre{}, &Quiz{}, &Question{}, &Userquiz{}, &Leaderboard{})
	r := gin.Default()
	r.POST("/user/", Register)
	r.POST("/login/", Login)
	r.GET("/user/", GetPeople)
	r.DELETE("/user/:id", DeleteUser)
	r.GET("/genre/", GetGenre)
	r.POST("/genre/", CreateQuiz)
	r.GET("/quiz/:id", GetQuiz)
	r.DELETE("/quiz/:id", DeleteQuiz)
	r.GET("/quiz/", GetQuizAll)
	r.POST("/questions/", CreateQuestion)
	r.GET("/question/:id", GetQuestions)
	r.PUT("/question/:id", EditQuestion)
	r.DELETE("question/:id", DeleteQuestion)
	r.POST("/userquiz/", UserQuiz)
	r.GET("/userquiz/", GetScore)
	r.GET("/leader/:id", GetLeaderboard)
	r.GET("/leaderall/", GetAllScores)
	r.Use((cors.Default()))
	r.Run(":8080")
}

func Register(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	password := user.Password
	username := user.Name
	if err := db.Where("name = ?", username).First(&user).Error; err == nil {
		name := 0
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, name)
		fmt.Println("UserName is Already Used")
	} else if len(password) < 8 {
		name := 1
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, name)
		fmt.Println("Length of Password is short")
	} else {
		bytePassword := []byte(password)
		passwordHash, _ := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
		user.Password = string(passwordHash)
		db.Create(&user)
		c.Header("access-control-allow-origin", "*")
		name := 2
		c.JSON(200, name)
	}
}
func Login(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	username := user.Name
	password := user.Password
	if err := db.Where("name = ?", username).First(&user).Error; err == nil {
		hashpassword := user.Password
		if err1 := bcrypt.CompareHashAndPassword([]byte(hashpassword), []byte(password)); err1 == nil {
			errorStatus := 0
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, errorStatus)
		} else {
			errorStatus := 1
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, errorStatus)
		}
	} else {
		errorStatus := 1
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, errorStatus)
	}
}

func GetPeople(c *gin.Context) {
	var user []User
	if err := db.Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	}
}
func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	c.BindJSON(&quiz)
	name := quiz.Name
	c.Header("access-control-allow-origin", "*")
	if err := db.Where("name = ?", name).First(&quiz).Error; err == nil {
		status := 0
		c.JSON(200, status)
	} else if len(name) == 0 {
		status := 1
		c.JSON(200, status)
	} else {
		db.Create(&quiz)
		status := 2
		c.JSON(200, status)
	}
}

func GetGenre(c *gin.Context) {
	var genre []Genre
	if err := db.Find(&genre).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genre)
	}

}
func GetQuiz(c *gin.Context) {
	var quiz []Quiz
	id := c.Params.ByName("id")
	fmt.Println(id)
	c.Header("access-control-allow-origin", "*")
	if err := db.Where("genreid = ?", id).Find(&quiz).Error; err == nil {
		c.JSON(200, quiz)
	} else {
		c.AbortWithStatus(404)
	}

}
func GetQuizAll(c *gin.Context) {
	var quiz []Quiz
	c.Header("access-control-allow-origin", "*")
	if err := db.Find(&quiz).Error; err == nil {
		c.JSON(200, quiz)
	} else {
		c.AbortWithStatus(404)
	}
}
func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	c.Header("access-control-allow-origin", "*")
	if err := db.Where("id = ?", id).First(&quiz).Delete(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
	}
	//fmt.Println(quiz)
	qid := quiz.ID
	qname := quiz.Name
	gid := quiz.Genreid
	var question []Question
	if err := db.Where("quizid = ?", qid).Find(&question).Delete(&question).Error; err == nil {
		var userquiz []Userquiz
		if err := db.Where("quizname = ?", qname).Find(&userquiz).Error; err == nil {
			for i := 0; i < len(userquiz); i++ {
				var leaderboard Leaderboard
				if err := db.Where("username = ? and genreid = ?", userquiz[i].Username, gid).First(&leaderboard).Error; err == nil {
					fmt.Println("ld:", leaderboard.Score)
					leaderboard.Score -= userquiz[i].Score

					err := db.Where("username = ? and genreid = ?", userquiz[i].Username, gid).Save(&leaderboard).Error
					fmt.Println("maa", err)
				} else {
					fmt.Println(err)
					c.JSON(200, quiz)
				}
				err := db.Where("quizname = ?", qname).Find(&userquiz[i]).Delete(&userquiz[i]).Error
				fmt.Println("a", err)
			}

		} else {
			fmt.Println("b", err)
			c.AbortWithStatus(404)
		}
	} else {
		fmt.Println("c", err)
		c.AbortWithStatus(404)
	}

}
func CreateQuestion(c *gin.Context) {
	var question Question
	c.Header("access-control-allow-origin", "*")
	if err := c.BindJSON(&question); err != nil {
		c.AbortWithStatus(404)
	}

	fmt.Println(err)
	db.Create(&question)

	c.JSON(200, question)
}
func EditQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	fmt.Println(id)
	c.Header("access-control-allow-origin", "*")
	if err := db.Where("ID = ?", id).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.JSON(200, question)
}
func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	err := db.Where("id = ?", id).Delete(&question)
	c.Header("access-control-allow-origin", "*")
	if err != nil {
		c.AbortWithStatus(404)
	} else {
		c.JSON(200, err)
	}
}
func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	d := db.Where("id = ?", id).Delete(&user)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func GetQuestions(c *gin.Context) {
	var questions []Question
	id := c.Params.ByName("id")
	c.Header("access-control-allow-origin", "*")
	if err := db.Where("quizid = ?", id).Find(&questions).Error; err != nil {
		c.AbortWithStatus(404)
	} else {
		c.JSON(200, questions)
	}

}
func UserQuiz(c *gin.Context) {
	var userquiz Userquiz
	var leaderboard Leaderboard
	c.Header("access-control-allow-origin", "*")
	if err := c.BindJSON(&userquiz); err != nil {
		c.AbortWithStatus(404)
	}
	genreid := userquiz.Genreid
	username := userquiz.Username
	if err := db.Where("genreid = ? and username = ?", genreid, username).Find(&leaderboard).Error; err == nil {
		leaderboard.Score += userquiz.Score
		db.Save(&leaderboard)
	} else {
		leaderboard.Username = username
		leaderboard.Genreid = genreid
		leaderboard.Score = userquiz.Score
		db.Create(&leaderboard)
	}
	fmt.Println("sx", err)
	db.Create(&userquiz)

	c.JSON(200, userquiz)
}
func GetScore(c *gin.Context) {
	var userquiz []Userquiz
	c.Header("access-control-allow-origin", "*")
	if err := db.Find(&userquiz).Error; err != nil {
		c.AbortWithStatus(404)
	} else {
		c.JSON(200, userquiz)
	}
}
func GetAllScores(c *gin.Context) {

	rows, err := db.Table("leaderboards").Select("username as name, sum(score) as total").Group("username").Order("total desc").Rows()
	c.Header("access-control-allow-origin", "*")
	defer rows.Close()
	var (
		name  string
		total int
	)
	var pows []Rows
	for rows.Next() {
		var kows Rows
		rows.Scan(&name, &total)
		kows.Name = name
		kows.Total = total
		pows = append(pows, kows)
	}

	fmt.Println(err)
	c.JSON(200, pows)
}
func GetLeaderboard(c *gin.Context) {
	var leaderboard []Leaderboard
	id := c.Params.ByName("id")
	c.Header("access-control-allow-origin", "*")
	if err := db.Where("genreid = ?", id).Order("score desc").Find(&leaderboard).Error; err != nil {
		c.AbortWithStatus(404)
	} else {
		c.JSON(200, leaderboard)
	}
}
