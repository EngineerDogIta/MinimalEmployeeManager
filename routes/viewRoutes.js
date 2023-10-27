const express = require('express');
const router = express.Router();
const viewController = require('../controller/view')

// Home page
router.get('/', viewController.getHomePage);

// Employees page
router.get('/employees', viewController.getEmployeePage);

// Update employee page
router.get('/employees/:id', viewController.getUpdateEmployeePage);

// Department page
router.get('/departments', viewController.getDepartmentPage);

module.exports = router;
