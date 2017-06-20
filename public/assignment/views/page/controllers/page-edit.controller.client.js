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

            model.pages = pageService.findPageByWebsiteId(model.websiteId);

            model.page = pageService.findPageById(model.pageId);
        }

        init();

        model.deletePage = deletePage;
        model.updatePage  = updatePage;

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/');
        }

        function updatePage(page) {
           pageService.updatePage(model.pageId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/');

        }


    }
})();