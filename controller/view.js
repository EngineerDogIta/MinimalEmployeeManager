const daoEmployee = require('../dao/employee');
const modelEmployee = require('../models/employee');
const daoDepartment = require('../dao/department');
const modelDepartment = require('../models/department');
const logger = require('../helpers/logger');

const getHomePage = (req, res) => {
    logger.debug('getHomePage');
    res.render('index', { title: 'Hey', message: 'Hello there!' });
}

const getEmployeesPage = (req, res) => {
    logger.debug('getEmployeesPage');
    daoEmployee.getAllEmployees().then(employees => {
        logger.debug("retreived employees from db ");
        if (employees.length == 0) {
            logger.debug("no employees found");
        } else {
            logger.debug(employees.length + " employees found");
        }
        res.render('employees', { title: 'Employees', message: 'Employees page', employees: employees});
    }).catch(err => {
        logger.error('getEmployeesPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
};

const getEmployeePage = (req, res) => {
    logger.debug('getEmployeePage');
    // TODO to create an employee page
    logger.debug('getEmployeePage - redirecting to update employee page');
    res.redirect('/employee/update/' + req.params.id);
};


/**
 * Renders the update employee page with the employee and department data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getUpdateEmployeePage = (req, res) => {
    daoEmployee.getEmployeeById(req.params.id).then(employee => {
        daoDepartment.getAllDepartments().then(departments => {
            // add a boolean to each department always false but there is only one department set to true
            let departmentsViewFixed = departments.map(department => {
                if (employee.department == null) {
                    employee.selected = false;
                } else {
                    department.selected = department._id.toString() === employee.department._id.toString();
                }
                return department;
            });
            logger.debug('added selected to departments: ' + JSON.stringify(departmentsViewFixed));
            res.render('editemployee', { title: 'Update Employee', message: 'Update Employee page', employee: employee, departments: departmentsViewFixed});
        }).catch(err => {
            logger.debug('getUpdateEmployeePage - err: ' + err);
            res.status(500).json({ message: err.message });
        });
    }).catch(err => {
        logger.error('getUpdateEmployeePage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
};

const getCreateEmployeePage = (req, res) => {
    logger.debug('getCreateEmployeePage');
    daoDepartment.getAllDepartments().then(departments => {
        logger.debug('getCreateEmployeePage - departments: ' + departments.length);
        res.render('editemployee', { title: 'Create Employee', message: 'Create Employee page', departments: departments});
    }).catch(err => {
        logger.error('getCreateEmployeePage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
}

const getDepartmentsPage = (req, res) => {
    logger.debug('getDepartmentsPage');
    daoDepartment.getAllDepartments().then(departments => {
        logger.debug('getDepartmentsPage - departments: ' + departments.length);
        res.render('departments', { title: 'Department', message: 'Department page', departments: departments});
    }).catch(err => {
        logger.error('getDepartmentsPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
};

const getDepartmentPage = (req, res) => {
    logger.debug('getDepartmentPage');
    // TODO to create a department page
    log('getDepartmentPage - redirecting to update department page');
    res.redirect('/department/update/' + req.params.id);
};

const getUpdateDepartmentPage = (req, res) => {
    logger.debug('getUpdateDepartmentPage');
    daoDepartment.getDepartmentById(req.params.id).then(department => {
        logger.debug('getUpdateDepartmentPage - department: ' + JSON.stringify(department));
        logger.debug('getUpdateDepartmentPage - department.employees: ' + department.employees.length);
        res.render('editdepartment', { title: 'Update Department', message: 'Update Department page', department: department });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};

const getUpdateDepartmentRedirectPage = (req, res) => {

    // First let's update the Department model
    let bodyObj = new modelDepartment({
        name: req.body.name
    });
    logger.debug('getUpdateDepartmentRedirectPage - bodyObj: ' + JSON.stringify(bodyObj));

    // use daoDepartment.updateDepartment
    daoDepartment.updateDepartmentById(req.body.id, bodyObj).then(result => {
        logger.debug('getUpdateDepartmentRedirectPage - req.body.employees: ' + JSON.stringify(req.body.employees));
        res.redirect('/department/update/' + req.body.id);
    }).catch(err => {
        logger.error('getUpdateDepartmentRedirectPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
};

/**
 * Redirects to the update employee page after updating the employee data in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getUpdateEmployeeRedirectPage = (req, res) => {
    // Sanitize the incoming data
    let employee = new modelEmployee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department == '' ? null : req.body.department,
    });

    logger.debug('getUpdateEmployeeRedirectPage - new_employee: ' + JSON.stringify(employee));

    // use daoEmployee.updateEmployee
    daoEmployee.updateEmployeeById(req.body.id, employee).then(result => {
        logger.debug('getUpdateEmployeeRedirectPage - result: ' + JSON.stringify(result));
        res.redirect('/employee/update/' + result._id);
    }).catch(err => {
        logger.error('getUpdateEmployeeRedirectPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
};

/**
 * Renders the create department page with a form to create a new department and a list of all employees.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
const getCreateDepartmentPage = (req, res) => {
    logger.debug('getCreateDepartmentPage');
    daoEmployee.getEmployeesNotHavingDepartment().then(employees => {
        logger.debug('getCreateDepartmentPage - employees: ' + employees.length);
        res.render('editdepartment', { title: 'Create Department', message: 'Create Department page', employees: employees});
    }).catch(err => {
        logger.error('getCreateDepartmentPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
};

/**
 * Redirects to the page for creating a new employee after sanitizing the incoming data
 * and creating the employee using daoEmployee.createEmployee.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getCreateEmployeeRedirectPage = (req, res) => {
    logger.debug('getCreateEmployeeRedirectPage');

    // Sanitize the incoming data
    let modelEmployee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department == '' ? null : req.body.department,
    };
    logger.debug('getCreateEmployeeRedirectPage - bodyObj: ' + JSON.stringify(modelEmployee));

    // use daoEmployee.createEmployee
    daoEmployee.createEmployee(modelEmployee).then(result => {
        logger.debug('getCreateEmployeeRedirectPage - result: ' + JSON.stringify(result));
        res.redirect('/employee/update/' + result._id);
    }).catch(err => {
        logger.error('getCreateEmployeeRedirectPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
}

const getCreateDepartmentRedirectPage = (req, res) => {
        logger.debug('getCreateDepartmentRedirectPage');

        // Sanitize the incoming data
        let bodyObj = {
            name: req.body.name
        };
        logger.debug('getCreateDepartmentRedirectPage - bodyObj: ' + JSON.stringify(bodyObj));

        // use daoDepartment.createDepartment
        daoDepartment.createDepartment(bodyObj).then(result => {
            logger.debug('getCreateDepartmentRedirectPage - result: ' + JSON.stringify(result));
            let departmentEmployees = req.body.employees ? req.body.employees : [];

            // use daoDepartment.updateDepartmentById
            let promises = departmentEmployees.map(employee => {
                return daoEmployee.updateEmployeeById(employee, { department: result._id });
            });

            Promise.all(promises).then(() => {
                logger.debug('getCreateDepartmentRedirectPage - promises done');
                res.redirect('/department/update/' + result._id);
            }).catch(err => {
                logger.error('getCreateDepartmentRedirectPage - err: ' + err);
                res.status(500).json({ message: err.message });
            });

            res.redirect('/department/update/' + result._id);
        }).catch(err => {
            logger.debug('getCreateDepartmentRedirectPage - err: ' + err);
            res.status(500).json({ message: err.message });
        });
};

const getDeleteEmployeeRedirectPage = (req, res) => {
    logger.debug('getDeleteEmployeeRedirectPage');
    daoEmployee.deleteEmployeeById(req.body.id).then(result => {
        logger.debug('getDeleteEmployeeRedirectPage - result: ' + JSON.stringify(result));
        res.redirect('/employees');
    }).catch(err => {
        logger.error('getDeleteEmployeeRedirectPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
};

const getDeleteDepartmentRedirectPage = (req, res) => {
    logger.debug('getDeleteDepartmentRedirectPage');
    daoDepartment.deleteDepartmentById(req.body.id).then(result => {
        logger.debug('getDeleteDepartmentRedirectPage - result: ' + JSON.stringify(result));
        res.redirect('/departments');
    }).catch(err => {
        logger.error('getDeleteDepartmentRedirectPage - err: ' + err);
        res.status(500).json({ message: err.message });
    });
}

module.exports = {
    getHomePage,
    getEmployeesPage,
    getEmployeePage,
    getUpdateEmployeePage,
    getCreateEmployeePage,
    getDepartmentsPage,
    getDepartmentPage,
    getUpdateDepartmentPage,
    getCreateDepartmentPage,
    getCreateEmployeeRedirectPage,
    getCreateDepartmentRedirectPage,
    getUpdateEmployeeRedirectPage,
    getUpdateDepartmentRedirectPage,
    getDeleteEmployeeRedirectPage,
    getDeleteDepartmentRedirectPage
}