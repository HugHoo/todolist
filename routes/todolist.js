let MongoClient = require("mongodb").MongoClient;
let assert = require("assert");

let url = "mongodb://localhost:2333/todolist";

let todolist = {
    list : function(req, res){
        res.send("todo list");
    },

    get : function(req, res){
        res.send("get list " + req.params.tid);
    },

    post : function(req, res){
        // res.send("post list " + req.params.tid);
        
        let newList = Object.assign(req.body, {
            isdone : false,
            uid : req.session.user.id
        });

        insertList(newList, function(err, list){
            console.log("Insert new list successfully");

            res.send({
                ok : 1,
                data : list
            })
        });
    },

    put : function(req, res){
        res.send("put list " + req.params.tid);
    },

    delete : function(req, res){
        res.send("delete list " + req.params.tid);
    }
}

function insertList(list, fn){
    console.log("Inserting new list...");

    let conn = MongoClient.connect(url);
    conn.then(function(db){
        let todolistColl = db.collection("todolist");

        todolistColl.insertOne(list, function(err, r){
            assert.equal(err, null);
            assert.equal(r.insertedCount, 1);

            db.close();
            fn(null, r.ops);
        });
    }, (reason) => {
        console.log(reason);
    });
}

module.exports = todolist;