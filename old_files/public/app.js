function EmployeeSearch() {
  return /*#__PURE__*/React.createElement("div", {
    id: "employeeSearch"
  }, "Placeholder- Employee Search");
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

const EmpRow = props => {
  // const rowStyle = {"border":"1px solid black"};
  // console.log("props on row-",new Date(props.DateOfJoining));
  let currentStatus = "";
  if (props.CurrentStatus) {
    currentStatus = "Working";
  } else {
    currentStatus = "Retired";
  }
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.FirstName), /*#__PURE__*/React.createElement("td", null, props.LastName), /*#__PURE__*/React.createElement("td", null, props.Age), /*#__PURE__*/React.createElement("td", null, new Date(props.DateOfJoining).toDateString()), /*#__PURE__*/React.createElement("td", null, props.Title), /*#__PURE__*/React.createElement("td", null, props.Department), /*#__PURE__*/React.createElement("td", null, props.EmployeeType), /*#__PURE__*/React.createElement("td", null, currentStatus));
};
function EmployeeTable(props) {
  // console.log(props.empList[0].currentStatus);
  // console.log("from EmployeeTable")
  let empRowList = props.empList.map(emp => /*#__PURE__*/React.createElement(EmpRow, {
    key: emp._id,
    FirstName: emp.FirstName,
    LastName: emp.LastName,
    Age: emp.Age,
    DateOfJoining: emp.DateOfJoining,
    Title: emp.Title,
    Department: emp.Department,
    EmployeeType: emp.EmployeeType,
    CurrentStatus: emp.CurrentStatus
  }));
  return /*#__PURE__*/React.createElement("div", {
    id: "employeeTable"
  }, /*#__PURE__*/React.createElement("h3", null, "Employee Table "), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "FirstName"), /*#__PURE__*/React.createElement("th", null, "LastName"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, empRowList)));
}
function EmployeeCreate({
  addEmployee
}) {
  const empCreateFormSubmitted = event => {
    event.preventDefault();
    const form = document.forms.AddEmployee;
    let newEmployee = {
      FirstName: form.FirstName.value,
      LastName: form.LastName.value,
      Age: form.Age.value ? form.Age.value : -1,
      DateOfJoining: new Date(form.DateOfJoining.value).toDateString(),
      Title: form.Title.value,
      Department: form.Department.value,
      EmployeeType: form.EmployeeType.value
    };
    // console.log("date from form:",newEmployee.DateOfJoining.toUTCString())
    // console.log("date from form:",newEmployee.DateOfJoining.toString())
    // console.log("date from form:",newEmployee.DateOfJoining.toISOString())
    // console.log("date from form:",form.DateOfJoining.value);
    // console.log("date from form:",newEmployee.DateOfJoining);
    // console.log("new employee from empCreateFormSubmitted",newEmployee);
    // console.log("typeOf",typeof newEmployee.DateOfJoining);

    addEmployee(newEmployee);
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "employeeCreate"
  }, /*#__PURE__*/React.createElement("h3", null, "Create Employee"), /*#__PURE__*/React.createElement("form", {
    name: "AddEmployee",
    onSubmit: empCreateFormSubmitted
  }, /*#__PURE__*/React.createElement("div", {
    class: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    class: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("label", {
    for: "FirstName"
  }, "First Name :"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "FirstName",
    placeholder: "First Name",
    class: "form-control "
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("label", {
    for: "LastName"
  }, "Last Name :"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "LastName",
    placeholder: "Last Name",
    class: "form-control"
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("label", {
    for: "Age"
  }, "Age :"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "Age",
    placeholder: "Age",
    class: "form-control"
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group col-md-3"
  }, /*#__PURE__*/React.createElement("label", {
    for: "DateOfJoining"
  }, "Date Of Joining :"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "DateOfJoining",
    placeholder: "Date of Joining",
    class: "form-control"
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group col-md-4"
  }, /*#__PURE__*/React.createElement("label", {
    for: "Title"
  }, "Title :"), /*#__PURE__*/React.createElement("select", {
    name: "Title",
    class: "form-control empCreateinput"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Employee"
  }, "Employee"), /*#__PURE__*/React.createElement("option", {
    value: "Manager"
  }, "Manager"), /*#__PURE__*/React.createElement("option", {
    value: "Director"
  }, "Director"), /*#__PURE__*/React.createElement("option", {
    value: "VP"
  }, "Engineering"))), /*#__PURE__*/React.createElement("div", {
    class: "form-group col-md-4"
  }, /*#__PURE__*/React.createElement("label", {
    for: "Department"
  }, "Department :"), /*#__PURE__*/React.createElement("select", {
    name: "Department",
    class: "form-control empCreateinput"
  }, /*#__PURE__*/React.createElement("option", {
    value: "IT"
  }, "IT"), /*#__PURE__*/React.createElement("option", {
    value: "Marketing"
  }, "Marketing"), /*#__PURE__*/React.createElement("option", {
    value: "HR"
  }, "HR"), /*#__PURE__*/React.createElement("option", {
    value: "Engineering"
  }, "Engineering"))), /*#__PURE__*/React.createElement("div", {
    class: "form-group col-md-4"
  }, /*#__PURE__*/React.createElement("label", {
    for: "EmployeeType"
  }, "Employee Type :"), /*#__PURE__*/React.createElement("select", {
    name: "EmployeeType",
    class: "form-control empCreateinput"
  }, /*#__PURE__*/React.createElement("option", {
    value: "FullTime"
  }, "FullTime"), /*#__PURE__*/React.createElement("option", {
    value: "PartTime"
  }, "PartTime"), /*#__PURE__*/React.createElement("option", {
    value: "Contract"
  }, "Contract"), /*#__PURE__*/React.createElement("option", {
    value: "Seasonal"
  }, "Seasonal")))), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    class: "btn btn-primary mb-2",
    value: "Add Employee"
  })));
}
function EmployeeDirectory() {
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
  let [empList, setEmpList] = React.useState([]);
  const getEmpList = () => {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(async response => {
      let newEmpList = await response.json();
      setEmpList(newEmpList.data.getEmpList);
    });
  };
  React.useEffect(getEmpList, []);
  let [allErrors, setErrors] = React.useState([]);
  const setErrorList = errList => {
    let newErrorList = errList.map(err => {
      return /*#__PURE__*/React.createElement("p", null, err);
    });
    setErrors(newErrorList);
  };
  const addEmployee = newEmployee => {
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
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(async response => {
      let employee = await response.json();
      // empList[empList.length] = employee.data.addEmployee;
      // console.log("employee added",employee);
      // console.log("+++++++ empList",empList);
      // setEmpList(empList);
      if (employee?.data?.addEmployee?.Errors?.length > 0) {
        allErrors = employee?.data?.addEmployee?.Errors;
        allErrors.forEach(err => {
          // alert(err);
        });
        setErrorList(allErrors);
      } else {
        // allErrors = []
        setErrorList([]);
      }
      if (employee?.errors?.length > 0) {
        alert(employee.errors[0].message);
      }
      getEmpList();
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "employeeDirectory"
  }, /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, {
    empList: empList
  }), /*#__PURE__*/React.createElement(EmployeeCreate, {
    addEmployee: addEmployee
  }), /*#__PURE__*/React.createElement("div", {
    id: "errorList"
  }, allErrors));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Employee Management Systems"), /*#__PURE__*/React.createElement(EmployeeDirectory, null)));