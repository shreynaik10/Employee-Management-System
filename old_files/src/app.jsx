let yo = "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";

function EmployeeSearch(){
    return (
        <div id="employeeSearch">Placeholder- Employee Search</div>
    )
}

// function ErrorList(props){
//     let errorList = props.errors.map(err=>{
//         "<p>"+err+"</p>"
//     })

//     return (
//         <div id="errorList">
//             {errorList}
//         </div>
//     )
// }

const EmpRow = (props) =>{
    // const rowStyle = {"border":"1px solid black"};
    // console.log("props on row-",new Date(props.DateOfJoining));
    let currentStatus = "";
    
    if(props.CurrentStatus){
        currentStatus = "Working";
    }
    else {
        currentStatus = "Retired";
    }
    return (
            <tr>
                <td>{props.FirstName}</td>
                <td>{props.LastName}</td>
                <td>{props.Age}</td>
                <td>{new Date(props.DateOfJoining).toDateString()}</td>
                <td>{props.Title}</td>
                <td>{props.Department}</td>
                <td>{props.EmployeeType}</td>
                <td>{currentStatus}</td>
            </tr>
    )
    
    
}

function EmployeeTable(props){
    // console.log(props.empList[0].currentStatus);
    // console.log("from EmployeeTable")
    let empRowList = props.empList.map( emp =>(
        <EmpRow key={emp._id} FirstName={emp.FirstName} LastName={emp.LastName}  Age={emp.Age} DateOfJoining={emp.DateOfJoining} Title={emp.Title} Department={emp.Department} EmployeeType={emp.EmployeeType} CurrentStatus={emp.CurrentStatus} />
    ))

    return (
        <div id="employeeTable">
            <h3>Employee Table </h3>
            <table>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>Date of Joining</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Employee Type</th>
                        <th>Current Status</th>
                    </tr>
                </thead>
                <tbody>
                        {empRowList}
                </tbody>
            </table>
        </div>
        
    )
}

function EmployeeCreate({addEmployee}){

    const empCreateFormSubmitted = (event)=>{
        event.preventDefault();
        const form = document.forms.AddEmployee;
        let newEmployee = {
            FirstName:form.FirstName.value,
            LastName:form.LastName.value,
            Age:form.Age.value?form.Age.value:-1,
            DateOfJoining:new Date(form.DateOfJoining.value).toDateString(),
            Title:form.Title.value,
            Department:form.Department.value,
            EmployeeType:form.EmployeeType.value
        }
        // console.log("date from form:",newEmployee.DateOfJoining.toUTCString())
        // console.log("date from form:",newEmployee.DateOfJoining.toString())
        // console.log("date from form:",newEmployee.DateOfJoining.toISOString())
        // console.log("date from form:",form.DateOfJoining.value);
        // console.log("date from form:",newEmployee.DateOfJoining);
        // console.log("new employee from empCreateFormSubmitted",newEmployee);
        // console.log("typeOf",typeof newEmployee.DateOfJoining);

        addEmployee(newEmployee);
    }


    return (
        <div id="employeeCreate">
            <h3>Create Employee</h3>
            <form  name="AddEmployee" onSubmit={empCreateFormSubmitted}>
                <div class="form-row">
                    <div class="form-group col-md-3">
                    <label for="FirstName">First Name :</label>
                    <input type="text" name="FirstName" placeholder="First Name" class="form-control "></input>
                    </div>
                
                    <div class="form-group col-md-3">
                    <label for="LastName">Last Name :</label>
                    <input type="text" name="LastName" placeholder="Last Name" class="form-control"></input>
                    </div>
                
                    <div class="form-group col-md-3">
                    <label for="Age">Age :</label>
                    <input type="number" name="Age" placeholder="Age" class="form-control"></input>
                    </div>
                
                    <div class="form-group col-md-3">
                    <label for="DateOfJoining">Date Of Joining :</label>
                    <input type="date" name="DateOfJoining" placeholder="Date of Joining" class="form-control"></input>
                    </div>
                
                    <div class="form-group col-md-4">
                    <label for="Title">Title :</label>
                    <select name="Title" class="form-control empCreateinput">
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Director">Director</option>
                        <option value="VP">Engineering</option>
                    </select>
                    </div>
                
                    <div class="form-group col-md-4">
                    <label for="Department">Department :</label>
                    <select name="Department" class="form-control empCreateinput">
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                    </div>
               
                    <div class="form-group col-md-4">
                    <label for="EmployeeType">Employee Type :</label>
                    <select name="EmployeeType" class="form-control empCreateinput">
                        <option value="FullTime">FullTime</option>
                        <option value="PartTime">PartTime</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                    </div>
                </div>
                
                
                
                
                
                
                
                
                <input type="submit" class="btn btn-primary mb-2" value="Add Employee"></input>
                
            </form>
        </div>
    )
}


function EmployeeDirectory(){
    // console.log("from EmployeeDirectory")
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
        fetch("http://localhost:3000/graphql",{
            method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        }).then(async(response)=>{
            let newEmpList = await response.json()
            setEmpList(newEmpList.data.getEmpList);
        })
    }

    React.useEffect(getEmpList,[]);


    let [allErrors,setErrors] = React.useState([]);
    const setErrorList = (errList)=>{
        let newErrorList = errList.map(err=>{
           return <p>{err}</p>;
        });

        setErrors(newErrorList)
    };

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
        fetch('http://localhost:3000/graphql',{
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
                setErrorList([]);
            }
            if(employee?.errors?.length >0){
                alert(employee.errors[0].message);
            }
            getEmpList();
            
            
        });
    }
    

   
    return (
        <div id="employeeDirectory">
            <EmployeeSearch />
            <EmployeeTable empList={empList} />
            <EmployeeCreate addEmployee={addEmployee} />
            <div id="errorList">
                {allErrors} 
            </div>
           
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div>
        <h1>Employee Management Systems</h1>
        <EmployeeDirectory />
    </div>
    
)