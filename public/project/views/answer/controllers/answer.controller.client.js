/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('answerController', answerController, );

    function answerController($http, $sce, currentUser, $location, userService, answerService, questionService) {

        var model = this;
        model.user = currentUser;
        model.answer = answer;
        model.submitAnswer = submitAnswer;
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
            model.displayResult = true;
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

        function submitAnswer(questionId, answer) {
            if(answer.answerText =="" || answer.answerText==undefined){
                model.error = "Answer cannot be blank!"
                return;
            }

            var submittedAnswer = {
                "question": questionId,
                "answerText" : answer.answerText,
                "user": currentUser._id,
                "isAnon": answer.isAnon
            }
            answerService
                .submitAnswer(submittedAnswer)
                .then(function (response) {
                    init();
                    $location.url('/read')
                })
        }

        function answer() {
            model.toAnswer = true;
        }



        function init() {
            var finalQuestions = [];
            model.toAnswer = false;
            questionService
                .getQuestions()
                .then(displayQuestions)
            function displayQuestions(questions) {
                for (var index in questions) {
                    var flag = false;
                    var answers = questions[index].answer
                    for (var a_index in answers) {
                        if (answers[a_index].user == currentUser._id) {
                            flag = true;
                        }
                    }

                    if(flag ==false)
                        finalQuestions.push(questions[index]);
                }

                model.questions = finalQuestions;
            }
        }



        init();


    }

})();