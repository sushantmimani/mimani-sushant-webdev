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
        model.answer = answer;
        model.submitAnswer = submitAnswer;

        function submitAnswer(questionId,ans) {
            console.log(questionId);
            var answer = {
                "question": questionId,
                "answerText" : model.answerText,
                "user": currentUser._id
        }
            console.log(answer);
            questionService
                .submitAnswer(answer)
                .then(function (response) {
                    console.log(response);
                })
        }

        function answer() {
            model.toAnswer = true;
        }



        function init() {
            model.toAnswer = false;
            questionService
                .getQuestions()
                .then(displayQuestions)
            function displayQuestions(questions) {
                model.questions = questions;
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