let db = require ('../database.js');

class Task {
  constructor(user_id, description, state) {
    this.user_id = user_id;
    this.description = description;
    // this.created_at = timestamp['created_at'];
    // this.updated_at = timestamp['updated_at'];
    this.state = state;
  }
  save(db, callback){
    let tasks = db.collection('tasks');
    let t = {
        "user_id":  this.user_id,
        "description": this.description,
        "state": this.state
    };
    tasks.insertOne(t);
  }

};
module.exports = Task;
