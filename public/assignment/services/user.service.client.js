/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser

        };

        return api;


        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {

                    return response.data;
                });
        }

        function findUserByUsername(username) {

            var url = '/api/user?username=' + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function updateUser(userId, userDetails) {
            var url = '/api/user/' + userId;
            return $http.put(url, userDetails)
                .then(function (response) {
                    return response.data;
                })

        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
