let express = require('express');
let app = express();
let http = require('http');
let bodyParser = require('body-parser');

let Task = require('./tasks/task.js');
let db = require('./database.js');
let ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var t = new Task(4, 1, "prueba", "hoy", "active");
var t1 = new Task(1, 1, "holis", "hoy", "active");
var t2 = new Task(2, 1, "task de prueba", "hoy", "completed");
var t3 = new Task(3, 1, "hu3hu3hu3hu3h", "hoy", "active");
var t4 = new Task(5, 1, "abrigarme", "hoy", "due");
var t5 = new Task(6, 1, "dormir", "hoy", "not started");
var t6 = new Task(7, 1, "bañarme", "hoy", "due");

// t.save(function(){
//     console.log("guardado");
// });
// t1.save(function(){
//     console.log("guardado");
// });
// t2.save(function(){
//     console.log("guardado");
// });
// t3.save(function(){
//     console.log("guardado");
// });
// t4.save(function(){
//     console.log("guardado");
// });
// t5.save(function(){
//     console.log("guardado");
// });
// t6.save(function(){
//     console.log("guardado");
// });
//
// var t = Task.findOne(ObjectId("5828e6adfed5fe1080f99187"), (task) => {
//     console.log("found");
//     debugger
//
//     return task;
// });
// debugger

Task.findOne(ObjectId("5829470b1595b4175403bbb9"), (task) => {
    console.log("found");
    task.update({description: "volví a updatear", due_date: "mañana"}, task.task_id, (docs) => {
        console.log("huehuehe");
    })
});

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

app.put("/tasks/:id", (function(req, res){
  let id = ObjectId(req.params.id);
  Task.update(req.query, id, (docs) => {
    res.send(docs);
  })
}));

app.listen(port);
