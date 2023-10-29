const logger = require('../helpers/logger');
const employeeModel = require('../models/employee');

/** Use the employeeModel to find all employees, make a promise function */
const getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        logger.debug('getAllEmployees');
        employeeModel.find({}).populate('department').exec().then(result => {
            logger.debug('getAllEmployees - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('getAllEmployees - err: ' + err);
            reject(err);
        });
    });
};

/** Use the employeeModel to find an employee by id, make a promise function */
const getEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        logger.debug('getEmployeeById - id: ' + id);
        employeeModel.findById(id).populate('department').exec().then(result => {
            logger.debug('getEmployeeById - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('getEmployeeById - err: ' + err);
            reject(err);
        });
    });
};

/** Use the employeeModel to create a new employee, make a promise function */
const createEmployee = (argEmployee) => {
    return new Promise((resolve, reject) => {
        logger.debug('createEmployee - argEmployee: ' + JSON.stringify(argEmployee));
        const newEmployee = new employeeModel({
            firstName: argEmployee.firstName,
            lastName: argEmployee.lastName,
            department: argEmployee.department,
        });
        logger.debug('createEmployee - newEmployee: ' + JSON.stringify(newEmployee));

        newEmployee.save().then(result => {
            logger.debug('createEmployee - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('createEmployee - err: ' + err);
            reject(err);
        });
    });
};

/**
 * Returns a promise that resolves to the updated employee.
 * uses findByIdAndUpdate to update the employee.
 * @param {import('mongoose').ObjectId} id 
 * @param {employeeModel} employee 
 * @returns 
 */
const updateEmployeeById = (id, updateEmployee) => {
    return new Promise((resolve, reject) => {
        logger.debug('updateEmployeeById - id: ' + id);
        logger.debug('updateEmployeeById - updateEmployee: ' + JSON.stringify(updateEmployee));

        employeeModel.findByIdAndUpdate(
            id,
            {
                firstName: updateEmployee.firstName,
                lastName: updateEmployee.lastName,
                department: updateEmployee.department,
            },
            { new: true }
        )
        .exec()
        .then(result => {
            logger.debug('updateEmployeeById - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('updateEmployeeById - err: ' + err);
            reject(err);
        });
    });
};

const deleteEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        logger.debug('deleteEmployeeById - id: ' + id);
        employeeModel.findByIdAndDelete(id).exec().then(result => {
            logger.debug('deleteEmployeeById - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('deleteEmployeeById - err: ' + err);
            reject(err);
        });
    });
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById,
};