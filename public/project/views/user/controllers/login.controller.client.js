/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (user) {
            userService
                .login(user)
                .then(login, handleError);

            function login(found) {
                if (found !== null) {
                    $location.url('/read');
                } else {
                    model.message = "Incorrect username/password. Please try again.";
                }
            }
            function handleError(error) {
                model.message = "Incorrect username/password. Please try again.";

            }
        }

    }
})();