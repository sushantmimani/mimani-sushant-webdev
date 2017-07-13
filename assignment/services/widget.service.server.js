/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post ('/api/page/:pageId/widget',createWidget );
app.get ('/api/page/:pageId/widget',findAllWidgetsForPage);
app.get ('/api/widget/:widgetId', findWidgetById);
app.put  ('/api/widget/:widgetId', updateWidget);
app.delete ('/api/widget/:widgetId', deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put ("/page/:pageId/widget", sortWidgets)



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


function sortWidgets(req, res) {
    var initial = req.query.initial;
    var final = req.query.final;
    var pageId = req.params.pageId;
    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (widgets) {
            // var widget = widgets.splice(oldIndex,1)[0];
            // widgets.splice(newIndex,0, widget);
            res.json(widgets);

        })

}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = findWidgetById(widgetId);

    function findWidgetById(widgetId) {
        for(var u in widgets) {
            if (widgets[u]._id === widgetId) {
                return widgets[u];
            }
        }
        return null;
    }

    if(widget === null){
        widget = { "_id": new Date().getTime() + "", "widgetType": "IMAGE", "pageId": pageId, "width": width};
        widget.url = '/uploads/'+filename;
        widgets.push(widget)
        console.log(widgets);
    }
    else {
        widget.url = '/uploads/'+filename;
        widget.width = width;
    }


    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

    res.redirect(callbackUrl);
}

function findAllWidgetsForPage(req, res) {

    var pageId = req.params.pageId;
   widgetModel
       .findAllWidgetsForPage(pageId)
       .then(function (widgetList) {
           res.status(200).json(widgetList);
       })

}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    return widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            var pageId = widget._page;
            return widgetModel
                .deleteWidget(widgetId, pageId)
                .then(function (status) {
                    res.sendStatus(200).json(status);
                })
        });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.status(200).json(status);
        })
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.status(200).json(widget);

        })
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.status(200).json(widget);
        })
}


