const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Use the student routes
app.use('/api', studentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
