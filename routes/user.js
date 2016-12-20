// let conn = require("../util/dbmanager");
let MongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:2333/todolist";

let conn = MongoClient.connect(url);

let user = {
    login : function(req, res){
        // res.send("user %s, %s login...", req.body.email, req.body.password);
        res.send("data: " + JSON.stringify(req.body));

        conn.then(function(db){
            let userColl = db.collection("users");

            userColl.find({ email : req.body.email }).toArray(function(err, docs){
                if(err) console.log(new Error("something wrong."));

                console.log(docs);
            });
        });
    },

    signup : function(req, res){
        res.send("user signup");
    }
}

module.exports = user;