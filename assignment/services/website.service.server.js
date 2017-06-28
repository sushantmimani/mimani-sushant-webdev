/**
 * Created by sushantmimani on 6/26/17.
 */

var app = require('../../express');

app.post ('/api/user/:userId/website',createWebsite );
app.get ('/api/user/:userId/website',findAllWebsitesForUser);
app.get ('/api/website/:websiteId', findWebsiteById);
app.put  ('/api/website/:websiteId', updateWebsite);
app.delete ('/api/website/:websiteId', deleteWebsite);



var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findAllWebsitesForUser(req, res) {

    var userId = req.params.userId;
    var websiteList = [];
    for (var index in websites) {
        if (websites[index].developerId === userId) {
            websiteList.push(websites[index]);
        }
    }
    res.status(200).json(websiteList);

}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    for(var u in websites) {
        if(websiteId === websites[u]._id) {
            websites[u] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(websites);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    for(var u in websites) {
        if (websites[u]._id === websiteId) {
            res.status(200).json(websites[u]);
            return;
        }
    }
    res.sendStatus(404);
}


