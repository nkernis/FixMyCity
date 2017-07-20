const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const twit = require('twit');

mongoose.connect('mongodb://localhost:27017/fixmycitydb')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  next()
})

const Issue = require('./models/Issue')

const Twitter = new twit({
  consumer_key: process.env.TWIT_CK,
  consumer_secret: process.env.TWIT_CS,
  access_token: process.env.TWIT_AT,
  access_token_secret: process.env.TWIT_ATS,
  timeout_ms: 60000,  // optional HTTP request timeout to apply to all requests.
})

// ----------> END CONNECTIONS TWIITER API <----------
var cat, dog
Twitter.get('search/tweets', { q: '#FixMyCity', count: 1 }, function(err, data, response) {
  cat = [data, data.statuses[0].user]
})
// ----------> END CONNECTIONS TWIITER API <----------

// ----------> API ROUTES <----------
// Home/Root Page

app.get('/', (req, res) => {
  res.json(cat)
})


// GET Issues
app.get('/api/v1/issues', (req, res) => {
  Issue.find((err, issues) => {
    if (err) {
      throw err
    } else {
      res.json(issues)
    }
  })
})

//  404 Error
app.use((req, res) => {
  var err = new Error('Not Found')
  err.status = 404
  res.json(err)
})
// ----------> END API ROUTES <----------

// Start Server
app.listen(3000, () => {
  console.log('Server started on port 3000...')
})







// NOTE: These are routes for later

// // POST Book
// app.post('/api/v1/issues/new', (req, res) => {
//   let book = req.body
//
//   Book.create(book, (err, newBook) => {
//     if (err) {
//       throw err
//     } else {
//       Book.find((err, books) => {
//         if (err) {
//           throw err
//         } else {
//           res.json(books)
//         }
//       })
//     }
//   })
// })
//
// // DELETE Book
// app.delete('/api/v1/books/delete', (req, res) => {
//   let bookID = req.body.id
//
//   Book.remove({_id: bookID}, (err) => {
//     if (err) {
//       throw err
//     } else {
//       Book.find((err, books) => {
//         if (err) {
//           throw err
//         } else {
//           res.json(books)
//         }
//       })
//     }
//   })
// })
