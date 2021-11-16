import { IconButton } from "@mui/material";
import { useState } from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { TextField, Tooltip, Typography } from "@material-ui/core";
import SaveIcon from '@mui/icons-material/Save';
import { Box } from "@mui/system";
import { Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import Modal from '@mui/material/Modal';


const useStyles = makeStyles({
  pointer: {
      cursor: 'pointer',
      height: "100px"
  },
  modal : {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "auto",
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
  },
  leftMargin: {
      marginLeft: 20
  },
  largeIcon: {
      fontSize: "large"
  }
});

export const ImageTableRow = (props) => {

  const {image, onSubmit} = props;
  const [name, setName] = useState(props.image.name);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const submitNewName = async() => {
    fetch(`http://localhost:8081/update/${image.id}/${name}`,{method: 'PUT'})
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        onSubmit()
      })
      .catch((error) => {console.error('Error:', error);});
  }

  const deleteImage = async() => {
    fetch(`http://localhost:8081/delete/${image.id}`,{method: 'DELETE'})
      .then((result) => {
        console.log('Success:', result);
        onSubmit()
      })
      .catch((error) => {console.error('Error:', error);});
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <img src={`data:${image.type};base64,${image.image}`} 
            width="100%"
            heihgt="100%" 
            alt="None"
          />
        </Box>
      </Modal>  
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        height="100"
        hover
      >
        <TableCell component="th" scope="row">
          <Typography variant="h6" className={classes.leftMargin}>{image.id}</Typography>
        </TableCell>
        <TableCell align="left">                   
          <TextField 
            id="outlined-basic" 
            label="Image Name" 
            variant="outlined" 
            value={name}
            onChange={handleNameChange}
          />
          <Tooltip title="Save Name" arrow>
            <IconButton onClick={submitNewName} className={classes.largeIcon}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align="left" className={classes.pointer}>
          <img src={`data:${image.type};base64,${image.image}`} 
            onClick={handleOpen}
            width="100"
            alt="None"
          />
        </TableCell>
        <TableCell>
          <Tooltip title="Delete" arrow>
            <IconButton onClick={deleteImage}>
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow> 
    </>
  );
}