/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, pageService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.createPage = createPage;

        function createPage(page){
            page.websiteId = model.websiteId;
            pageService
                .createPage(page, model.websiteId )
                .then(function (pages) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');


                })
        };


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