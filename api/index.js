const express = require('express');
const app = express();

app.get('/echo/:what', (req, res) => {
  res.json(req.params);
});

module.exports = {
  path: '/api',
  handler: app
};
