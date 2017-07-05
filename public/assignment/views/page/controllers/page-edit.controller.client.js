/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {

            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(displayPages)

            function displayPages(pages) {
                model.pages = pages;
            }

            pageService
                .findPageById(model.pageId)
                .then(displayPage)

            function displayPage(page) {
                model.page = page
            }

        }

        init();

        model.deletePage = deletePage;
        model.updatePage  = updatePage;

        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/');
                })
        }

        function updatePage(page) {
           pageService
               .updatePage(model.pageId, page)
               .then(function (response) {
                   $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/');
               })

        }


    }
})();