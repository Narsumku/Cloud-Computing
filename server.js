const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./src/users/user.router');
const speakRouter = require('./src/model/speak.router');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', userRouter); // Menggunakan userRouter untuk route '/'
app.use('/', speakRouter); // Menggunakan speakRouter untuk route '/'

// Example route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
