/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WebDevProject')
        .factory('userService_project', userService);

    function userService($http) {

        var api = {
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login

        };

        return api;


        function login(user) {
            console.log("in user service", user);
            var credentials = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/project/login", credentials)
                .then(function (response) {
                    return response.data;
                })

        }
        function findUserById(userId) {
            var url = '/api/project/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {

                    return response.data;
                });
        }

        function findUserByUsername(username) {

            var url = '/api/project/username?username=' + username;
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
    }
})();