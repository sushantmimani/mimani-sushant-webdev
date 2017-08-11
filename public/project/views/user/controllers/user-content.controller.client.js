/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('userContentController', userContentController);

    function userContentController ($location, userService, currentUser, $http ) {

        var model = this;
        model.user = currentUser;
        model.logout = logout;
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;

        model.tab = 1;

        model.setTab = function(newTab){
            console.log("in setTab");
            model.tab = newTab;
        };

        model.isSet = function(tabNum){
            console.log(model.tab === tabNum)
            console.log("in isSet");
            return model.tab === tabNum;
        };

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


        function init() {
            userService
                .getAllQuestionsForUser(model.user._id)
                .then(function (questions) {
                    model.questions= questions;
                });

            userService
                .getAllAnswersForUser(model.user._id)
                .then(function (answers) {
                    model.answers= answers;
                })

        }

        init();


}

})();