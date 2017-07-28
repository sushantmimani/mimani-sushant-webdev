/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location, currentUser) {

        var model = this;
        model.userId = currentUser._id;
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
                    $location.url('/profile/website');
                });
        }

        function updateWebsite(website) {
            if(website.name===undefined || website.name===""){
                model.error = "Website must have a name.";
                return;
            }
           websiteService
               .updateWebsite(website, model.websiteId)
               .then(function (response) {
                   $location.url('/profile/website');
               });
        }


    }
})();