import ErrorDialogueBox from "./ErrorDialogueBox";
import React from "react";

function EmployeeCreate({ addEmployee, allErrors,setErrorList }) {
    const getformDate = (dayOfJoining) => {
        const parts = dayOfJoining.split('-');
        const d = new Date(+parts[0], parts[1] - 1, +parts[2], 12);
        return d;
    }

    const empCreateFormSubmitted = (event) => {
        event.preventDefault();
        const form = document.forms.AddEmployee;
        let newEmployee = {
            FirstName: form.FirstName.value,
            LastName: form.LastName.value,
            Age: form.Age.value ? form.Age.value : -1,
            // DateOfJoining:new Date(form.DateOfJoining.value),
            DateOfJoining: getformDate(form.DateOfJoining.value),
            Title: form.Title.value,
            Department: form.Department.value,
            EmployeeType: form.EmployeeType.value
        }

        addEmployee(newEmployee);
    }

    const [errorDialogueBoxStatus, setOpen] = React.useState(false);
  
    const openErrorDialogueBox = () => {
        // alert("open true")
        setOpen(true);
    };
    
    const closeErrorDialogueBox = () => {
        // alert("closing");
        // alert("open false")
        setErrorList([]);
        setOpen(false);
    };
    React.useEffect(openErrorDialogueBox,[allErrors]);
    // React.useEffect(()=>{},[errorDialogueBoxStatus]);

    const renderErrors = (errList) => {
        if (allErrors?.length > 0) {
            // return (
            //     <div id="errorList">
            //         {allErrors}
            //     </div>
            // )
            // React.useEffect(openErrorDialogueBox,[]);
            return (
                <ErrorDialogueBox ErrorTitle = "Failed to add employee" ErrorText = {errList} open = {errorDialogueBoxStatus} handleClickToOpen = {openErrorDialogueBox} handleToClose={closeErrorDialogueBox} />
            )
        }
    }
    // const RenderErrors = (props) => {
    //     if (props.errList?.length > 0) {
    //         // return (
    //         //     <div id="errorList">
    //         //         {allErrors}
    //         //     </div>
    //         // )
    //         return (
    //             <ErrorDialogueBox ErrorTitle = "Failed to add employee" ErrorText = {props.errList} open = {errorDialogueBoxStatus} handleClickToOpen = {openErrorDialogueBox} handleToClose={closeErrorDialogueBox} />
    //         )
    //     }
    // }

    return (
        <div id="employeeCreate">
            <h3>Create Employee</h3>
            {renderErrors(allErrors)}
            {/* <RenderErrors errList={allErrors}/> */}
           
            <form name="AddEmployee" onSubmit={empCreateFormSubmitted}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label for="FirstName">First Name :</label>
                        <input type="text" name="FirstName" placeholder="First Name" className="form-control "></input>
                    </div>

                    <div className="form-group col-md-3">
                        <label for="LastName">Last Name :</label>
                        <input type="text" name="LastName" placeholder="Last Name" className="form-control"></input>
                    </div>

                    <div className="form-group col-md-3">
                        <label for="Age">Age :</label>
                        <input type="number" name="Age" placeholder="Age" className="form-control"></input>
                    </div>

                    <div className="form-group col-md-3">
                        <label for="DateOfJoining">Date Of Joining :</label>
                        <input type="date" name="DateOfJoining" placeholder="Date of Joining" className="form-control"></input>
                    </div>

                    <div className="form-group col-md-4">
                        <label for="Title">Title :</label>
                        <select name="Title" className="form-control empCreateinput">
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label for="Department">Department :</label>
                        <select name="Department" className="form-control empCreateinput">
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label for="EmployeeType">Employee Type :</label>
                        <select name="EmployeeType" className="form-control empCreateinput">
                            <option value="FullTime">FullTime</option>
                            <option value="PartTime">PartTime</option>
                            <option value="Contract">Contract</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary mb-2" id="addEmpBtn" value="Add Employee"></input>

            </form>
        </div>
    )
}

export default EmployeeCreate