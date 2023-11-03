const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
departmentSchema.set('toObject', { virtuals: true });
departmentSchema.set('toJSON', { virtuals: true });
departmentSchema.virtual('employeesCount', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'department',
    count: true
});
departmentSchema.virtual('employees', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'department'
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
