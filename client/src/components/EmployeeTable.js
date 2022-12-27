import EmpRow from "./EmpRow";

function EmployeeTable(props){
    // console.log(props.empList[0].currentStatus);
    // console.log("from EmployeeTable")
    let empRowList = props.empList.map( emp =>(
        <EmpRow key={emp._id} _id={emp._id} FirstName={emp.FirstName} LastName={emp.LastName}  Age={emp.Age} DateOfJoining={emp.DateOfJoining} Title={emp.Title} Department={emp.Department} EmployeeType={emp.EmployeeType} CurrentStatus={emp.CurrentStatus} />
    ))

    return (
        <div id="employeeTable">
            <h3>Employee Table </h3>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Age</th>
                        <th>Date of Joining</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Employee Type</th>
                        <th>Current Status</th>
                        <th style={{"text-align": "center"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {empRowList}
                </tbody>
            </table>
        </div>
        
    )
}

export default EmployeeTable;