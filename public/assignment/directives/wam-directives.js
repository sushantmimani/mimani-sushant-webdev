(function () {
    angular
        .module('wamDirectives', [])
        .directive('wamSortable', wamSortable)



    function wamSortable(widgetService, $routeParams) {

        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];
        var widgetId = $routeParams['widgetId'];

        function linkFunction(scope, element) {
            $(element).sortable({
                start: function (e, ui) {
                    // creates a temporary attribute on the element with the old index
                    $(this).attr('data-previndex', ui.item.index());
                },
                update: function (e, ui) {
                    // gets the new and old index then removes the temporary attribute
                    var newIndex = ui.item.index();
                    var oldIndex = $(this).attr('data-previndex');
                    $(this).removeAttr('data-previndex');
                    widgetService
                        .sortWidgets(pageId, oldIndex, newIndex)
                        .then(function (response) {
                        })
                }
            })
        }

        return {
            link: linkFunction
        }
    }

})();