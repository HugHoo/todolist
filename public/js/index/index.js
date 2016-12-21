let app = angular.module("app", []);

app.controller("appCtrl", function($scope, $http){

    $http({
        url : "./user",
        method : "get",
    }).then(function(result, status){
        // console.log(result.data);

        $scope.userProfile = result.data;
    });

    $scope.switchAddTab = function(){
        console.log("switch to add tab");

        $("ul.tabs").tabs("select_tab", "add");
    }

});

app.controller("addTabCtrl", function($scope, $http){

    $scope.list = {
        title : "",
        timelimit : false,
        date : ""
    }

    $scope.addSubmit = function(){
        // console.log($scope.list);

        // TODO check list valid

        $http({
            url : "./todolist",
            method : "post",
            data : $scope.list
        }).then(function(result, status){
            let data = result.data;
            console.log(data);
        });
    }

});