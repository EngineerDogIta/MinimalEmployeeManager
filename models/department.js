const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: false,
        default: null
    }]
});

departmentSchema.virtual('employeeCount', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'department',
    count: true
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
