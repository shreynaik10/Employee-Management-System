const Employee = require("./employee");
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://shreynaik:shreynaikshrey@cluster0.wuqpfiz.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on("connected", function(){
    console.log("Application is connected to Database");
})

const employeesList = [
    {
        FirstName:"Sam",
        LastName:"Smith",
        Age:30,
        Title:"Employee",
        Department:"Marketing",
        EmployeeType:"FullTime",
        DateOfJoining: new Date("2020-03-10"),
        CurrentStatus:true
    },
    {
        FirstName:"John",
        LastName:"Doe",
        Age:26,
        Title:"Manager",
        Department:"IT",
        EmployeeType:"Contract",
        DateOfJoining: new Date("2020-08-19"),
        CurrentStatus:true
    }
];

Employee.insertMany(employeesList)
    .then(function(data){
        console.log("Data", data);
})