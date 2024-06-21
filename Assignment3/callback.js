const express = require('express');
const fs = require('fs');
const app = express();

app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
