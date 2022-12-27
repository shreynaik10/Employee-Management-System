import { useNavigate, useParams } from 'react-router-dom';
import fetchFromGraphQL from '../common/fetchAPI';


const EmployeeDelete = ()=> {
    const {_id} = useParams();
    const navigate = useNavigate()

    const query = `
        mutation {
            deleteEmployee(_id: "${_id}") {
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
        let apiResponse = await response.json()
        navigate("/")
    })
}

export default EmployeeDelete;