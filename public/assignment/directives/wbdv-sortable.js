(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {

        function linkFunction(scope, element) {
            console.log(element);
            $(element).sortable();
        }

        return {
            link: linkFunction
        }
    }

})();