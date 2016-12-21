let assert = require("assert");
// let conn = require("../util/dbmanager");

let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:2333/todolist";

let user = {
    get : function(req, res){
        res.send({
            email : req.session.user.email,
            username : req.session.user.username
        });
    },

    login : function(req, res){
        delete req.session.user;

        authenticate(req.body.email, req.body.password, function(err, user){
            if(err){
                console.log('authenticated [%s : %s] failed: %s', req.body.email, req.body.password, err.message);
                res.send({
                    ok : 0,
                    message : err.message
                });
            }else{
                console.log("authentidated [%s : %s] successfully", req.body.email, req.body.password);

                req.session.user = user;

                res.send({
                    ok : 1,
                    message : "Login successfully."
                });
            }
        });
    },

    signup : function(req, res){
        // res.send("user signup");

        register(req.body, function(err, user){
            if(err){
                console.log('registered failed : ', err.message);                
                res.send({
                    ok : 0,
                    message : err.message
                });
            }else{
                console.log("registered successfully");

                req.session.user = user;
                res.send({
                    ok : 1,
                    message : "registered successfully"
                });
            }
        });
    }
}

// user authentication
function authenticate(email, password, fn){
    console.log("authenticating [%s : %s]", email, password);

    // connect to mongodb
    let conn = MongoClient.connect(url);

    // conn intansed of Promise
    conn.then(function(db){
        let userColl = db.collection("users");

        // find user from mongodb
        userColl.find({ email : email }).toArray(function(err, docs){
            assert.equal(err, null);

            // console.log("docs == null", docs == null);
            // console.log(docs.length);

            // check if user existed
            if(!docs || docs.length != 1)
                fn(new Error("Cannot find user."));
            else{
                let user = docs[0];

                // TODO secret password
                if(password == user.password){
                    fn(null, user);
                }else{
                    fn(new Error("Invalid password"));
                }
            }

            db.close();
        });
    });
}

// register user
function register(user, fn){
    assert.equal(typeof user, "object");

    console.log('registering ', user);

    // connect to mongodb
    let conn = MongoClient.connect(url);

    // conn is instance of Promise
    conn.then(function(db){
        let userColl = db.collection("users");

        userColl.find({ email : user.email }).toArray(function(err, docs){
            assert.equal(err, null);

            // check if email alreay existed
            if(docs.length == 0){
                delete user['re_password'];

                // insert document
                userColl.insertOne(user, function(err, r){
                    assert.equal(err, null);
                    assert.equal(r.insertedCount, 1);

                    fn(null, r.ops);
                });
            }else{
                fn(new Error("Email already existed."));
            }

            db.close();            
        });
    });
}

module.exports = user;