import { Button, makeStyles } from '@material-ui/core';
import React, {useState} from 'react';

const useStyles = makeStyles({
  center : {
      textAlign: "center",
			alignItems: "center !important"
  },
	submitButton : {
		backgroundColor: "#1976d2 !important",
		color: "white"
	}
});

export const FileUploadPage = (props) => {
	
	const {onSubmit,closeModal} = props;
	const [selectedFile, setSelectedFile] = useState([]);
  const [isSelected, setIsSelected] = useState(false)
	const classes = useStyles();

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = async () => {
		const formData = new FormData();
		formData.append('file', selectedFile);

		await fetch('http://localhost:8081/upload',{method: 'POST',body: formData})
			.then((response) => response.json())
			.then((result) => {console.log('Success:', result);})
			.catch((error) => {console.error('Error:', error);});
		
		onSubmit();
		closeModal();
	};

	return(
   <div className={classes.center}>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<Button className={classes.submitButton} variant="contained" onClick={handleSubmission}>Submit</Button>
			</div>
		</div>
	)
}