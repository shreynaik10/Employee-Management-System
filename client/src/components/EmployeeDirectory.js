import React from "react";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeTable from "./EmployeeTable";
import EmployeeSearch from "./EmployeeSearch";
import { useParams, useLocation } from 'react-router-dom';


function EmployeeDirectory(props){
    // console.log("from EmployeeDirectory")
    const {_id} = useParams();
    const params = useLocation().search;
    const title = new URLSearchParams(params).get("Title");
    const department = new URLSearchParams(params).get("Department");
    const employeeType = new URLSearchParams(params).get("EmployeeType");

    const [open, setOpen] = React.useState(false)

    console.log("title",title);
    console.log("department",department)
    console.log("employeeType",employeeType)

    let query = `
        query {
            getEmpList {
                _id
                FirstName
                LastName
                Age
                Title
                Department
                EmployeeType
                DateOfJoining
                CurrentStatus
            }
        }
    `;

    let [empList,setEmpList] = React.useState([]);

    const getEmpList = ()=>{
        fetch("http://localhost:3001/graphql",{
            method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        }).then(async(response)=>{
            let newEmpList = await response.json()
            newEmpList = newEmpList.data.getEmpList
            // console.log("before filter",newEmpList)
            if(title){
                newEmpList = newEmpList.filter(function (el){
                    return el.Title == title
                    }
                );
            }
            if(department){
                newEmpList = newEmpList.filter(function (el){
                    return el.Department == department
                    }
                );
            }
            if(employeeType){
                newEmpList = newEmpList.filter(function (el){
                    return el.EmployeeType == employeeType
                    }
                );
            }
            
            // console.log("after filter",newEmpList)
            setEmpList(newEmpList);
        })
    }

    React.useEffect(getEmpList,[title,department,employeeType]);


    let [allErrors,setErrors] = React.useState([]);
    const setErrorList = (errList)=>{
        let newErrorList = errList.map(err=>{
           return <p>{err}</p>;
            // return err;
        });

        setErrors(newErrorList)
    };

    const deleteEmployee = (id)=>{

        const query = `
            mutation {
                deleteEmployee(_id:"${id}"){
                FirstName
                LastName
                Age
                Title
                Department
                EmployeeType
                DateOfJoining
                CurrentStatus
                _id
                Errors
                }
            }
        `;
    }

    const addEmployee = (newEmployee)=>{
        // console.log("newemployee from employee directory component",newEmployee);

        const query = `
            mutation {
                addEmployee(FirstName:"${newEmployee.FirstName}",LastName:"${newEmployee.LastName}",Age:${newEmployee.Age},Title:"${newEmployee.Title}",Department:"${newEmployee.Department}",EmployeeType:"${newEmployee.EmployeeType}",DateOfJoining:"${newEmployee.DateOfJoining}"){
                FirstName
                LastName
                Age
                Title
                Department
                EmployeeType
                DateOfJoining
                CurrentStatus
                _id
                Errors
                }
            }
        `;
        fetch('http://localhost:3001/graphql',{
            method:'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({query})
        }).then(async (response)=>{

            let employee = await response.json();
            // empList[empList.length] = employee.data.addEmployee;
            // console.log("employee added",employee);
            // console.log("+++++++ empList",empList);
            // setEmpList(empList);
            if(employee?.data?.addEmployee?.Errors?.length>0){
                allErrors = employee?.data?.addEmployee?.Errors;
                allErrors.forEach(err => {
                    // alert(err);
                });
                setErrorList(allErrors);
            }
            else{
                // alert("clearing)")
                setErrorList([]);
            }
            if(employee?.errors?.length >0){
                alert(employee.errors[0].message);
            }
            getEmpList();
            
            
        });
    }
    
    if(props.display == "EmployeeSearch"){
        return (
            <div id="employeeDirectory">
                <EmployeeSearch />
            </div>
        );
    }
    else if(props.display == "EmployeeTable" ){
        return (
            <div id="employeeDirectory">
                <EmployeeTable empList={empList} deleteEmployee={deleteEmployee} />  
            </div>
        );
    }
    else if(props.display == "EmployeeCreate" ){
        return (
            <div id="employeeDirectory">
               <EmployeeCreate addEmployee={addEmployee} allErrors={allErrors} setErrorList={setErrorList}/>
            </div>
        );
    }

    else{
        return (
            <div id="employeeDirectory">
                <EmployeeSearch />
                <EmployeeTable empList={empList} deleteEmployee={deleteEmployee} />
                <EmployeeCreate addEmployee={addEmployee}  allErrors={allErrors} setErrorList={setErrorList}/>
                {/* <div id="errorList">
                    {allErrors} 
                </div> */}
               
            </div>
        );
    }
   
    
}

export default EmployeeDirectory;