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


function sortWidgets(req, res) {
    var initial = req.query.initial;
    var final = req.query.final;
    var pageId = req.params.pageId;
    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (widgets) {
            res.json(widgets);

        })

}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

    if (widgetId) {
        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = '/uploads/' + filename;
                widget.width = width;
                widgetModel
                    .updateWidget(widgetId, widget)
                    .then(function (status) {
                        res.redirect(callbackUrl);
                    })
            })
    }
    else {
        widget = {"widgetType": "IMAGE", "pageId": pageId, "width": width};
        widget.url = '/uploads/' + filename;
        widgetModel
            .createWidget(pageId, widget)
            .then(function (status) {
                res.redirect(callbackUrl)
            })

    }
}

function findAllWidgetsForPage(req, res) {

    var pageId = req.params.pageId;
   widgetModel
       .findAllWidgetsForPage(pageId)
       .then(function (pageDetails) {
           res.status(200).json(pageDetails.widgets);
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


