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
            if(newUser ==undefined || newUser == null || !newUser.hasOwnProperty('firstName')
                || !newUser.hasOwnProperty('lastName') || !newUser.hasOwnProperty('username')
                || !newUser.hasOwnProperty('email') || !newUser.hasOwnProperty('password')
                || !newUser.hasOwnProperty('password2')){
                model.error = "All fields are mandatory!"
                return;
            } else {


            userService
                .findUserByUsername(newUser)
                .then(login)

            function login(found) {
                console.log(found);
                if (found !== 'available') {
                    model.error = "Username and/or Email is already registered";
                } else {
                    if (newUser.password !== newUser.password2) {
                        model.error = "Passwords must match";
                        return;
                    } else {
                        var user = newUser;
                        delete user.password2;
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
    }

})();