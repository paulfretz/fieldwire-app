import { makeStyles, Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  progressIcon: { 
    justifyContent:"center",
    marginTop: 200
    
  },
  progressIconContainer: {margin: "30px 0px"}
});

export const LoadingSpinner = (props) => {
  
  const { isLoading, children } = props;
  const classes = useStyles();

  return(
    <>
      {isLoading && (
        <Box 
          display="flex"
          justifyContent="center"
          className={classes.progressIconContainer}
        >
            <CircularProgress className={classes.progressIcon} />
        </Box>
      )}
      {!isLoading && (
        <Box>
          {children}
        </Box>
      )}
    </>
  );
}