import RetirementCard from "./RetirementCard"
import React from "react";
import { useParams, useLocation } from 'react-router-dom';
import EmployeeSearch from "./EmployeeSearch";

function UpcomingRetirement () {

    const params = useLocation().search;
    const title = new URLSearchParams(params).get("Title");
    const department = new URLSearchParams(params).get("Department");
    const employeeType = new URLSearchParams(params).get("EmployeeType");

    let [retirementList,setRetirementList] = React.useState([]);

    let query = `
        query {
            getRetirementList {
                _id
                FirstName
                LastName
                Age
                Title
                Department
                EmployeeType
                DateOfJoining
                CurrentStatus
                RetirementDate
                isTimeToRetire
            }
        }
    `;


    const getRetirementList = ()=>{
        fetch("http://localhost:3001/graphql",{
            method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        }).then(async(response)=>{
            let newEmpList = await response.json()
            newEmpList = newEmpList.data.getRetirementList
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
            
            console.log("after filter",newEmpList)

            let empRowList = newEmpList.map( emp =>(
                <RetirementCard key={emp._id} _id={emp._id} FirstName={emp.FirstName} LastName={emp.LastName}  Age={emp.Age} DateOfJoining={emp.DateOfJoining} Title={emp.Title} Department={emp.Department} EmployeeType={emp.EmployeeType} CurrentStatus={emp.CurrentStatus} RetirementDate = {emp.RetirementDate} isTimeToRetire = {emp.isTimeToRetire} />
            ))
            setRetirementList(empRowList);
        })
    }

    React.useEffect(getRetirementList,[title,department,employeeType]);


    return(
        <div>
            <EmployeeSearch />
            <div id ="retirementContainer">
                {retirementList}
            </div>
        </div>
        
    )
}

export default UpcomingRetirement;