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

app.patch('/api/v1/posts/:id', function(request, response) {
    //console.log(request.params)
   const sql = `SELECT * FROM posts WHERE id = ${request.params.id} LIMIT 1`

    return dbconnection.query(sql, function(err,rows){
        if (err) throw err
 
        const post = request.body
        console.log(Object.entries(post))

      if (rows.length >= 1) {
            let props = ''

            
           props = Object.keys(post).map((key, index)=>{
                //console.log(key)
                //console.log(Object.values(post).at(index))
                return props += `${[key]}='${Object.values(post).at(index)}',`
           })
        //   console.log(props[props.length-1].slice(0, -1))

           const updateSql = `UPDATE posts SET ${props[props.length-1].slice(0, -1)} WHERE id = ${rows[0].id}`
           console.log(updateSql) 
        return dbconnection.query(updateSql, function(err,result){
            return response.json(rows[0]) //(rows[0])
        })
        } else {
            return response.status(404).json({
                status: false,
                statusCode: 404,
                message:`post with id ${request.params.id} does not exist`
        })
    }
        //return response.json(result)
    })
})

Router.delete("/api/v1/posts/:id", async(req, res) => {
    const {id} = req.params;
    try{
    const post = await postRepository.findOneBy({ id});
    const result = await postRepository.remove(post);
    if (result) {
        return res.status(200).json({
            status: true,
            statusCode: 200,
            data: result,
        });
    }else{
        return res.status(200).json({
            status: true,
            statusCode: 404,
            message: `Post with id ${id} does not exist`,
        });
    }
} catch (err) {
    throw err;
}
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
