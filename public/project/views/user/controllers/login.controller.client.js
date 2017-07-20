/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function login(found) {
                if(found !== null) {
                    $location.url('/user/' + found._id);
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }
        };
    }
})();