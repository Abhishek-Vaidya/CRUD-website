// importing modules
const express = require("express");
const mongoose = require("mongoose");
const { hostname } = require("os");
const path = require("path");

const hostname1 = "localhost"; 
const port = 80;

//initiating app
const app = express();

//seting templet engine
//app.set("views" ,path.join(__dirname , "views"));
app.set("view engine" , "ejs");

//set ststic directry
app.use(express.static("uploads"));

// database connection
mongoose.connect('mongodb://localhost:27017/node_crud_without_img',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// use of middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());



//endpoints
//route prefix
app.use("" , require("./routes/routes"));


//listening app
app.listen(port ,hostname1 , ()=>{
    console.log("Server is running on port 80");
})
