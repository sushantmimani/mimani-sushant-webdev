/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId']

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(displayPages)

            function displayPages(pages) {
                model.pages = pages;
            }
        }
        init();
    }
})();