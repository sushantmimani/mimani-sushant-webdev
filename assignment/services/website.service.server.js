/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.post ('/api/user/:userId/website',createWebsite );
app.get ('/api/user/:userId/website',findAllWebsitesForUser);
app.get ('/api/website/:websiteId', findWebsiteById);
app.put  ('/api/website/:websiteId', updateWebsite);
app.delete ('/api/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req, res) {

    var userId = req.params.userId;
    return websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websiteList) {
            res.status(200).json(websiteList);
        });

}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var userId = website._user;
            return websiteModel
            .deleteWebsite(userId, websiteId)
                .then(function (status) {
                    res.sendStatus(200).json(status);
                })
        });

}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    return websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(200).jsonstatus;
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = website.developerId;
    websiteModel
        .createWebsiteForUser(userId,website)
        .then(function (doc) {
            res.json(doc);
        })
};

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (status) {
            res.status(200).json(status);
        });
}




