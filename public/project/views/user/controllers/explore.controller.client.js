/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('exploreController', exploreController);

    function exploreController (questionService) {

        var model = this;
        model.user = null;

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





    }
})();