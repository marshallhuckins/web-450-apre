/**
 * Title: year.js
 * Author: Marshall Huckins
 * Date:   22 June 2025
 * Desc:   Returns count of customerFeedback docs per year
 */

'use strict';

const express = require('express');
// fix path: from src/routes/reports/... back up to src/utils/mongo.js
const { mongo } = require('../../../utils/mongo');
const router = express.Router();

/**
 * GET /year
 *
 * Response:
 * [
 *   { year: 2022, feedbackCount: 125 },
 *   { year: 2023, feedbackCount: 171 },
 *   …
 * ]
 */
router.get('/', (req, res, next) => {
  try {
    mongo(async db => {
      const results = await db
        .collection('customerFeedback')
        .aggregate([
          // turn the string date into a Date object
          {
            $addFields: {
              _date: { $toDate: '$date' }
            }
          },
          // group all docs by the year number, counting one per doc
          {
            $group: {
              _id: { $year: '$_date' },
              count: { $sum: 1 }
            }
          },
          // shape output
          {
            $project: {
              _id: 0,
              year: '$_id',
              feedbackCount: '$count'
            }
          },
          // sort ascending by year
          { $sort: { year: 1 } }
        ])
        .toArray();

      res.send(results);
    }, next);
  } catch (err) {
    console.error('Error in /year aggregation:', err);
    next(err);
  }
});

module.exports = router;
