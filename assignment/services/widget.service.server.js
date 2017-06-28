/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');

app.post ('/api/page/:pageId/widget',createWidget );
app.get ('/api/page/:pageId/widget',findAllWidgetsForPage);
app.get ('/api/widget/:widgetId', findWidgetById);
app.put  ('/api/widget/:widgetId', updateWidget);
app.delete ('/api/widget/:widgetId', deleteWidget);



var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://www.youtube.com/tnBQmEqBCY0" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function findAllWidgetsForPage(req, res) {

    var pageId = req.params.pageId;
    var widgetList = [];
    for (var index in widgets) {
        if (widgets[index].pageId === pageId) {
            widgetList.push(widgets[index]);
        }
    }
    res.status(200).json(widgetList);

}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for(var u in widgets) {
        if(widgetId === widgets[u]._id) {
            widgets[u] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.status(200).json(widgets);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    for(var u in widgets) {
        if (widgets[u]._id === widgetId) {
            res.status(200).json(widgets[u]);
            return;
        }
    }
    res.sendStatus(404);
}


