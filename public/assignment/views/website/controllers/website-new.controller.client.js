/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService, $location, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.hasWebsite = false;
        model.createWebsite = createWebsite;

        function createWebsite(website){
            websiteService
                .createWebsite(website, model.userId)
                .then(function (response){
                    $location.url('/profile/website');
                })
        };


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
        }

        init();
    }
})();