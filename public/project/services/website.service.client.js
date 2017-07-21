/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser

        };

        return api;


        function findWebsiteById(websiteId) {
            var url = '/api/website/'+websiteId
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWebsite(website, userId) {
            var url = '/api/user/'+userId+'/website'
            website.developerId = userId;
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateWebsite(website, websiteId) {
            var url = '/api/website/'+websiteId
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWebsite(websiteId) {
            var url = '/api/website/'+websiteId
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllWebsitesForUser(userId) {
            var url = '/api/user/'+userId+'/website';
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }
    }
})();
