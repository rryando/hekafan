const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// var mongoose = require('mongoose');
var Post = require("../models/post.js");

// postgresql

const pg = require('pg')
const pool = new pg.Client({
  user: 'cfxrtcuxhtfahm',
  host: 'ec2-54-83-17-151.compute-1.amazonaws.com',
  database: 'dc3p15l98nc4h2',
  password: '45f5a43e7909fc4be20af8e3dec6b5ca23e340d305728f7eadd8a100c40b7e10',
  port: 5432,
  ssl: true,
})

pool.connect()

// mongoose.connect('mongodb://localhost:27017/posts');
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function(callback){
//   console.log("Connection Succeeded");
// });

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts
    })
  }).sort({_id:-1})
})


// Add new post
// app.post('/posts', (req, res) => {
//   var db = req.db;
//   var title = req.body.title;
//   var description = req.body.description;
//   var new_post = new Post({
//     title: title,
//     description: description
//   })

//   new_post.save(function (error) {
//     if (error) {
//       console.log(error)
//     }
//     res.send({
//       success: true,
//       message: 'Post saved successfully!'
//     })
//   })
// })

// SELECT *
// FROM items
// LIMIT {itemsPerPage} OFFSET {(page - 1) * itemsPerPage}

app.get('/tweet', (req, res) => {
  console.log('params: ', req.current)
  pool.query('SELECT * FROM twitter LIMIT 20 OFFSET 1', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.listen(process.env.PORT || 8081)