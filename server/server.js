const express = require("express");
const app = express();
const cors = require("cors");


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname+'/.env'});
}

// require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/question"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

// all your routes should go here
app.use('/some-route', require(path.join(__dirname, 'api', 'routes', 'question.js')))

// static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  })
}
