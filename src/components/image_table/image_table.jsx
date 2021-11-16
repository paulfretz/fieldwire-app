import { TablePagination } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading_spinner";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { ImageTableRow } from "./image_table_row";
import { UploadImageButton } from "../upload_image/upload_image_button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Tooltip, Typography, Zoom } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
    marginLeft:"25%", 
    marginRight:"25%",
    marginTop:100,
  },
  headerStyle: {
    backgroundColor: "#8080805e !important",
    maxHeight:100
  },
  arrows: {
    fontSize: "small"
  },
  marginLeft: {
    marginLeft: 20
  }
})

export const ImageTable = () => {

    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const [sortDirection, setSortDirection] = useState("asc");
    const [sortDirectionLoading, setSortDirectionLoading] = useState(false);

    const [sort, setSort] = useState("id");
    const [sortLoading, setSortLoading] = useState(false);

    const [images, setImages] = useState([]);
    const [isEverythingLoaded, setIsEverythingLoaded] = useState(false);

    const loadImages = async() => {
        setIsEverythingLoaded(false)
        let resp = await fetch(`http://localhost:8081/getAll?sort=${sort},${sortDirection}&page=${page}&size=${rowsPerPage}`,{method: 'GET'})
          .then((response) => response.json())
          .then((result) => {
            console.log('Success:', result);
            return result;
          })
          .catch((error) => {
            console.error('Error:', error);
        });
        setCount(resp.totalElements);
        if(resp.cotent !== images){
          setImages(resp.content);
        } else {
          setIsEverythingLoaded(true)
        }
    }

    useEffect(loadImages,[]);
    useEffect(loadImages,[page, rowsPerPage]);
    useEffect(() => {setIsEverythingLoaded(true)},[images]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0)
    }

    const handleAddedFile = () => {
      loadImages();
    }

    const handleIdAscending = () => {
      if(sortDirection !== "asc"){
        setSortDirectionLoading(true);
        setSortDirection("asc")
        setIsEverythingLoaded(false);
      }
      if(sort !== "id"){
        setSortLoading(true);
        setSort("id")
        setIsEverythingLoaded(false);
      }
    }

    const handleIdDescending = () => {
      if(sortDirection !== "desc"){
        setSortDirectionLoading(true);
        setSortDirection("desc")
        setIsEverythingLoaded(false);
      }
      if(sort !== "id"){
        setSortLoading(true);
        setSort("id")
        setIsEverythingLoaded(false);
      }
    }

    const handleNameAscending = () => {
      
      if(sortDirection !== "asc"){
        setSortDirectionLoading(true);
        setSortDirection("asc")
        setIsEverythingLoaded(false);
      }
      if(sort !== "name"){
        setSortLoading(true);
        setSort("name")
        setIsEverythingLoaded(false);
      }
    }

    const handleNameDescending = () => {

      if(sortDirection !== "desc"){
        setSortDirectionLoading(true);
        setSortDirection("desc")
        setIsEverythingLoaded(false);
      }
      if(sort !== "name"){
        setSortLoading(true);
        setSort("name")
        setIsEverythingLoaded(false);
      }
    }

    const determineIfSortDoneLoading = () => {
      if(!sortLoading  && !sortDirectionLoading){
        loadImages();
      }
    }

    useEffect(determineIfSortDoneLoading,[sortLoading,sortDirectionLoading]);
    useEffect(() => setSortLoading(false) ,[sort]);
    useEffect(() => setSortDirectionLoading(false) ,[sortDirection]);

    return (
      <LoadingSpinner isLoading={!isEverythingLoaded}>
        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 400 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.headerStyle}>
                <Typography variant="h5" component="div" className={classes.marginLeft}>Image</Typography>
                <Tooltip title="Asc" arrow>
                  <IconButton onClick={handleIdAscending}>
                    <KeyboardArrowUpIcon className={classes.arrows}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Desc" arrow>
                  <IconButton onClick={handleIdDescending}>
                    <KeyboardArrowDownIcon className={classes.arrows}/>
                  </IconButton>
                </Tooltip>
                </TableCell>
                <TableCell align="left" className={classes.headerStyle}>
                <Typography variant="h5" component="div" className={classes.marginLeft}>Name</Typography>
                <Tooltip title="Asc" arrow>
                  <IconButton onClick={handleNameAscending}>
                    <KeyboardArrowUpIcon className={classes.arrows}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Desc" arrow>
                  <IconButton onClick={handleNameDescending}>
                    <KeyboardArrowDownIcon className={classes.arrows}/>
                  </IconButton>
                </Tooltip>
                </TableCell>
                <TableCell align="left" className={classes.headerStyle}></TableCell>
                <TableCell align="left" className={classes.headerStyle}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.length > 0 && (
                images.map(image => {
                    return(
                      <ImageTableRow key={image.id} image={image} onSubmit={loadImages} />
                    );
                })
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <UploadImageButton onSubmit={handleAddedFile} />
      </LoadingSpinner>
    )
} 
