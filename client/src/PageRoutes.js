import {Routes, Route} from 'react-router-dom';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeSearch from './components/EmployeeSearch';
import EmployeeUpdate from './components/EmployeeUpdate';
import EmployeeDelete from './components/EmployeeDelete'
import EmployeeDetails from './components/EmployeeDetails';
import UpcomingRetirement from './components/UpcomingRetirement';


const NotFound = () => <h2>This Path is not available</h2>

export default function PageRoutes(){
    return (
        <Routes>
            <Route path='/' element= {<EmployeeDirectory />} />
            <Route path='/search' element= {<EmployeeDirectory display="EmployeeSearch"/>} />
            <Route path='/addEmployee' element={<EmployeeDirectory display="EmployeeCreate" />} />
            <Route path='/list' element= {<EmployeeDirectory display="EmployeeTable"/>} />
            <Route path='/edit/:_id' element={<EmployeeUpdate />} />
            <Route path='/delete/:_id' element={<EmployeeDelete />} />
            <Route path='/details/:_id' element={<EmployeeDetails />} />
            <Route path='/upcomingRetirement' element={<UpcomingRetirement/>} />
            <Route path='/*' element={<NotFound/>} />
            
        </Routes>
    )
}