/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "test1@gmail.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "test2@gmail.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "test3@gmail.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "test4@gmail.com"}
        ];

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
            for(var u in users) {
                if (users[u]._id === userId) {
                    return users[u];
                }
            }
        }

        function findUserByCredentials(username, password) {

            var found = null
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    found = user;
                    break;
                }
            }
            return found;
        }

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);

        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }

        function updateUser(userId, userDetails) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users[index]= userDetails;
        }

        function deleteUser(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
})();
