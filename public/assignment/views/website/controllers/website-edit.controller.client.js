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
        console.log(model.websiteId)
        model.hasWebsite = false;

        function init() {

            model.websites = websiteService.findWebsiteByUser(model.userId);
            if (model.websites.length > 0) {
                model.hasWebsite = true;
            }

            model.website = websiteService.findWebsiteById(model.websiteId);
        }

        init();

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite  = updateWebsite;

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

        function updateWebsite(website) {
           websiteService.updateWebsite(website);
            $location.url('/user/'+model.userId+'/website');
        }


    }
})();