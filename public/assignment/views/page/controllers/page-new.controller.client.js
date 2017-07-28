/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, pageService, $location, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];

        model.createPage = createPage;


        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(displayPages)

            function displayPages(pages) {
                model.pages = pages;
            }
        }

        init();

        function createPage(page){
            if(page.name===undefined || page.name===""){
                model.error = "Page must have a name.";
                return;
            }
            page.websiteId = model.websiteId;
            pageService
                .createPage(page, model.websiteId )
                .then(function (pages) {
                    $location.url('/profile/website/'+model.websiteId+'/page');


                })
        };


    }
})();