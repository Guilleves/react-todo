let express = require('express');
let app = express();
let http = require('http');
let Task = require('./tasks/task.js');
let db = require('./database.js');

var t = new Task(1, "prueba", "active");
// t.save(function(){
//     console.log("guardado");
// });
Task.find("58278a640084430bec27a1df", () => {
    console.log("found");
});

let server = http.Server(app);
let port = process.env.PORT || 8000;

app.get("/", function(req, res){
    res.send("holis");
});

app.listen(port);
