/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {


        var api = {
            findPageById: findPageById,
            findAllPagesForWebsite: findAllPagesForWebsite,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage

        };

        return api;


        function findPageById(pageId) {
            var url = '/api/page/'+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }


        function createPage(page, websiteId) {
            var url = '/api/website/'+websiteId+'/page';
            return $http.post(url,page)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllPagesForWebsite(websiteId) {
            var url = '/api/website/'+websiteId+'/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pageId, pageDetails) {
            var url = '/api/page/'+pageId;
            return $http.put(url, pageDetails)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePage(pageId) {
            var url = '/api/page/'+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })

        }
    }
})();
