/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('adminController', adminController);

    function adminController ($sce, $location, userService, currentUser, $http, questionService, categoryService, answerService) {

        var model = this;
        model.questionToEdit = false;
        model.editCat = false;
        model.addCat = false;
        model.addUser = false;
        model.editUser = false;
        model.answerToEdit = false;
        model.user = currentUser;
        model.logout = logout;
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;
        model.deleteCategory = deleteCategory;
        model.editCategory = editCategory;
        model.updateCategory = updateCategory;
        model.createCategory = createCategory;
        model.deleteUser= deleteUser;
        model.createUser = createUser;
        model.deleteQuestion = deleteQuestion;
        model.updateUser = updateUser;
        model.updateUserNew = updateUserNew;

        function updateUserNew(user) {
            userService
                .updateUser(user._id, user)
                .then(function (resp) {
                    getUserList();
                    model.editUser = false;
                })
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
                    getQuestionList();
                })
        }

        function createUser(user) {
            if(user != undefined && user.hasOwnProperty('firstName') && user.hasOwnProperty('lastName')
                && user.hasOwnProperty('username') && user.hasOwnProperty('password')
                && user.hasOwnProperty('password2')){
                userService
                    .createUser(user)
                    .then(function (response) {
                        getUserList();
                        model.addUser = false;
                        model.message = "User created!";

                    })
            }

            else
               model.error = "All fields are madatory!";
        }


        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function (response) {
                    getUserList();
                })
        }
        function createCategory(newCategory) {
            var category = {
                type: newCategory
            }
            categoryService
                .createCategory(category)
                .then(function (response) {
                    model.addCat = false;
                    getCategoryList();
                })
        }

        function updateCategory(category) {
            categoryService
                .updateCategory(category)
                .then(function (response) {
                    model.editCat = false;
                })

        }

        function editCategory(category) {
            model.categoryToEdit = category;
            model.editCat = !model.editCat;
        }

        function updateUser(user) {
            model.userToEdit = user;
            model.editUser = !model.editUser;
        }

        function deleteCategory(category) {

            categoryService
                .deleteCategory(category)
                .then(function (response) {
                    getCategoryList();
                })
        }


        model.tab = 1;

        model.setTab = function(newTab){
            model.tab = newTab;
        };

        model.isSet = function(tabNum){
            return model.tab === tabNum;
        };




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

        function getCategoryList() {
            $http.get('/api/project/category')
                .then(function (response) {
                    model.categories = response.data;
                    model.categoryCount = model.categories.length;
                })
        }

        function getUserList() {
            userService
                .getUsers()
                .then(function (users) {
                    model.users = users;
                    model.userCount = model.users.length;

                })
        }

        function getQuestionList() {
            questionService
                .getQuestions()
                .then(function (questions) {
                    model.questions = questions;
                    console.log(model.questions)
                    model.questionCount = model.questions.length;
                })
        }

        function getAnswerCount() {
            answerService
                .getCount()
                .then(function (count) {
                    model.answerCount = count;
                })
        }

        function init() {

            getCategoryList();
            getUserList();
            getQuestionList();
            getAnswerCount();


        }

        init();


}

})();