const logger = require('../helpers/logger');
const departmentModel = require('../models/department');
const employeeDao = require('./employee');

/** Use the departmentModel to find all departments, make a promise function */
const getAllDepartments = () => {
    return new Promise((resolve, reject) => {
        departmentModel.find({}).populate('employeesCount').exec().then(result => {
            logger.debug('getAllDepartments - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('getAllDepartments - err: ' + err)
            reject(err);
        });
    });
};

/** Use the departmentModel to find a department by id, make a promise function */
const getDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        departmentModel.findById(id).populate('employees', 'firstname lastname').exec().then(result => {
            logger.debug('getDepartmentById - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('getDepartmentById - err: ' + err);
            reject(err);
        });
    });
};

/** Use the departmentModel to create a new department, make a promise function */
const createDepartment = (department) => {
    return new Promise((resolve, reject) => {
        const newDepartment = new departmentModel({
            name: department.name,
            employees: department.employees
        });

        newDepartment.save().then(result => {
            logger.debug('createDepartment - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('createDepartment - err: ' + err);
            reject(err);
        });
    });
};

/** Use the departmentModel to update a department by id, make a promise function */
const updateDepartmentById = (id, department) => {
    return new Promise((resolve, reject) => {
        departmentModel.findByIdAndUpdate(
            id,
            {
                name: department.name
            },
            { new: true }
        )
        .exec()
        .then(result => {
            logger.debug('updateDepartmentById - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('updateDepartmentById - err: ' + err);
            reject(err);
        });
    });
};

/** Use the departmentModel to delete a department by id, make a promise function */
const deleteDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        departmentModel.findByIdAndDelete(id).exec().then(result => {
            logger.info('Deleted department with id: ' + id);
            logger.debug('deleteDepartmentById - result: ' + JSON.stringify(result));
            resolve(result);
        }).catch(err => {
            logger.error('deleteDepartmentById - err: ' + err);
            reject(err);
        });
    });
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartmentById,
    deleteDepartmentById,
};
