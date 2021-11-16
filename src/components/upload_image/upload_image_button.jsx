import { FileUploadPage } from "./file_upload";
import { makeStyles } from "@material-ui/styles";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const useStyles = makeStyles({
  modal : {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: 'white',
      border: '2px solid #000',
      borderRadius: 15,
      boxShadow: 24,
      padding: 10,
      p: 4,
  },
  uploadButton : {
      marginLeft:"40%", 
      marginRight:"40%",
      width: "20%",
  },
  container: {
    width: 800,
    marginLeft:"25%", 
    marginRight:"25%",
    marginTop:20,
  }
});

export const UploadImageButton = (props) => {

  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const {onSubmit} = props;

  return(
    <>
      <div className={classes.container}>
        <div className={classes.uploadButton}>
        <Button 
          variant="contained"
          onClick={() => setOpen(true)}>Upload New Image
        </Button>
      </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box className={classes.modal}>
          <FileUploadPage onSubmit={onSubmit} closeModal={() => setOpen(false)}/>
        </Box>
      </Modal>  
    </>
  )
}