const express = require('express');
const app = express();
const port = 3000;

//lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
    .write();

var bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get('/',function (req, res) {
    res.render('index',{
        name:'aaa'
    });
});

app.get('/users',function (req, res) {
    res.render('users/index',{
        users:db.get('users').value()
    });
});

app.get('/users/search', function (req, res) {
    let q = req.query.name;
    let matchedUser = db.get('users').value().filter(function (item) {
        return item.name.toLowerCase().indexOf((q.toLowerCase())) !== -1;
    });
    res.render('users/index',{
        users:matchedUser
    });

});

app.post('/users/create',function (req, res) {
    let theName = req.body.name;
    let thePhone = req.body.phone;
    let user = {
        // id: users.length + 1,
        name: theName,
        phone: thePhone
    };
    db.get('users').push(user).write();
    res.redirect('/users');
});

app.get('/users/create',function (req, res) {
    res.render('users/create');
});

app.listen(port, function(){
    console.log("Server listening on port "+port);
});