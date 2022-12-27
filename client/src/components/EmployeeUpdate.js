import React from "react"; 
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment"
import ErrorDialogueBox from "./ErrorDialogueBox";

const formatDateForDateInput = (dateOfJoining) => {
    dateOfJoining = moment(new Date (dateOfJoining)).format('YYYY-MM-DD');
    console.log("dateOfJoining",dateOfJoining);
    return dateOfJoining;
}

const getformDate = (dayOfJoining)=>{
    const parts = dayOfJoining.split('-');
    const d = new Date(+parts[0], parts[1]-1, +parts[2], 12);
    return d;
}

const EmployeeUpdate =  () =>{
    const {_id} = useParams();
    const navigate = useNavigate();

    const [status,setStatus] = React.useState({});
    const [errorDialogueBoxStatus, setOpen] = React.useState(false);
    const [errors,setErrors] = React.useState([]);

    React.useEffect(()=>{
        if(errors.length>0){
            setOpen(true);
        }
        
    },[errors])
  
    const openErrorDialogueBox = () => {
        // alert("open true")
        setOpen(true);
    };
    
    const closeErrorDialogueBox = () => {
        // alert("closing");
        // alert("open false")
        setOpen(false);
    };

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
            newEmpDetails.DateOfJoining = formatDateForDateInput(newEmpDetails.DateOfJoining)
            newEmpDetails.CurrentStatus = newEmpDetails.CurrentStatus?"Working":"Retired"
            // console.log("newEmpDetails",newEmpDetails);
            setEmployee(newEmpDetails);
        })
    }

    React.useEffect(getEmpByID,[]);

    const empUpdateFormSubmitted = async (e) => {
        e.preventDefault();

        const form = document.forms.UpdateEmployee;
        let updatedEmployeeDetails = {
            _id:_id,
            Title:form.Title.value,
            Department:form.Department.value,
            CurrentStatus:form.CurrentStatus.value == "Retired"?false:true,
            EmployeeType:form.EmployeeType.value
        }

        const query = `
            mutation{
                updateEmployee(_id: "${updatedEmployeeDetails._id}", Title: "${updatedEmployeeDetails.Title}", Department: "${updatedEmployeeDetails.Department}", CurrentStatus: ${updatedEmployeeDetails.CurrentStatus}, EmployeeType: "${updatedEmployeeDetails.EmployeeType}"){
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
        await fetch('http://localhost:3001/graphql',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({query})
        }).then(async (response)=>{
            let emp = await response.json();
            console.log("++++",emp);
            emp = emp.data.updateEmployee;
            console.log("Updated",emp);
            if(!emp.Errors){
                // console.log("emp exists",emp)
                setStatus(true);
                setErrors([]);
            }
            else if(emp.Errors?.length>0) {
                // console.log("errr=ors exist:")
                // return (
                //     <div id="errorList">
                //         {emp.Errors}
                //     </div>
                // )
                setErrors(emp.Errors);
                console.log("errors exist");
            }
        })


    }

    return (
        ( 
            status == true?
            navigate("/")
            : (

                <div id="employeeUpdate">
                    <ErrorDialogueBox ErrorTitle = "Failed to edit employee details" ErrorText = {errors} open = {errorDialogueBoxStatus} handleClickToOpen = {openErrorDialogueBox} handleToClose={closeErrorDialogueBox} />
                    <h3>Update Employee Details</h3>
                    <form  name="UpdateEmployee" onSubmit={empUpdateFormSubmitted}>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label for="FirstName">First Name :</label>
                                <input type="text" name="FirstName" placeholder="First Name" className="form-control" disabled defaultValue={employee.FirstName}></input>
                            </div>
                        
                            <div className="form-group col-md-3">
                                <label for="LastName">Last Name :</label>
                                <input type="text" name="LastName" placeholder="Last Name" className="form-control" disabled defaultValue={employee.LastName}></input>
                            </div>
                        
                            <div className="form-group col-md-3">
                                <label for="Age">Age :</label>
                                <input type="number" name="Age" placeholder="Age" className="form-control" disabled defaultValue={employee.Age}></input>
                            </div>
                        
                            <div className="form-group col-md-3">
                            <label for="DateOfJoining">Date Of Joining :</label>
                            <input type="date" name="DateOfJoining" placeholder="Date of Joining" className="form-control" disabled defaultValue={employee.DateOfJoining}></input>
                            </div>
                        
                            <div className="form-group col-md-4">
                                <label for="Title">Title :</label>
                                <select name="Title" className="form-control empCreateinput">
                                    {["Employee","Manager", "Director", "VP"]
                                    .map((title, i)=> {
                                        return (title === employee.Title ? <option key={i} value={title} selected>{title}</option> :
                                        <option key={i} value={title}>{title}</option>)
                                    })}
                                </select>
                            </div>
                        
                            <div className="form-group col-md-4">
                                <label for="Department">Department :</label>
                                <select name="Department" className="form-control empCreateinput">
                                    {["IT","Marketing", "HR", "Engineering"]
                                    .map((dept, i)=> {
                                        return (dept === employee.Department ? <option key={i} value={dept} selected>{dept}</option> :
                                        <option key={i} value={dept}>{dept}</option>)
                                    })}
                                </select>
                            </div>
                    
                            <div className="form-group col-md-4">
                                <label for="EmployeeType">Employee Type :</label>
                                <select name="EmployeeType" className="form-control empCreateinput" disabled>
                                    {/* <option value="FullTime">FullTime</option>
                                    <option value="PartTime">PartTime</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Seasonal">Seasonal</option> */}
                                    {["FullTime","PartTime", "Contract", "Seasonal"]
                                    .map((empType, i)=> {
                                        return (empType === employee.EmployeeType ? <option key={i} value={empType} selected>{empType}</option> :
                                        <option key={i} value={empType}>{empType}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="CurrentStatus">Current Status :</label>
                                <select name="CurrentStatus" className="form-control empCreateinput">
                                    {/* <option value="FullTime">FullTime</option>
                                    <option value="PartTime">PartTime</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Seasonal">Seasonal</option> */}
                                    {["Working","Retired"]
                                    .map((status, i)=> {
                                        return (status === employee.CurrentStatus ? <option key={i} value={status} selected>{status}</option> :
                                        <option key={i} value={status}>{status}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        
                        <input type="submit" className="btn btn-primary mb-2" id="addEmpBtn" value="Update Details"></input>
                        
                    </form>
                </div>
            )
        )
    )
}

export default EmployeeUpdate;