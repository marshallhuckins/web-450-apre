const express = require('express');
const router = express.Router();

// Sample in-memory data
const salesByCategory = [
  { category: 'Electronics', total: 12500 },
  { category: 'Furniture',   total:  8400 },
  { category: 'Clothing',    total:  6100 }
];

// GET /api/sales/category
router.get('/category', (req, res) => {
  res.json(salesByCategory);
});

module.exports = router;

module.exports.salesByCategory = salesByCategory;