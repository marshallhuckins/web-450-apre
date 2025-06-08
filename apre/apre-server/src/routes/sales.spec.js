'use strict';

const request = require('supertest');
const app = require('../../src/app');
const { salesByCategory } = require('../../src/routes/sales');
const originalData = [...salesByCategory];
const express = require('express');
const { errorHandler } = require('../../src/utils/error-handler');

describe('GET /api/sales/category', () => {
  it('should return sales by category with status 200', async () => {
    const response = await request(app).get('/api/sales/category');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // At least our sample data should be present
    expect(response.body.length).toBeGreaterThan(0);
    // And each item should have category and total
    response.body.forEach(item => {
      expect(item).toEqual(
        expect.objectContaining({
          category: expect.any(String),
          total: expect.any(Number)
        })
      );
    });
  });

  it('should return an empty array when no sales exist', async () => {
    // clear out the in-memory data
    salesByCategory.length = 0;

    const response = await request(app).get('/api/sales/category');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);

    // restore the original data for other tests
    salesByCategory.push(...originalData);
  });

  it('should return 500 if the route handler throws an exception', async () => {
  // Create a fresh Express app
  const testApp = express();
  testApp.use(express.json());

  // Define a faulty sales endpoint that always errors
  testApp.get('/api/sales/category', (req, res, next) => {
    const err = new Error('Forced failure');
    err.status = 500;
    next(err);
  });

  // Use the global error handler
  testApp.use(errorHandler);

  // Invoke it
  const response = await request(testApp).get('/api/sales/category');
  expect(response.status).toBe(500);
  expect(response.body).toEqual(
    expect.objectContaining({
      type: 'error',
      status: 500,
      message: 'Forced failure'
    })
  );
});




});
