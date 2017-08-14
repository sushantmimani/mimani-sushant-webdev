/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('readController', readController, );

    function readController($http, $sce, currentUser, $location, userService, questionService, answerService) {

        var model = this;
        model.user = currentUser;
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;
        model.logout = logout;
        model.upvoteAnswer = upvoteAnswer;
        model.downvoteAnswer = downvoteAnswer;

        function upvoteAnswer(answer) {
            if(answer.user===currentUser._id){
                alert("Cannot upvote own answer");
            }
            else if(answer.upvotedBy.indexOf(currentUser._id) >=0) {
                answer.upVoted = true;
                alert("Already Upvoted");
            }
            else{
                answer.upVotes+=1;
                answer.upvotedBy.push(currentUser._id);
                answerService
                    .updateAnswer(answer)
                    .then(function (response) {
                        answer.upVoted = true;
                    })
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
            var finalQuestions = [];
            questionService
                .getQuestions()
                .then(displayQuestions)
            function displayQuestions(questions) {
                for(var index in questions){
                    if(model.user.category.indexOf(questions[index].category._id)>=0){
                        finalQuestions.push(questions[index]);
                    }
                }
                model.questions = finalQuestions;
                model.displayResult = false;
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