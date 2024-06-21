const express = require('express');
const fs = require('fs');
const app = express();

function readFileAsync(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

app.get('/data', async (req, res) => {
  try {
    const data = await readFileAsync('data.json', 'utf8');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error reading file');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
