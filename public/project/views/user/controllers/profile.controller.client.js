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
                    for(var index in model.categories){
                        if(model.user.category.indexOf(model.categories[index]._id) >=0 )
                            model.categories[index].value = true;
                        else
                            model.categories[index].value = false;
                    }
                });



            userService
                .populateCategories(model.user)
                .then(function (user) {
                    model.user = user;
                })
        }

        init();

        function updateUser(userDetails, categories) {
            userDetails.category = []
            for(var index in categories){
                if(categories[index].value===true)
                    userDetails.category.push(categories[index]._id)
            }

            userService
                .updateUser(currentUser._id, userDetails)
                .then(function () {
                    model.message = "User updated successfully"
                });
        }


    function deleteUser() {
        userService
            .deleteUser(currentUser._id)
            .then(function () {
                model.message = "User deleted successfully"
                $location.url('/login')

            });
    }
}

})();