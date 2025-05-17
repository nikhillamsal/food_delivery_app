const express = require('express');
const mongoDb = require('./db');
const app = express();
const port = 5000;
mongoDb();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});