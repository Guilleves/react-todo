let MongoClient = require('mongodb').MongoClient;

let database = require ('../database.js');
let getCollection = database.getCollection('tasks');

class Task {
  constructor(user_id, description, state) {
    this.user_id = user_id;
    this.description = description;
    // this.created_at = timestamp['created_at'];
    // this.updated_at = timestamp['updated_at'];
    this.state = state;
  }
  save(db, callback){
    debugger
    let tasks = getCollection;
    let t = {
        "user_id":  this.user_id,
        "description": this.description,
        "state": this.state
    };
    debugger
    tasks.insert(t);
  }

};
module.exports = Task;
