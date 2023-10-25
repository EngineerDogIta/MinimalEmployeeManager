const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee');

// GET all employees
router.get('/', employeeController.getAllEmployees);

// GET employee by ID
router.get('/:id', employeeController.getEmployeeById);

// CREATE new employee
router.post('/', employeeController.createEmployee);

// UPDATE employee by ID
router.put('/:id', employeeController.updateEmployeeById);

// DELETE employee by ID
router.delete('/:id', employeeController.deleteEmployeeById);

module.exports = router;
