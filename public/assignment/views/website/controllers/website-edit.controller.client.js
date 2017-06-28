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
        model.hasWebsite = false;

        function init() {

            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(displayWebsites);

            function displayWebsites(websites){
                model.websites = websites;
                if (model.websites.length > 0) {
                    model.hasWebsite = true;
                }
            }

            websiteService
                .findWebsiteById(model.websiteId)
                .then(displayWebsite)

            function displayWebsite(website) {
                model.website = website;

            }
        }

        init();

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite  = updateWebsite;

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function updateWebsite(website) {
           websiteService
               .updateWebsite(website, model.websiteId)
               .then(function (response) {
                   $location.url('/user/'+model.userId+'/website');
               });
        }


    }
})();