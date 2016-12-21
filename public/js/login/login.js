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

app.controller("signupFormCtrl", function($scope, $http, $window){

    $scope.user = {
        email : "",
        username : "",
        password : "",
        re_password : ""
    }

    $scope.signupFormCtrl = function(){
        let user = $scope.user;

        let keys = ['email', 'username', 'password', 're_password'];

        for(let i = 0; i < keys.length; i++){
            if(user[keys[i]] == ""){
                $scope.notify = {
                    color : "red-text",
                    message : keys[i] + " cannot be null"
                }
                return;
            }
        }

        if(user.password != user.re_password){
            $scope.notify = {
                color : "red-text",
                message : "re-password must equal to password"
            }
        }else{
            $http({
                url : "./signup",
                method : "post",
                data : user
            }).then(function(result, status){
                let data = result.data;

                if(data.ok == 0){
                    $scope.notify = {
                        color : 'red-text',
                        message : data.message
                    }
                }else{
                    $scope.notify = {
                        color : 'green-text',
                        message : data.message
                    }

                    $window.location.href = "./"
                }
            });
        }
    }
});