var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "missoula",
  database: "dogs"
});
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("mysql connected...");
});
var app = express();
app.use(bodyParser.json());

// This is how to create a table with a route. You can do a similar thing
// when creating a database but I'm not sure if you would ever actually do
// this or if you would just make the database and tables before deploying the app.
// app.get("/createnamestable", (req, res) => {
//   let sql =
//     "CREATE TABLE names(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("dog names table created...");
//   });
// });

app.get("/dognames", (req, res) => {
  let sql = "SELECT * FROM names";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get("/choosedog/:id", (req, res) => {
  let sql = `SELECT * FROM names WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/addnewdog", (req, res) => {
  let post = { name: req.body.name };
  console.log(post);
  let sql = "INSERT INTO names SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("dog name added...");
  });
});

app.put("/updatedog/:id", (req, res) => {
  let sql = `UPDATE names SET name = '${req.body.name}' WHERE id = ${
    req.params.id
  }`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.delete("/deletedog/:id", (req, res) => {
  let sql = `DELETE FROM names WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(3001);
