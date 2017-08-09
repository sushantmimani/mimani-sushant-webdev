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

        function submitAnswer(questionId) {
            var answer = {
                "question": questionId,
                "answerText" : model.answerText,
                "user": currentUser._id
        }
            answerService
                .submitAnswer(answer)
                .then(function (response) {
                    init();
                    $location.url('/answer')
                })
        }

        function answer() {
            model.toAnswer = true;
        }



        function init() {
            console.log("Inside init");
            model.toAnswer = false;
            questionService
                .getQuestions()
                .then(displayQuestions)
            function displayQuestions(questions) {
                for (var index in questions) {
                    var answers = questions[index].answer
                    for (var a_index in answers) {
                        if (answers[a_index].user == currentUser._id) {
                            questions.splice(index,1)
                        }
                    }
                }

                model.questions = questions;
            }
        }



        init();


        }

})();