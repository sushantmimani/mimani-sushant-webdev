/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('profileController', profileController);

    function profileController ($location, $routeParams, userService ) {

        var model = this;
        var userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {

            userService
                .findUserById(userId)
                .then(renderUser);

            function renderUser(user) {
                model.user = user;
            }
        }
        init();

        function updateUser(userDetails) {
            userService
                .updateUser(userId, userDetails)
                .then(function () {
                    model.message = "User updated successfully"
                });
        }

    function deleteUser(userDetails) {
        userService
            .deleteUser(userId, userDetails)
            .then(function () {
                model.message = "User deleted successfully"
                $location.url('/login')

            });
    }
}

})();