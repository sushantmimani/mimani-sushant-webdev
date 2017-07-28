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
            if(username===undefined || password===undefined || password2===undefined){
                model.error="All fields are mandatory. Please try again";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(login)

            function login(found) {

                if(found !== 'available') {
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
                            .register(user)
                            .then(redirectToProfile)

                        function redirectToProfile(user) {
                            $location.url('/profile');

                        }
                    }
                }


            }
        }
    }

})();