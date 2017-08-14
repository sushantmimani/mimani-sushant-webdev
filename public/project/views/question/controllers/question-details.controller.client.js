/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('questionDetailsController', questionDetailsController, );

    function questionDetailsController($http, $sce, currentUser, userService, $location, $routeParams, questionService, answerService) {

        var model = this;
        model.user = currentUser;
        model.qId = $routeParams["qId"];
        model.answerToEdit = false;
        model.QuestionToEdit = false;
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;
        model.logout = logout;
        model.upvoteAnswer = upvoteAnswer;
        model.downvoteAnswer = downvoteAnswer;
        model.editAnswer = editAnswer;
        model.updateAnswer = updateAnswer;
        model.deleteAnswer = deleteAnswer;
        model.deleteQuestion = deleteQuestion;
        model.editQuestion = editQuestion;
        model.updateQuestion = updateQuestion;

        function updateQuestion(question) {
            questionService
                .updateQuestion(question)
                .then(function (response) {
                    init();
                })
        }

        function editQuestion(question) {

            question.toEdit = !model.questionToEdit;
            model.questionToEdit = !model.questionToEdit;
        }

        function deleteQuestion(question) {
            var answers = question.answer;
            if(answers.length>0){
                for(var index in answers){
                    answerService
                        .deleteAnswer(answers[index]._id)
                }
            }
            questionService
                .deleteQuestion(question._id)
                .then(function (response) {
                   $location.url('/read');
                })
        }

        function deleteAnswer(answer) {
            questionService
                .getQuestionById(answer.question)
                .then(function (question) {
                    console.log(question);
                    for (var index in question.answer) {
                        if (question.answer[index]._id == answer._id) {
                            question.answer.splice(index, 1)
                        }
                    }
                    questionService
                        .updateQuestion(question)
                        .then(function () {
                            answerService
                                .deleteAnswer(answer._id)
                                .then(function (response) {
                                   init();

                                })
                        })
                })
        }

        function updateAnswer(answer) {
            answerService
                .updateAnswer(answer)
                .then(function (response) {
                    init();
                });
        }

        function editAnswer(answer) {
            answer.toEdit = !model.answerToEdit;
            model.answerToEdit = !model.answerToEdit;
        }

        function upvoteAnswer(answer) {
            if(answer.user===currentUser._id){
                alert("Cannot upvote own answer");
            }
            else if(answer.upvotedBy.indexOf(currentUser._id) >=0) {
                alert("Already upvoted");
            }
            else {
                answer.upVotes+=1;
                answer.upvotedBy.push(currentUser._id);
                answerService
                    .updateAnswer(answer)
            }
        }

        function downvoteAnswer(answer) {
            if(answer.user===currentUser._id){
                alert("Cannot downvote own answer");
            }
            else if(answer.downvotedBy.indexOf(currentUser._id) >=0) {
                alert("Already downvoted");
            }
            else {
                answer.downVotes+=1;
                answer.downvotedBy.push(currentUser._id);
                answerService
                    .updateAnswer(answer)
            }


        }



        function init() {
            questionService
                .getQuestionById(model.qId)
                .then(function (question) {
                    model.question = question;
                })
            userService
                .getUs

            $http.get('/api/project/category')
                .then(function (response) {
                    model.categories = response.data;
                })
        }

        init();

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
        }

})();