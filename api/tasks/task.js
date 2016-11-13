let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let assert = require('assert');
let database = require ('../database.js');
let getCollection = database.getCollection('tasks');

class Task {
  constructor(task_id, user_id, description, state) {
    this.task_id = task_id;
    this.user_id = user_id;
    this.description = description;
    // this.created_at = timestamp['created_at'];
    // this.updated_at = timestamp['updated_at'];
    this.state = state;
  }
  save(callback) {
    getCollection.then((collection) => {
      let t = {
        "task_id": this.task_id,
        "user_id":  this.user_id,
        "description": this.description,
        "state": this.state
      };
      debugger
      collection.insert(t, function(){
        callback(null, t)
      })
    })
  }
  destroy(callback) {
    let task_id = this.task_id;
    let user_id = this.user_id;
    getCollection.then(function(collection) {
      collection.deleteOne({'task_id': task_id, 'user_id': user_id }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document");
        callback(result);
      })
    })
  }
}


Task.findOne = function(id, callback) {
  getCollection.then((collection) => {
      collection.find({'_id': id}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        debugger
        callback(new Task(docs[0].task_id, docs[0].user_id, docs[0].description, docs[0].state));
      });
  })
};

Task.findAll = function(callback) {
  getCollection.then((collection) => {
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      callback(docs);
    });
  })
};

module.exports = Task;
