const express = require('express');
require('dotenv').config();
const { dbConnect } = require('./config/dbConnect');
const authRouter = require('./routes/authRoutes');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/api/v1', authRouter);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is active at : ${PORT}`);
})