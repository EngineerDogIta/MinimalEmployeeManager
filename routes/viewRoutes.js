const express = require('express');
const router = express.Router();
const viewController = require('../controller/view')

// Home page
router.get('/', viewController.getHomePage);

// Employees page
router.get('/employees', viewController.getEmployeesPage);

// Create employee page
router.get('/employee/create', viewController.getCreateEmployeePage);

// Redirect from Create employee page
router.post('/employee/create/redirect', viewController.getCreateEmployeeRedirectPage);

// Redirect from Create employee page
router.post('/employee/update/redirect', viewController.getUpdateEmployeeRedirectPage);

// Redirect from Create employee page to delete
router.post('/employee/delete/redirect', viewController.getDeleteEmployeeRedirectPage);

// Create employee page
router.get('/employee/update/:id', viewController.getUpdateEmployeePage);


// Departments page
router.get('/departments', viewController.getDepartmentsPage);

// Create department page
router.get('/department/create', viewController.getCreateDepartmentPage);

// Redirect from Create department page
router.post('/department/create/redirect', viewController.getCreateDepartmentRedirectPage);

// Redirect from Update department page
router.post('/department/update/redirect', viewController.getUpdateDepartmentRedirectPage);

// Redirect from Update department page to delete
router.post('/department/delete/redirect', viewController.getDeleteDepartmentRedirectPage);

// Update department page
router.get('/department/update/:id', viewController.getUpdateDepartmentPage);

module.exports = router;
