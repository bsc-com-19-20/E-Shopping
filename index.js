const express = require('express')
const app = express()
const dbconnection = require('./src/utils/mysql.connector');
const bodyParser = require('body-parser');


const post = require('./src/posts/post.model')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res) {
    return res.json(req.headers);
});

app.get("/api/v1/posts", function(req, res) {
    let sql = "SELECT * FROM posts";
    return dbconnection.query(sql, function(err,results){
        if (err) throw err;
        return res.json(results);
    })
    //return res.json([posts]);
})

app.post("/api/v1/posts",(req, res) => {
    console.log(req.body);
    const { name, imageUrl, summary} = req.body;
    let sql = ` INSERT INTO posts (name, imageUrl, summary) VALUES ('${name}', '${imageUrl}', '${summary}')`;
    dbconnection.query(sql, (err, res) => {
        if (err) throw err;
        console.log("1 insert recorded")
    })
})

app.listen(3000, function() {
    console.log('E-Shopping listening on port 3000');
   // let sql = "INSERT INTO posts(name, imageUrl, summary) VALUES ('Ben', 'Rhille', 'Czyrhille')"
    //dbconnection.query(sql, function(err){
      //  if (err) throw err;
        //console.log(" 1 insert recorded");
   // })
   dbconnection.connect(function(error){
        if (error) throw error

        console.log("Connect to MySQL");
    });
});