const express = require('express');
const swaggerDocument = require('./swagger/swagger');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require('./src/routes/userRoute');
const swaggerUi = require('swagger-ui-express');

const app = express();
const uri = process.env.MONGO_URI

mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log(err);
    process.exit();
});
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


let port = 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});