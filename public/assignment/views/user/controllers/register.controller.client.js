(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.registerUser = registerUser;

        // implementation
        function registerUser(username, password, password2) {
            // userService
            //     .findUserByUsername(username)
            //     .then(login)
            //
            // function login(response) {
            //
            //     console.log(">>>>>>",found);
            // }

            var found = null;
                if(found !== null) {
                    model.error = "Username is not available";
                } else {
                    if(password !== password2) {
                        model.error = "Passwords must match";
                        return;
                    } else {
                        var user = {
                            username: username,
                            password: password
                        };
                        userService
                            .createUser(user)
                            .then(redirectToProfile)

                        function redirectToProfile(user) {
                            $location.url('/user/' + user._id);

                        }
                    }
                }
            }
        }
    // }
})();