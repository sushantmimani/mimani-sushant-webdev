/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('searchController', searchController, );

    function searchController($http, $sce, currentUser, $location, userService) {

        var model = this;
        model.user = currentUser;
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;

        model.logout = logout;

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url('/login');
                })
        }


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