/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('profileController', profileController);

    function profileController ($location, userService, currentUser ) {

        var model = this;
        model.user = currentUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;


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