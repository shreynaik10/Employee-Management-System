import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

function ErrorDialogueBox(props) {

    // const [open, setOpen] = React.useState(false);
  
    // const handleClickToOpen = () => {
    //     setOpen(true);
    // };
    
    // const handleToClose = () => {
    //     setOpen(false);
    // };
    // if(props.ErrorTitle=="Failed to add employee"){
    //     props.handleClickToOpen()
    // }

    return (
        <Dialog open={props.open} onClose={props.handleToClose}>
            <DialogTitle>{props.ErrorTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.ErrorText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleToClose}
                    color="primary" >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ErrorDialogueBox;
