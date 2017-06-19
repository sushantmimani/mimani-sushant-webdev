/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId']

        function init() {

            model.websites = websiteService.getWebsiteByUser(model.userId);
            if (model.websites.length > 0) {
                model.hasWebsite = true;
            }

            model.website = websiteService.findWebsiteById(model.websiteId);
        }

        init();

        model.deleteWebsite = deleteWebsite;

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+model.userId+'/website');
        }



    }
})();