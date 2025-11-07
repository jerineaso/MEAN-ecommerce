// Required
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieparser = require("cookie-parser");
const compression = require('compression')
const errorHandler = require('./middlewares/errorHandler');
const { dbConnet, migrate } = require('./config/db');
const productRoute = require('./routes/product.routes');
const userRoute = require('./routes/user.routes');
const imgUpload = require('./utlities/imgUpload');

// Config
require('dotenv').config();

// Initializations
const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(express.json()); // For PUT, POST
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'https://mean-ecommerce-qjux.onrender.com',
//     credentials: true,
//     optionsSuccessStatus: 200
// }));
app.options(cors());
app.use(cookieparser())

app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);

// Utility route
app.route('/api/v1/util/upload').post(imgUpload);

app.get('/',(req, res)=>{
    res.send('Welcome Home!!')
})

// Error handler should be after all routes
app.use(errorHandler)

app.listen(PORT, (error) =>{
    if(!error){
        dbConnet();
        // migrate();
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    }else 
        console.log("Error occurred, server can't start", error);
    }
);