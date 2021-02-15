package main

import (
	"bufio"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"

	"net/http"
	"os"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

//declaring global variables

var db *sql.DB
var err error

func dbConfig() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/sgallery") //to connect with the  sgallery database
	if err != nil {
		fmt.Println("Unable to connect to database")
		panic(err.Error())
	}
}

func uploadImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	if r.Method == "POST" {
		result := make(map[string]string)
		fmt.Println("In upload image function")
		r.ParseMultipartForm(10 * 1024 * 1024)    // it is used to parse the incoming file and set the max size to 10mb
		file, handler, er1 := r.FormFile("image") // it stores the image in file and meta info in handler
		if er1 != nil {
			fmt.Println(er1.Error())
			fmt.Println("1")
			result["status"] = "false"
			result["message"] = "Image upload failed"
			json.NewEncoder(w).Encode(result)
			return
		}
		fmt.Println("File Information")
		fmt.Println("File Name: ", handler.Filename)
		fmt.Println("File size: ", handler.Size)
		fmt.Println("File Type: ", handler.Header)
		split := strings.Split(handler.Filename, ".")
		typ := split[len(split)-1]
		fmt.Println(typ)

		if typ == "png" || typ == "jpg" || typ == "jpeg" {

			email := r.Form.Get("email")
			note := r.Form.Get("note")
			tag := r.Form.Get("tag")
			var maxsno = 0
			er := db.QueryRow("SELECT LAST_INSERT_ID() imagedetails").Scan(&maxsno)
			if er != nil {
				maxsno = 0
			}
			maxsno++
			defer file.Close() //at the end of the function file will be closed
			path := "file" + strconv.Itoa(maxsno) + "." + typ
			tempFile, er2 := os.Create("../uploads/" + path) // it is used to create a  file at the specified location
			if er2 != nil {
				fmt.Println("3")
				result["status"] = "false"
				result["message"] = "Image upload failed"
				json.NewEncoder(w).Encode(result)
				return
			}
			defer tempFile.Close()
			_, er5 := io.Copy(tempFile, file) //copy contents of the file
			if er5 != nil {
				fmt.Println("4")
				result["status"] = "false"
				result["message"] = "Image upload failed"
				json.NewEncoder(w).Encode(result)
				return
			}
			///upload the file contents in the specifies location
			url := "../uploads/" + path
			statement, er3 := db.Prepare("INSERT into imagedetails SET imagepath = ? , email = ? , note = ? , tag = ? ")
			res, er4 := statement.Exec(url, email, note, tag)
			_ = res
			if er4 != nil || er3 != nil {
				fmt.Println("5")
				result["status"] = "false"
				result["message"] = "Image upload failed"
				json.NewEncoder(w).Encode(result)
				return
			}
			result["status"] = "true"
			result["message"] = "Image upload successful"
			json.NewEncoder(w).Encode(result)
			return

		}

	}

}

func getImages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	if r.Method == "POST" {
		fmt.Println("an http request is made for image retrival")
		r.ParseForm()                                      //returns key value pairs of the information sent by the client
		fmt.Println("Email id is :", r.FormValue("email")) // similar to $_POST['email'] in php
		result := make(map[string][]map[string]string)
		statement, er1 := db.Query("SELECT imagepath FROM imagedetails where email=?", r.FormValue("email"))
		_ = er1
		var arr []map[string]string
		for statement.Next() {
			var path string
			err = statement.Scan(&path)
			split := strings.Split(path, ".")
			extention := split[len(split)-1]
			file, _ := os.Open(path)
			reader := bufio.NewReader(file)
			content, _ := ioutil.ReadAll(reader)
			encoded := base64.StdEncoding.EncodeToString(content)
			temp := make(map[string]string)
			temp["imagedata"] = encoded
			temp["extention"] = extention
			arr = append(arr, temp)

		}
		result["urls"] = arr
		json.NewEncoder(w).Encode(result)

	}
}

func signup(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

	if r.Method == "POST" {
		result := make(map[string]string)
		fmt.Println("A request is made for signup")
		r.ParseForm() //returns key value pairs of the information sent by the client
		fmt.Println("Email id is ", r.FormValue("email"))
		fmt.Println("Password is ", r.FormValue("password"))
		fmt.Println("Name is ", r.FormValue("name"))
		var email = r.FormValue("email")
		var password = r.FormValue("password")
		var name = r.FormValue("name")
		statement, er := db.Prepare("INSERT INTO userdetails SET email=?, password=?, name=?")
		if er != nil {

			result["status"] = "false"
			result["message"] = "Signup Failed"
			json.NewEncoder(w).Encode(result)
			return

		}
		sai, er := statement.Exec(email, password, name)
		if er != nil {
			result["status"] = "false"
			result["message"] = "Already a user is registerd with that user"
			json.NewEncoder(w).Encode(result)
			return
		}
		_ = sai //to remove the error : declared but not used
		result["status"] = "true"
		result["message"] = "Signup SuccessFul"
		json.NewEncoder(w).Encode(result)

	}
}

func delete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	if r.Method == "POST" {
		fmt.Println("A request is made for delete")
		r.ParseForm()
		result := make(map[string]string)
		statement, er := db.Query("SELECT * FROM imagedetails WHERE sno=?", r.FormValue("sno"))
		var count = 0
		for statement.Next() {
			count++
		}
		if er != nil || count == 0 {
			result["status"] = "false"
			result["message"] = "Deletion  Failed"
			json.NewEncoder(w).Encode(result)
			return

		}
		statemen, er := db.Prepare("DELETE FROM imagedetails WHERE sno=?")
		if er != nil {
			result["status"] = "false"
			result["message"] = "Deletion Failed"
			json.NewEncoder(w).Encode(result)
			return
		}
		_, err = statemen.Exec(r.FormValue("sno"))
		if err != nil {
			result["status"] = "false"
			result["message"] = "Deletion Failed"
			json.NewEncoder(w).Encode(result)
			return
		}
		result["status"] = "true"
		result["message"] = "Image is successfully deleted"
		json.NewEncoder(w).Encode(result)
		e := os.Remove("../uploads/file" + r.FormValue("sno") + "." + r.FormValue("ext"))
		if e != nil {
			log.Fatal(e)
		}
	}

}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	if r.Method == "POST" {
		fmt.Println("A request is made for login")
		r.ParseForm()
		fmt.Println("Email id is ", r.FormValue("email"))
		fmt.Println("Password is ", r.FormValue("password"))
		result := make(map[string]string)
		statement, er := db.Query("SELECT * FROM userdetails WHERE email=? AND password=?", r.FormValue("email"), r.FormValue("password"))
		var count = 0
		for statement.Next() {
			count++
		}
		if er != nil || count == 0 {
			result["status"] = "false"
			result["message"] = "Authentication Failed"
			json.NewEncoder(w).Encode(result)
			return

		}
		result["status"] = "true"
		result["message"] = "Authentication Successful"
		json.NewEncoder(w).Encode(result)

	}

}

func main() {

	dbConfig()
	http.HandleFunc("/upload", uploadImage) // to create a http request for uploading image
	http.HandleFunc("/getImages", getImages)
	http.HandleFunc("/register", signup)
	http.HandleFunc("/login", login)
	http.HandleFunc("/delete", delete)
	http.ListenAndServe(":8000", nil) //this is used to start the server at port 8000
	defer db.Close()
}
