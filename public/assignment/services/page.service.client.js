/**
 * Created by sushantmimani on 6/16/17.
 */

(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]

        var api = {
            findPageById: findPageById,
            findPageByWebsiteId: findPageByWebsiteId,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage

        };

        return api;


        function findPageById(pageId) {
            for(var u in pages) {
                if (pages[u]._id === pageId) {
                    return pages[u];
                }
            }
        }


        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
            console.log(pages);

        }

        function findPageByWebsiteId(websiteId) {
            var pageList = [];
            for(var u in pages) {
                if (pages[u].websiteId=== websiteId) {
                    pageList.push(pages[u])
                }
            }
            return pageList;
        }

        function updatePage(pageId, pageDetails) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
            pages.push(pageDetails);
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }
    }
})();
