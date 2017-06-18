/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.hasWebsite = false;

        function init() {

            model.websites = websiteService.getWebsiteByUser(model.userId);
            if (model.websites.length > 0) {
                model.hasWebsite = true;
            }
        }

        init();
    }
})();