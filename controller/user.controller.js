const db = require('../db');
//Generator id user
const shortid = require('shortid');

module.exports.index = function (req, res) {
    res.render('users/index',{
        users:db.get('users').value()
    });
};

module.exports.search = function (req, res) {
    let q = req.query.name;
    let matchedUser = db.get('users').value().filter(function (item) {
        return item.name.toLowerCase().indexOf((q.toLowerCase())) !== -1;
    });
    res.render('users/index',{
        users:matchedUser
    });

};

module.exports.create = function (req, res) {
    res.render('users/create');
};

module.exports.createById = function (req, res) {
    let theId = req.params.id;
    let user = db.get('users').find({id: theId}).value();
    res.render('users/view-detail',{
        users: user
    });
};

module.exports.postCreate = function (req, res) {
    let theName = req.body.name;
    let thePhone = req.body.phone;
    let user = {
        id: shortid.generate(),
        name: theName,
        phone: thePhone
    };
    db.get('users').push(user).write();
    res.redirect('/users');
};