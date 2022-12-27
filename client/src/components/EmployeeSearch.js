
function EmployeeSearch() {
    return (
        <div id="employeeSearch">
            <h2>Search</h2>
            <form name="employeeSearch">
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="Title">Title :</label>
                        <select name="Title" className="form-control empCreateinput">
                            <option value="">All</option>
                            {["Employee", "Manager", "Director", "VP"]
                                .map((title, i) => {
                                    return <option key={i} value={title}>{title}</option>
                                })}
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label for="Department">Department :</label>
                        <select name="Department" className="form-control empCreateinput">
                            <option value="">All</option>
                            {["IT", "Marketing", "HR", "Engineering"]
                                .map((dept, i) => {
                                    return <option key={i} value={dept}>{dept}</option>
                                })}
                        </select>
                    </div>

                    <div className="form-group col-md-4">
                        <label for="EmployeeType">Employee Type :</label>
                        <select name="EmployeeType" className="form-control empCreateinput">
                            <option value="">All</option>
                            {["FullTime", "PartTime", "Contract", "Seasonal"]
                                .map((empType, i) => {
                                    return <option key={i} value={empType}>{empType}</option>
                                })}
                        </select>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary mb-2" id="addEmpBtn" value="Search"></input>
            </form>

        </div>
    )
}
export default EmployeeSearch