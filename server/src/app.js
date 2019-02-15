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
  const page = {...req.query}
  pool.query(`SELECT * FROM twitter LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/posts', (req, res) => {
  const page = {...req.query}
  pool.query(`SELECT * FROM facebooks, twitter, instagramss LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/fb', (req, res) => {
  const page = {...req.query}
  pool.query(`SELECT * FROM facebooks LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/twitter', (req, res) => {
  // console.log('params: ', req.query)
  const page = {...req.query}
  pool.query(`SELECT * FROM twitter LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.get('/ig', (req, res) => {
  // console.log('params: ', req.query)
  const page = {...req.query}
  pool.query(`SELECT * FROM instagramss LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

function getTweet(req, res, next) {
  const page = {...req.query}
  pool.query(`SELECT * FROM twitter LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    req.twitter = res.rows;
    next();
  })
}

function getIg(req, res, next) {
  const page = {...req.query}
  pool.query(`SELECT * FROM instagramss LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    req.instagram = res.rows;
    next();
  })
}

function getFb(req, res) {
  const page = {...req.query}
  console.log(req.instagram)
  
  pool.query(`SELECT * FROM facebooks LIMIT ${page.limit} OFFSET ${(page.current-1)*page.limit}`, (error, results) => {
    if (error) {
      throw error
    }
    req.facebook = res.rows;
  })
}

function renderData(req, res) {
  res.status(200).json({
    twitter: req.twitter,
    instagram: req.instagram,
    facebook: req.facebook
  })
}

app.get('/all', (req, res, next) => {
  // console.log('params: ', req.query)
  const page = {...req.query}
  // getFb(req,res)
  res.status(200).json({
    twitter: req.twitter,
    instagram: req.instagram,
    facebook: getFb(req,res)
  })
});

app.listen(process.env.PORT || 8081)