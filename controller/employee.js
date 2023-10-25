const employeeModel = require('../models/employee');

// Define the getAllEmployees function 
const getAllEmployees = async (req, res) => {
    employeeModel.find({}).populate('department').exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

// Define the getEmployeeById function 
const getEmployeeById = async (req, res) => {
    employeeModel.findById(req.params.id).populate('department').exec().then(result => {
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

    employee.save().then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

// Define the updateEmployeeById function 
const updateEmployeeById = async (req, res) => {
    employeeModel.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
        },
        { new: true }
    )
    .exec()
    .then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

// Define the deleteEmployeeById function 
const deleteEmployeeById = async (req, res) => {
    employeeModel.findByIdAndDelete(req.params.id).exec().then(result => {
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