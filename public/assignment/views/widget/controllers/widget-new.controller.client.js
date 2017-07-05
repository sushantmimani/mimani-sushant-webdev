/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createWidget = createWidget;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.isSelected = isSelected;
        model.widget = {};
        model.selected = false;

        function isSelected(type) {
            if( typeof type == "string" && type !=='')
                return true;
            else
                return false;

        }
        function getWidgetUrlForType(type) {
            model.selected = true;
            return 'views/widget/templates/editors/widget-'+type.toLowerCase()+'-edit.view.client.html';
        }

        function createWidget(widget, type){
            widget.widgetType = type
            widget['pageId'] = model.pageId;
            widgetService
                .createWidget(widget, model.pageId)
                .then(function (response) {
                    console.log(response)
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })
        };

    }
})();