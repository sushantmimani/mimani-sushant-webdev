/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['websiteId'];
        model.createWebsite = createWebsite;

        model.widget = {};

        function createWebsite(website){
            website['developerId'] = model.userId;
            websiteService.createWebsite( website);
            $location.url('/user/'+model.userId+'/website');
        };

    }
})();