let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let assert = require('assert');
let database = require ('../database.js');
let getCollection = database.getCollection('tasks');

class Task {
  constructor(task_id, user_id, description, due_date, state) {
    this.task_id = task_id;
    this.user_id = user_id;
    this.description = description;
    // this.created_at = timestamp['created_at'];
    // this.updated_at = timestamp['updated_at'];
    this.due_date = due_date;
    this.state = state;
  }

  save(callback) {
    getCollection.then((collection) => {
      let t = {
        "task_id": this.task_id,
        "user_id":  this.user_id,
        "description": this.description,
        "due_date": this.due_date,
        "state": this.state
      };
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

  update(queryString, params, callback) {
    let description, due_date;
    if (queryString.description ==! undefined)
       description = queryString.description;
    // var due_date = queryString.due_date;
    if (queryString.due_date ==! undefined)
       due_date = queryString.due_date;
    let id = params;
    getCollection.then((collection) => {
      debugger
      collection.update({ 'task_id': id },
                        { $set: { 'description': description, 'due_date': due_date } },
                        function(err, result) {
                          debugger
                          assert.equal(err, null);
                          console.log(result);
                          console.log("updated something");
                          callback(result)
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
        callback(new Task(docs[0].task_id, docs[0].user_id, docs[0].description, docs[0].due_date, docs[0].state));
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
