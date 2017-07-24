/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController ($location, $routeParams, userService, currentUser ) {

        var model = this;
        // var userId = $routeParams['userId'];
        model.user = currentUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function logout() {
             userService.logout()
                 .then(function (response) {
                     $location.url('/login');
                 })
        }


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