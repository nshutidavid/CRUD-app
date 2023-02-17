const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require("path");

const connectDB=require("./server/database/connection");

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log requests (morgan module)
app.use(morgan('tiny'));

// Set Database
// mongoose.set('strictQuery', false);
connectDB();

//parser requests to bodyparser
app.use(bodyparser.urlencoded({extended: true}))

// Set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname, "views/ejs")) (when you create templates inside a folder in views)



//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css"))) // css/style.css
app.use("/img", express.static(path.resolve(__dirname, "assets/img"))) //
app.use("/js", express.static(path.resolve(__dirname, "assets/js"))) //


//load routers
app.use("/", require('./server/routes/router'))


app.listen(PORT, function(){
  console.log(`Server is running on http://localhost:${PORT}`);
})
