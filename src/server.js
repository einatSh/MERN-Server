const express = require("express");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./dbHandler.js")

// create express app
const app = express();

// parser middleware for parsing requests
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// import routes
const userRoute = require("./Routes/Users");
app.use('/users', userRoute);

// routes
app.get('/', (req, res) => {
    res.json("Welcome to the server biatch!")
});

// listen to port
app.listen(port, () => console.log("listening to port " + port))

db.connect();

/*

// routes
const userRoute = require("./Routes/Users");

// view engine setup
app.set('view engine', 'jade');


//app.use(express.static('../../client/public'));
app.use(express.static(path.join(__dirname, '../../client/public')));

// use routes
app.use("/users", userRoute);

// get routes
app.get("/express_backend", (req, res) => {
  res.send({express: "express backend is connected to react"});
})

// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "client/build")));
//   app.get("*", (req,res) => res.sendFile(path.join(__dirname, "client", "build","index.html")));

// serve static assets if in production
if(process.env.NODE_ENV === "production"){
  // set static folder
  app.use(express.static(path.join(__dirname, "../..client/build")));
  app.get("*", (req,res) => res.sendFile(path.resolve(__dirname, "client", "build","index.html")));
}

*/

