function RetirementCard (props) {
    console.log("props",props.RetirementDate);
    return (
        <div className="retirementCard">
                <h4>{props.FirstName} {props.LastName}</h4>
                Last Working Day: {new Date(props.RetirementDate).toDateString()} <br/>
                Title: {props.Title} <br/>
                Department: {props.Department} <br/>
                Employee Type: {props.EmployeeType} <br/>
            </div>
    )
}

export default RetirementCard