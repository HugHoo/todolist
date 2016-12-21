let app = angular.module("app", []);

app.controller("appCtrl", function($scope, $http){

    $http({
        url : "./user",
        method : "get",
    }).then(function(result, status){
        // console.log(result.data);

        $scope.userProfile = result.data;
    });

});