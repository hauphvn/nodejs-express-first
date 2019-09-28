const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const userRouter = require('./routes/user.route');
const db = require('./db');

app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//Location public file
app.use(express.static('public'));

app.get('/',function (req, res) {
    res.render('index')
});

app.use('/users', userRouter);

app.listen(port, function(){
    console.log("Server listening on port "+port);
});