const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const morgan = require('morgan');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

//app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

//const elPath = path.join(__dirname, '..', '/uploads')
console.log("DIRNAME: " + __dirname)

//app.use(express.static(elPath));
//app.use('/uploads', express.static(elPath))

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  //app.use(express.static("client/build"));
  const pathProd = path.join(__dirname, '../client/build');
  console.log("PATH PRODUCCIÓN: ", pathProd);
  app.use(express.static(pathProd));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const port = process.env.PORT || process.env.PORT_BACKEND;

const server = app.listen(port, () => {
  console.log(`Server Running at ${port}, entorno: ${process.env.NODE_ENV}`)
});

// console.log(new Date().toISOString().slice(0, -1) + "-04:00")
// console.log(new Date(+ Date.now() + 900000000).toISOString())
