const express = require('express');
const app = express();
const port = 3000;

app.get('/',function (req, res) {
    res.send("<h1>Hello guy's</h1> <p>Click <a href='/user'>here</a> to user page</p>");
});

app.get('/user',function (req, res) {
    res.send("<h2>List user</h2>");
});

app.listen(port, function(){
    console.log("Server listening on port "+port);
});