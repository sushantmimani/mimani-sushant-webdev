/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WebDevProject')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            populateCategories: populateCategories

        };

        return api;

        function populateCategories(user) {
            var url = '/api/project/user/populateCategories';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function logout() {
            var url = '/api/project/logout';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url='/api/project/register';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })

        }

        function login(user) {
            var credentials = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/project/login", credentials)
                .then(function (response) {
                    return response.data;
                })

        }


        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {

                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = '/api/project/username?username=' + JSON.stringify(username);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function updateUser(userId, userDetails) {
            var url = '/api/project/user/' + userId;
            return $http.put(url, userDetails)
                .then(function (response) {
                    return response.data;
                })

        }

        function deleteUser(userId) {
            var url = '/api/project/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = '/api/project/checkLoggedIn';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
