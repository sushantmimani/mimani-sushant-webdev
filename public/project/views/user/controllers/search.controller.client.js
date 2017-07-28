/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('searchController', searchController);

    function searchController($http, $sce) {

        var model = this;

        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;


        function searchGoogle(text) {
            $http.get("https://www.googleapis.com/customsearch/" +
                "v1?key=AIzaSyAxBWB1Vm6eIWK9VMYfQPr6ADuFwe4nRWE&cx=008911214601422826019:tjb4-7clba4&q="+text)
                .then(function (resp) {
                    model.result = resp.data.items;
                })
        }



    function trustThisContent(html) {
        // diligence to scrub any unsafe content
        return $sce.trustAsHtml(html);
    }
        }

})();