let MongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:2333/todolist";

module.exports = MongoClient.connect(url);