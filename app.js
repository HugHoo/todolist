let express = require("express");
let app = express();

app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("public", __dirname + "/public");

app.map = function(a, route){
    route = route || '';
    for(let key in a){
        switch(typeof a[key]){
            case "object":
                app.map(a[key], route + key);
                break;
            case "function":
                console.log("%s %s", key, route);
                app[key](route, a[key]);
                break;
        }
    }
}

let site = {
    index : function(req, res){
        // res.send("site index");
        res.sendFile(app.get("views") + "/index.html");
    }
}

let todolist = {
    list : function(req, res){
        res.send("todo list");
    },

    get : function(req, res){
        res.send("get list " + req.params.tid);
    },

    post : function(req, res){
        res.send("post list " + req.params.tid);
    },

    put : function(req, res){
        res.send("put list " + req.params.tid);
    },

    delete : function(req, res){
        res.send("delete list " + req.params.tid);
    }
}

let user = {
    login : function(req, res){
        res.send("user %s, %p login...", req.params.username, req.params.password);
    },

    signup : function(req, res){
        res.send("user signup");
    }
}

app.map({
    "/" : {
        get : site.index,
        "todolist" : {
            get : todolist.list,
            "/:tid" : {
                get : todolist.get,
                post : todolist.post,
                put : todolist.put,
                delete : todolist.delete
            }
        }
    }
});

app.listen(3000, function(){
    console.log("listening on http://*:3000");
});