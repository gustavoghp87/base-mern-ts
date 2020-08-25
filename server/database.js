const mongoose = require("mongoose");
const config = require("./config/key");


const connect = mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
  useCreateIndex:true
})
  .then(() => console.log('MongoDB conectado...', config.mongoURI))
  .catch(err => console.log(err));
