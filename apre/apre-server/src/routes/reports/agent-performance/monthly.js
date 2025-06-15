/**
 * Author: Marshall Huckins
 * Date:   11 June 2025
 * File:   monthly.js
 * Description: Returns average performanceMetrics.value per month
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');
const router = express.Router();

/**
 * GET /monthly
 *
 * Responds with an array of documents:
 * [ { month: "2023-01", averagePerformance: 80.0 }, ... ]
 */
router.get('/', (req, res, next) => {
  try {
    mongo(async db => {
      const results = await db
        .collection('agentPerformance')
        .aggregate([
          // 1) unwind the performanceMetrics array
          { $unwind: '$performanceMetrics' },
          // 2) group by year-month of the Date field
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
              avgPerf: { $avg: '$performanceMetrics.value' }
            }
          },
          // 3) project into the desired shape
          {
            $project: {
              _id: 0,
              month: '$_id',
              averagePerformance: { $round: ['$avgPerf', 2] }
            }
          },
          // 4) sort chronologically
          { $sort: { month: 1 } }
        ])
        .toArray();

      res.send(results);
    }, next);
  } catch (err) {
    console.error('Error in /monthly:', err);
    next(err);
  }
});

module.exports = router;
