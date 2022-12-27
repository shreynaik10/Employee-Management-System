const Employee = require("../models/employee");

module.exports =  async (req,res) => {
    console.log("hello from getemp list")
    let employees = await Employee.find({});
    console.log(employees);
    res.json(employees) ;
}