const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs')

const Employee = require("./models/employee");

const getEmpListController = require("./controllers/getEmployeeList");



mongoose.connect(process.env.MONGOCONNECTION);
mongoose.connection.on("connected", function(){
    console.log("Application is connected to Database");
})


app.use(express.static("public"));
app.listen(process.env.PORT,()=>{
    console.log("App listening on port "+process.env.PORT);
})



let aboutMessage = "hello testing";

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

async function getEmpByID(_, _id){
    let employee = await Employee.findById(_id);
    return employee
}

async function getEmpList(){
    let employees = await Employee.find({});
    return employees;
}

async function getRetirementList(){
    let employees = await Employee.find({});
    employees = getRetirementData(employees);

    // filtering out employees.Only picking returning employees for who it is time to retire
    employees = employees.filter(function (emp){
        return emp.isTimeToRetire == true;
    });
    return employees;
}

function getRetirementData(employees){
    //getting retirementDate and isTimeToRetire
    employees.forEach((element, index) => {
        employees[index].RetirementDate = getRetirementDate(element.DateOfJoining,element.Age);
        employees[index].isTimeToRetire = getRetirementStatus(employees[index].RetirementDate);
    });


    return employees;
}

function getRetirementDate(dateOfJoining,age){
    yearsRemaining = 65 - age;
    // console.log(yearsRemaining);
    let retirementDate = new Date(dateOfJoining.setFullYear(dateOfJoining.getFullYear() + yearsRemaining));
    retirementDate.setDate(retirementDate.getDate()-1);
    // console.log(retirementDate);
    return retirementDate;
}

function getRetirementStatus(retirementDate){
    today = new Date();
    dateInSixMonths = new Date(today.setMonth(today.getMonth()+6)) ;
    // console.log("dateInSixMonths",dateInSixMonths);
    console.log("retirementDate",retirementDate)
    today = new Date();
    console.log("today",today)
    console.log("dateInSixMonths",dateInSixMonths)
    console.log(retirementDate >= today && retirementDate <= dateInSixMonths);
    return (retirementDate >= today && retirementDate <= dateInSixMonths)
}

async function deleteEmployee(_, _id){
    let emp = await Employee.findByIdAndDelete(_id);
    // console.log("Deleted",emp);
    return emp;
}

async function updateEmployee(_, employee){
    let errors = [];
    console.log("employee",employee)
    
    if(['Employee', 'Manager', 'Director','VP'].indexOf(employee.Title)==-1){
        errors[errors.length] = "Please choose a valid title. Title can be 'Employee', 'Manager', 'Director' or 'VP' ";
    }

    if(['IT', 'Marketing', 'HR','Engineering'].indexOf(employee.Department)==-1){
        errors[errors.length] = "Please choose a valid Department. Department can be 'IT', 'Marketing', 'HR' or 'Engineering' ";
    }

    if([true,false].indexOf(employee.CurrentStatus)==-1){
        errors[errors.length] = "Please choose a valid working status";
    }

    if(['Contract','Seasonal'].indexOf(employee.EmployeeType)!=-1 && ['Manager', 'Director','VP'].indexOf(employee.Title)!=-1){
        errors[errors.length] = "Contractor/Seasonal Employee Can’t be Manager/Director/VP";
    }

    if(errors.length==0){
        let updatedEmp = await Employee.findByIdAndUpdate({_id: employee._id},{
            Title:employee.Title,
            Department:employee.Department,
            CurrentStatus: employee.CurrentStatus
        });
        console.log("===========updatedEmp",updatedEmp);
        return updatedEmp;
    }
    else{
        console.log("Errors",errors);
        return {"Errors":errors};
    }
}

async function addEmployee(_,employee){
    
    // Employee.create(employee,(err,emp)=>{
    //     if(!err){
    //         console.log("===========",emp);
    //         return emp;
    //     }
        
    // });
    let errors = [];

    if(employee.FirstName.trim()==""){
        errors[errors.length] = "Please enter your First Name";
    }
    if(employee.LastName.trim()==""){
        errors[errors.length] = "Please enter your Last Name";
    }
    if (employee.Age<20 || employee.Age>70){
        errors[errors.length] = "Age must be between 20 and 70 years";
    }
    if(employee.DateOfJoining=='Invalid Date'){
        errors[errors.length] = "Please enter your Date Of Joining";
    }
    
    if(['Employee', 'Manager', 'Director','VP'].indexOf(employee.Title)==-1){
        errors[errors.length] = "Please choose a valid title. Title can be 'Employee', 'Manager', 'Director' or 'VP' ";
    }

    if(['IT', 'Marketing', 'HR','Engineering'].indexOf(employee.Department)==-1){
        errors[errors.length] = "Please choose a valid Department. Department can be 'IT', 'Marketing', 'HR'or'Engineering' ";
    }

    if(['FullTime', 'PartTime', 'Contract','Seasonal'].indexOf(employee.EmployeeType)==-1){
        errors[errors.length] = "Please choose a valid Employee Type. Employee Type can be 'FullTime', 'PartTime', 'Contract' or'Seasonal' ";
    }

    if(['Contract','Seasonal'].indexOf(employee.EmployeeType)!=-1 && ['Manager', 'Director','VP'].indexOf(employee.Title)!=-1){
        errors[errors.length] = "Contractor/Seasonal Employee Can’t be Manager/Director/VP";
    }

   
    if(errors.length==0){
        let ep = await Employee.create(employee);
        console.log("===========",ep);
        return ep;
    }
    else{
        return {"Errors":errors};
    }

   
}

const resolvers = {
    
    Query: {
        about: ()=> aboutMessage,
        getEmpByID,
        getEmpList,
        getRetirementList
    },
    Mutation: {
        setAboutMessage,
        addEmployee,
        updateEmployee,
        deleteEmployee
    },
};


const server = new ApolloServer({
    typeDefs : fs.readFileSync('graphql_schema', 'utf8'),
    resolvers,
});

server.start()
    .then(function(){
        server.applyMiddleware({app, path:'/graphql', cors:true})
    });

app.get("/employee",getEmpListController);

// app.post("/employee")

// app.get("/",(req,res)=>{
//     res.render("index.html");
// })



