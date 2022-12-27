import moment from 'moment'
import { Link } from 'react-router-dom';
import {PersonCircle,Trash3Fill,PencilFill} from 'react-bootstrap-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import ErrorDialogueBox from './ErrorDialogueBox';


const EmpRow = (props) =>{
    // const rowStyle = {"border":"1px solid black"};
    // console.log("props on row-",new Date(props.DateOfJoining));

    const [open, setOpen] = React.useState(false);
  
    const handleClickToOpen = () => {
        setOpen(true);
    };
    
    const handleToClose = () => {
        setOpen(false);
    };


    let currentStatus = "";
    
    if(props.CurrentStatus){
        currentStatus = "Working";
    }
    else {
        currentStatus = "Retired";
    }

    const renderViewTooltip = (props) => (
        <Tooltip {...props}>
          View Employee Details
        </Tooltip>
    );
    const renderEditTooltip = (props) => (
        <Tooltip {...props}>
          Edit Employee Details
        </Tooltip>
    );
    const renderDeleteTooltip = (props) => (
        <Tooltip {...props}>
          Delete Employee
        </Tooltip>
    );

    const renderEditButton = () =>{
        
    }

    const renderDeleteButton = () =>{
        if(!props.CurrentStatus){
            return(
                <Link to={`../delete/${props._id}`}>
                    <OverlayTrigger placement="top" delay={{ show: 50, hide: 400 }} overlay={renderDeleteTooltip}>
                        <Trash3Fill className="ml-3" style={{ color: 'red'}} size='25px' /> 
                    </OverlayTrigger>
                </Link>
            )
        }
        else{
            return(
                <span>
                    <OverlayTrigger placement="top" delay={{ show: 50, hide: 400 }} overlay={renderDeleteTooltip}>
                        <Trash3Fill className="ml-3" style={{ color: 'red'}} size='25px' onClick={handleClickToOpen} /> 
                    </OverlayTrigger>
                    {/* <Dialog open={open} onClose={handleToClose}>
                        <DialogTitle>{"Failed to Delete"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Can't delete employee whose status is "Working"
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleToClose} 
                                color="primary" >
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog> */}
                    <ErrorDialogueBox ErrorTitle = {"Failed to Delete"} ErrorText = {"Can't delete employee whose status is 'Working'"} open = {open} handleClickToOpen = {handleClickToOpen} handleToClose={handleToClose} />
                </span>   
            )
        }
        
    }


    return (
            <tr>
                <td>{props.FirstName} {props.LastName}</td>
                <td>{props.Age}</td>
                <td>{new Date(props.DateOfJoining).toDateString()}</td>
                <td>{props.Title}</td>
                <td>{props.Department}</td>
                <td>{props.EmployeeType}</td>
                <td>{currentStatus}</td>
                <td style={{"text-align": "center"}}>
                    <Link to={`../details/${props._id}`}>
                        <OverlayTrigger placement="top" delay={{ show: 50, hide: 400 }} overlay={renderViewTooltip}>
                            <PersonCircle  className="mr-3" style={{ color: '#0B0B45'}} size='25px' /> 
                        </OverlayTrigger>
                    </Link>
                    <Link to={`../edit/${props._id}`}>
                        <OverlayTrigger placement="top" delay={{ show: 50, hide: 400 }} overlay={renderEditTooltip}>
                            <PencilFill className="m-3" style={{ color: '#ff6600'}} size='25px' /> 
                        </OverlayTrigger>
                    </Link>
                    {renderDeleteButton()}
                    
                </td>
            </tr>
    )
    
    
}

export default EmpRow;