/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WebDevProject')
        .controller('adminController', adminController);

    function adminController ($location, userService, currentUser, $http, questionService, categoryService) {

        var model = this;
        model.questionToEdit = false;
        model.editCat = false;
        model.addCat = false;
        model.answerToEdit = false;
        model.user = currentUser;
        model.logout = logout;
        model.searchGoogle = searchGoogle;
        model.trustThisContent = trustThisContent;
        model.deleteCategory = deleteCategory;
        model.editCategory = editCategory;
        model.updateCategory = updateCategory;
        model.createCategory = createCategory;

        function createCategory(newCategory) {
            var category = {
                type: newCategory
            }
            categoryService
                .createCategory(category)
                .then(function (response) {
                    model.addCat = false;
                    init();
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

        function deleteCategory(category) {
            categoryService
                .deleteCategory(category)
                .then(function (response) {
                    init();
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
            $http.get("https://www.googleapis.com/customsearch/" +
                "v1?key=AIzaSyAxBWB1Vm6eIWK9VMYfQPr6ADuFwe4nRWE&cx=008911214601422826019:tjb4-7clba4&q="+text)
                .then(function (resp) {
                    model.result = resp.data.items;
                    console.log(model.result);
                })
        }



        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }


        function init() {

            $http.get('/api/project/category')
                .then(function (response) {
                    model.categories = response.data;
                })
            userService
                .getUsers()
                .then(function (users) {
                    model.users = users;
                })

            questionService
                .getQuestions()
                .then(function (questions) {
                    model.questions = questions;
                })

        }

        init();


}

})();