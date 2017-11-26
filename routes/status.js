const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 200, message: "ok", environment: process.env.NODE_ENV }, null, 2));
})

module.exports = router;