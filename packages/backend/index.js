const express = require('express');
const cors = require('cors');
const dotenv =  require('dotenv');
const app = express();
const user = require('./route/user.js');

dotenv.config();

app.use(express.json());

app.use(cors());

app.use('/', user);

app.listen(3001, () => {
  console.log('Backend started at port 3001');
});
