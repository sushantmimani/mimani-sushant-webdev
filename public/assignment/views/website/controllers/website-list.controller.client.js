/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
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
        }

        init();
    }
})();