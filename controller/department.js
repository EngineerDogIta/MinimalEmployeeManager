const departmentModel = require("../models/department");

// Define the getAllDepartments function
const getAllDepartments = (req, res) => {
    departmentModel.find({})
        .populate("employees")
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Define the getDepartmentControllerById function
const getDepartmentById = (req, res) => {
    departmentModel.findById(req.params.id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Define the createDepartmentController function
const createDepartment = (req, res) => {
    const department = new departmentModel({
        name: req.body.name,
        employees: req.body.employees,
    });

    department.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Define the updateDepartmentControllerById function
const updateDepartmentById = (req, res) => {
    departmentModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
        },
        { new: true }
    )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Define the deleteDepartmentControllerById function
const deleteDepartmentById = (req, res) => {
    departmentModel.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

// Export the getAllDepartments function
module.exports = { getAllDepartments, getDepartmentById, createDepartment, updateDepartmentById, deleteDepartmentById };


