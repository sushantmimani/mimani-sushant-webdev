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
            createWebsite: createWebsite,
            findWebsiteByWebsiteName: findWebsiteByWebsiteName,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            getWebsiteByUser: getWebsiteByUser

        };

        return api;


        function findWebsiteById(websiteId) {
            for(var index in websites) {
                if (websites[index]._id === websiteId) {
                    return websites[index];
                }
            }
        }

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
            console.log(websites);
        }

        function findWebsiteByWebsiteName(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }

        function updateWebsite(website) {
            console.log(website);
            // var user = findWebsiteById(userId);
            // var index = users.indexOf(user);
            // users.splice(index, 1);
            // users.push(userDetails);
        }

        function deleteWebsite(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            });
            var index = websites.indexOf(website);
            websites.splice(index, 1);
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
