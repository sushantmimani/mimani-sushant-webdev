/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('loginController', loginController);

    function loginController($location, userService_project) {

        var model = this;

        model.login = function (user) {
            userService
                .login(user)
                .then(login, handleError);

            function login(found) {
                if (found !== null) {
                    $location.url('/profile');
                } else {
                    model.message = "Username " + user.username + " not found, please try again";
                }
            }
            function handleError(error) {
                model.message = "Username " + user.username + " not found, please try again";

            }
        }

    }
})();