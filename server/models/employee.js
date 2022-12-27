const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    FirstName: String,
    LastName: String,
    Age: { 
        type: Number, 
        min: 20, 
        max: 70 
    },
    Title: {
        type:String,
        enum: ['Employee', 'Manager', 'Director','VP']
    },
    Department: {
        type:String,
        enum: ['IT', 'Marketing', 'HR','Engineering']
    },
    EmployeeType: {
        type:String,
        enum: ['FullTime', 'PartTime', 'Contract','Seasonal']
    },
    DateOfJoining: {
        type: Date, 
        default: new Date()
    },
    CurrentStatus: {
        type:Boolean,
        default: true
    }

});

const Employee = mongoose.model('Employee', EmployeeSchema, "employees");
module.exports = Employee;
