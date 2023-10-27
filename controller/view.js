const departmentModel = require("../models/department");
const employeeModel = require('../models/employee');

const getHomePage = (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
}

const getEmployeePage = (req, res) => {
    let employees = employeeModel.find({});    
    let departments = departmentModel.find({});
    res.render('employees', { title: 'Employees', message: 'Employees page', employees: employees, departments: departments});
}

const getUpdateEmployeePage = (req, res) => {
    employeeModel.findOne({_id: req.params.id}).populate('department').exec().then(result => {
        res.render('updateEmployee', { title: 'Update Employee', message: 'Update Employee page', employee: result, departments: departments});
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

const getDepartmentPage = (req, res) => {
    let departments = departmentModel.find({});
    res.render('departments', { title: 'Department', message: 'Department page', departments: departments});
}

module.exports = {
    getHomePage,
    getEmployeePage,
    getDepartmentPage,
    getUpdateEmployeePage,
}