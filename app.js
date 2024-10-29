require('dotenv').config()
require('express-async-errors');
const express = require('express');
const app = express();
const stripeController = require('./controllers/stripeController')

// DB
const connectDB = require('./DB/connection');

// express middleware
app.use(express.json())
app.use(express.static('./public'))

// custom middleware
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

app.post('/stripe', stripeController);

// error middleware
app.use(errorHandler);
app.use(notFound);


const port = process.env.PORT || 3000


const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`app is listening at port no ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}



start();