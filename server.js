const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { readdirSync } = require('fs')
require('dotenv').config()

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(
    console.log('DB running')
)

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit : '50mb'}))
app.use(cors())


readdirSync('./routes').map((r) =>  app.use('/api', require("./routes/"+ r)))

const port = process.env.PORT || 8000;


// Listener
app.listen(port, () => {
    console.log(`listnening on localhost: ${port}`)
})