
const express = require('express');
const cors = require('cors');
require("dotenv").config();

const router = require('./routes/routes');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', allowedHeaders: '*' }));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// use npm --save to install dependencies 
// npm run start to run the server

