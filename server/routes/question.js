const express = require('express')

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router()

// This will help us connect to the database
const dbo = require('../db/conn')

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId

// This section will help you get a list of all questions
recordRoutes.route('/questions').get(function (req, res) {
  let db_connect = dbo.getDb('cse_trainer_db')
  db_connect
    .collection('questions')
    .find({})
    .sort({ dateModified: -1 })
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})

// This section will help you get a list of all the question group.
recordRoutes.route('/grouped-questions').get(function (req, res) {
  let db_connect = dbo.getDb('cse_trainer_db')
  db_connect
    .collection('grouped_questions')
    .find({})
    .sort({ dateModified: -1 })
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})

// the aggregation pipelines below
// has two stages, first it filters the documents by question type, and the second is
// randomly select documents on the filtered result at stage 1.
recordRoutes.route('/questions/get/:category/:questionCount').get(function (req, res) {
  let db_connect = dbo.getDb('cse_trainer_db')

  db_connect
    .collection('questions')
    .aggregate([
      {
        $match: { questionType: req.params.category }
      },
      {
        $sample: { size: parseInt(req.params.questionCount) }
      }
    ])
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})

recordRoutes.route('/question-groups/get/:category').get(function (req, res) {
  let db_connect = dbo.getDb('cse_trainer_db')

  db_connect
    .collection('grouped_questions')
    .aggregate([
      {
        $match: { questionType: req.params.category }
      }
    ])
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})

module.exports = recordRoutes
