/**
 * Created by sushantmimani on 6/16/17.
 */


(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgets = ["Heading", "Image", "YouTube", "HTML", "Text"]
        model.createWidget = createWidget;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.selectType = selectType;


        function selectType(type) {
            model.widgetType = type.toUpperCase();
        }
        function getWidgetUrlForType(type) {
            model.hideSearch = true;
            return 'views/widget/templates/editors/widget-'+type.toLowerCase()+'-edit.view.client.html';
        }

        function createWidget(widget, type){
            if(widget){
                if(type === "IMAGE" || type === "YOUTUBE") {
                    if(!widget["url"]) {
                        model.message = "Enter URL";
                        return;
                    }
                }
                widget.widgetType = type
                widget['pageId'] = model.pageId;
                widgetService
                    .createWidget(widget, model.pageId)
                    .then(function (response) {
                        $location.url('/profile/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                    })

            }
            else {
                model.message = "Enter widget details";

            }

        }
    }
})();
