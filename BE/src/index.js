const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Cung cấp tùy chọn extended
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Cung cấp tùy chọn extended
app.use(cookieParser());

routes(app);

mongoose.set('strictQuery', false); // Đặt strictQuery rõ ràng
mongoose.connect(`${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

app.listen(port, () => {
    console.log('Server is running in port: ', port); // Bỏ dấu + thừa
});
