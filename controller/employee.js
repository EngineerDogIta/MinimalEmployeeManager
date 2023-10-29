const employeeDao = require('../dao/employee');
const employeeModel = require('../models/employee');
const logger = require('../helpers/logger');

// Define the getAllEmployees function 
const getAllEmployees = async (req, res) => {
    employeeDao.getAllEmployees.then(result => {
        logger.debug("/api/ All employees found");
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

// Define the getEmployeeById function 
const getEmployeeById = async (req, res) => {
    employeeDao.getEmployeeById(req.params.id).then(result => {
        logger.debug("/api/ Employee " + req.params.id + " found");
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

// Define the createEmployee function 
const createEmployee = async (req, res) => {
    const employee = new employeeModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
    });

    employeeDao.createEmployee(employee).then(result => {
        logger.debug("/api/ Employee " + result._id + " created");
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

// Define the updateEmployeeById function 
const updateEmployeeById = async (req, res) => {
    employeeDao.updateEmployeeById(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
        }
    )
    .then(result => {
        log("/api/ Employee " + req.params.id + " updated");
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

// Define the deleteEmployeeById function 
const deleteEmployeeById = async (req, res) => {
    employeeDao.deleteEmployeeById(req.params.id).then(result => {
        logger.debug("/api/ Employee " + req.params.id + " deleted");
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById
};