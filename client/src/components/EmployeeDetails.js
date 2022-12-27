import React from "react"; 
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment"

const formatDateForDateInput = (dateOfJoining) => {
    dateOfJoining = moment(new Date (dateOfJoining)).format('YYYY-MM-DD');
    console.log("dateOfJoining",dateOfJoining);
    return dateOfJoining;
}

const EmployeeDetails = () =>{
    const {_id} = useParams();
    const navigate = useNavigate();
    const [status,setStatus] = React.useState({});

    let [employee,setEmployee] = React.useState({});

    const getEmpByID = ()=> {
        const query = `
            query {
                getEmpByID(_id: "${_id}") {
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

        fetch("http://localhost:3001/graphql",{
            method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        }).then(async(response)=>{
            let newEmpDetails = await response.json()
            newEmpDetails = newEmpDetails.data.getEmpByID
            // newEmpDetails.DateOfJoining = formatDateForDateInput(newEmpDetails.DateOfJoining)
            newEmpDetails.CurrentStatus = newEmpDetails.CurrentStatus?"Working":"Retired"
            // console.log("newEmpDetails",newEmpDetails);
            setEmployee(newEmpDetails);
        })
    }

    React.useEffect(getEmpByID,[]);

    return (
        <div id="employeeDetails">
            <h2>Employee Details</h2>
            <div id="detailsGrid">
                <h4>Name :</h4> {employee.FirstName} {employee.LastName}
                <h4>Age :</h4> {employee.Age}
                <h4>Title :</h4> {employee.Title}
                <h4>Department :</h4> {employee.Department}
                <h4>Employee Type :</h4> {employee.EmployeeType}
                <h4>Current Status :</h4> {employee.CurrentStatus}
            </div>
        </div>
        
    )
}

export default EmployeeDetails;