(function () {
    angular
        .module('WebDevProject')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.registerUser = registerUser;

        // implementation
        function registerUser(newUser) {
            userService
                .findUserByUsername(newUser)
                .then(login)

            function login(found) {

                if(found !== 'available') {
                    model.error = "Username and/or Email is already registered";
                } else {
                    if(newUser.password !== newUser.password2) {
                        model.error = "Passwords must match";
                        return;
                    } else {
                        delete newUser.password2;
                        userService
                            .register(user)
                            .then(redirectToProfile)

                        function redirectToProfile(user) {
                            $location.url('/read');

                        }
                    }
                }


            }
        }
    }

})();