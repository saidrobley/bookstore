require('dotenv').config();
const express = require('express');

const cors = require('cors');
const usersRoute = require('./routes/users');
const app = express();
// middleware
app.use(cors());
app.use(express.json());

// middlewares
app.use(cors());
app.use('/users', usersRoute);
app.use(express.json());

const port = process.env.PORT || 3004;
console.log(process.env.PORT);
console.log(port);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
