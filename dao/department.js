const departmentModel = require('../models/department');

/** Use the departmentModel to find all departments, make a promise function */
const getAllDepartments = () => {
    return new Promise((resolve, reject) => {
        departmentModel.find({}).exec().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

/** Use the departmentModel to find a department by id, make a promise function */
const getDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        departmentModel.findById(id).exec().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

/** Use the departmentModel to create a new department, make a promise function */
const createDepartment = (department) => {
    return new Promise((resolve, reject) => {
        const newDepartment = new departmentModel({
            name: department.name,
            description: department.description,
        });

        newDepartment.save().then(result => {
            resolve(result);
        }).catch(err => {
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
                name: department.name,
                description: department.description,
            },
            { new: true }
        )
        .exec()
        .then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
};

/** Use the departmentModel to delete a department by id, make a promise function */
const deleteDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        departmentModel.findByIdAndDelete(id).exec().then(result => {
            resolve(result);
        }).catch(err => {
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
