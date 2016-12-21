let app = angular.module("app", []);

app.controller("appCtrl", function($scope){

});

app.controller("loginFormCtrl", function($scope, $http, $window){

    $scope.loginFormSubmit = function(){
        $http({
            url : "./login",
            method : "post",
            data : $scope.user
        }).then(function(result, status){
            console.log(result.data);

            let data = result.data;
            if(data.ok == 0){
                $scope.notify = {
                    color : "red-text",
                    message : data.message
                }
            }else{
                $scope.notiy = {
                    color : 'green-text',
                    message : data.message
                }
                // window.location.replace("./");
                $window.location.href = './';
            }
        });
    }
});