/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('readController', readController, );

    function readController($http, $sce, currentUser, $location, userService, questionService) {

        var model = this;
        model.user = currentUser;
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;
        model.logout = logout;



        function init() {
            var finalQuestions = [];
            questionService
                .getQuestions()
                .then(displayQuestions)
            function displayQuestions(questions) {
                for(var index in questions){
                    if(questions[index].answer.length>0){
                        finalQuestions.push(questions[index]);
                    }
                }
                model.questions = finalQuestions;
            }
        }


        init();

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