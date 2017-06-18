/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            findWebsiteById: findWebsiteById,
            findWebsiteByCredentials: findWebsiteByCredentials,
            createWebsite: createWebsite,
            findWebsiteByWebsitename: findWebsiteByWebsitename,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            getWebsiteByUser: getWebsiteByUser

        };

        return api;


        function findWebsiteById(userId) {
            for(var u in users) {
                if (users[u]._id === userId) {
                    return users[u];
                }
            }
        }

        function findWebsiteByCredentials(username, password) {

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

        function createWebsite(userId, website) {
            website.developerId  = userId;
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }

        function findWebsiteByWebsitename(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }

        function updateWebsite(userId, userDetails) {
            var user = findWebsiteById(userId);
            var index = users.indexOf(user);
            users.splice(index, 1);
            users.push(userDetails);
        }

        function deleteWebsite(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }

        function getWebsiteByUser(userId) {
            var websiteList = [];
            for (var index in websites) {
                if (websites[index].developerId === userId) {
                    websiteList.push(websites[index]);
                }
            }
            return websiteList;
        }
    }
})();
