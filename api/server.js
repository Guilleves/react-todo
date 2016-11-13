let express = require('express');
let app = express();
let http = require('http');
let bodyParser = require('body-parser');

let Task = require('./tasks/task.js');
let db = require('./database.js');
let ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var t = new Task(1, "prueba", "active");
// var t1 = new Task(1, "sacar la basura", "active");
// var t2 = new Task(1, "probar metodos", "completed");
// var t3 = new Task(1, "estudiar isw", "active");
//
// t1.save(function(){
//     console.log("guardado");
// });
// t2.save(function(){
//     console.log("guardado");
// });
// t3.save(function(){
//     console.log("guardado");
// });
//
var t = Task.findOne(ObjectId("58278a640084430bec27a1df"), () => {
    console.log("found");
    t.destroy((docs) => {
      console.log("deleted");
    })
});

// var t = Task.findOne(ObjectId("58278a640084430bec27a1df"), function(docs) {
//     console.log("holi" +docs);
// });

let server = http.Server(app);
let port = process.env.PORT || 8000;

app.get("/", function(req, res){
    res.send("holis");
});

app.get("/tasks", (function(req, res){
    Task.findAll((docs) => {
      res.send(docs);
    })
}));

app.get("/tasks/:id", (function(req, res){
  let id = ObjectId(req.params.id);
  Task.findOne(id, (docs) => {
    res.send(docs);
  })
}));

app.listen(port);
