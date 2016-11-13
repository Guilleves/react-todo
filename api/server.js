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
// var t1 = new Task(1, 1, "holis", "active");
// var t2 = new Task(2, 1, "task de prueba", "completed");
// var t3 = new Task(3, 1, "hu3hu3hu3hu3h", "active");
// //
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
var t = Task.findOne(ObjectId("5828e6adfed5fe1080f99187"), (task) => {
    console.log("found");
    debugger

    return task;
});
debugger

// Task.findOne(ObjectId("5828e6adfed5fe1080f99187"), (task) => {
//     console.log("found");
//     task.destroy((docs) => {
//         console.log("deleted");
//     })
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
