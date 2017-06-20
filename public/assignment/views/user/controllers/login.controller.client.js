/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login (username, password) {

            var found = userService.findUserByCredentials(username,password);
            if (found !== null) {
                // $scope.message = "Welcome " + username;
                $location.url('/user/' + found._id);
            } else {
                model.message = "Username " + username + " not found";
            }
        }
    }
})();