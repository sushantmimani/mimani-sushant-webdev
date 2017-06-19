/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.hasWebsite = false;
        model.createWebsite = createWebsite;

        function createWebsite(website){
            console.log("blaaa",website, typeof website);
            website['developerId'] = model.userId;
            websiteService.createWebsite( website);
            $location.url('/user/'+model.userId+'/website');
        };


        function init() {

            model.websites = websiteService.getWebsiteByUser(model.userId);
            if (model.websites.length > 0) {
                model.hasWebsite = true;
            }
        }

        init();
    }
})();