const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./config/dbConnect');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is active at : ${PORT}`);
})