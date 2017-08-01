/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (user) {
            if(!user || user.username===undefined || user.password===undefined)
            {
                model.message = "Please enter Username and Password";
                return;
            }
            userService
                .login(user)
                .then(login, handleError);

            function login(found) {
                if (found !== null) {
                    $location.url('/profile');
                } else {
                    model.message = "Incorrect username/password";
                }
            }
            function handleError(error) {
                model.message = "Incorrect username/password";

            }
        }
    }
})();