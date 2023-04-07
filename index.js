const express = require('express')
const app = express()

const post = require('./src/posts/post.model')

app.get("/", function(req, res) {
    return res.json(req.headers);
});

app.get("/api/v1/posts", function(req, res) {
    return res.json([posts]);
});

app.listen(3000, function() {
    console.log('E-Shopping listening on port 3000');
});