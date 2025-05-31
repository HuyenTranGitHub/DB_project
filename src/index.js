const express = require("express");
const dotenv = require('dotenv');
const routes = require('./route');
const sql = require('mssql');
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

const config = {
  user: 'SA',
  password: '123456aA@$',
  server: 'localhost',
  port: 14330,
  database: 'ticket',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function connectToDB() {
  try {
    await sql.connect(config);
    console.log('✅ Successful Connection to SQL Server');
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
  }
}

connectToDB();

routes(app);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log('Server is running on port:', port);
});
