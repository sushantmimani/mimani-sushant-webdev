/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('profileController', profileController);

    function profileController ($location, userService, currentUser, $http ) {

        var model = this;
        model.user = currentUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;


        function init() {
            $http.get('/api/project/category')
                .then(function (response) {
                    model.categories = response.data;
                })
        }

        init();

        function updateUser(userDetails) {
            userService
                .updateUser(currentUser._id, userDetails)
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