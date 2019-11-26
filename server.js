const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const connection = mongoose.connection;

app.use(cors());
app.use(express.json());

mongoose.connect(uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});