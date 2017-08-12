/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('questionDetailsController', questionDetailsController, );

    function questionDetailsController($http, $sce, currentUser, $location, $routeParams, questionService, answerService) {

        var model = this;
        model.user = currentUser;
        model.qId = $routeParams["qId"];
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;
        model.logout = logout;
        model.upvoteAnswer = upvoteAnswer;
        model.downvoteAnswer = downvoteAnswer;

        function upvoteAnswer(answer) {
            if(answer.user===currentUser._id){
                alert("Cannot upvote own answer");
            }
            else {
                answer.upVotes+=1;
                answerService
                    .updateAnswer(answer)
            }
        }

        function downvoteAnswer(answer) {
            if(answer.user===currentUser._id){
                alert("Cannot downvote own answer");
            }
            else {
                answer.downVotes+=1;
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