const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee');

// Home page
router.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
})

// Employees page
router.get('/employees', (req, res) => {
    res.render('employees', { title: 'Employees', message: 'Employees page' });
})
// Department page
router.get('/departments', (req, res) => {
    res.render('departments', { title: 'Departments', message: 'Departments page' });
})

module.exports = router;
