const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department');

// GET all departments
router.get('/', departmentController.getAllDepartments);

// GET department by ID
router.get('/:id', departmentController.getDepartmentById);

// CREATE new department
router.post('/', departmentController.createDepartment);

// UPDATE department by ID
router.put('/:id', departmentController.updateDepartmentById);

// DELETE department by ID
router.delete('/:id', departmentController.deleteDepartmentById);

module.exports = router;
