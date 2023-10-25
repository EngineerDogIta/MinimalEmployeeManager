const express = require('express');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const viewRoutes = require('./routes/viewRoutes');
dotenv.config();
const connectDb = require('./config/db');

const app = express();

connectDb();
const port = process.env.NODE_LOCAL_PORT || 3020;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug')

app.use(express.static('public'))

app.use('/', viewRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
