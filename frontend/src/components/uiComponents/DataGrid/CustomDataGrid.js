import React, { useEffect, useState } from "react";
import { Button, Typography, TextField, Alert, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import { TablePagination } from "@mui/base";
import Paper from "@mui/material/Paper";
import CustomModal from "../../CustomModal";
import {
  deleteUser,
  fetchDataApi,
  updateUser,
} from "../../../utils/config/api";
import { GridDeleteIcon } from "@mui/x-data-grid";

const CustomDataGrid = () => {
  const [deleteID, setDeleteID] = useState("");
  const [fetchedData, setFetchedData] = useState({
    data: [],
  });

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [data, setData] = useState({
    customerName: "",
    username: "",
    email: "",
    profilePic: "",
    id: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setData({
      ...data,
      profilePic: file, // Assuming you want to store the file name in profilePic
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const [page, setPage] = useState(1);
  const [count, setcount] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setcount(newPage);

    handelLoadMoreData(newPage + 1);
  };

  const [loading, setIsLoading] = useState(false);
  const columns = [
    { field: "profilePic", headerName: "", flex: 1, minWidth: 150 },
    { field: "username", headerName: "Username", flex: 2, minWidth: 150 },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 2,
      minWidth: 150,
    },
    { field: "email", headerName: "Email", flex: 2, minWidth: 150 },
  ];
  const handleUpdate = async () => {
    try {
      const response = await updateUser(data);

      if (response.ok) {
        // Handle success
        setData({
          customerName: "",
          username: "",
          email: "",
          profilePic: "",
          id: "",
        });
        handleClose();
        handelLoadMoreData();
        <Alert severity="success">Update successful</Alert>;
      } else {
        // Handle server error
        <Alert severity="error">Error</Alert>;
      }
    } catch (error) {
      // Handle other errors
      <Alert severity="error">{error.message}</Alert>;
    }
  };
  const handelLoadMoreData = async () => {
    setIsLoading(true);

    try {
      const response = await fetchDataApi();

      setFetchedData(() => ({
        data: [...response.data],
      }));

      setIsLoading(false);
      <Alert severity="success">Update successful</Alert>;
      return response.data;
    } catch (error) {
      console.error(error.message);
      if (error.message) {
        <Alert severity="error">error.message</Alert>;
      }
    }
  };

  useEffect(() => {
    handelLoadMoreData(page);
  }, []);

  const handleDelete = async () => {
    try {
      console.log("deleteID", deleteID);
      const response = await deleteUser(deleteID);

      if (response.status == 204) {
        await handelLoadMoreData();
        <Alert severity="success">Delete successful</Alert>;
      } else {
        <Alert severity="error">Error</Alert>;
      }
    } catch (error) {
      <Alert severity="error">{error.message}</Alert>;
    }
  };
  return (
    <div style={{ height: "100px", width: "100%" }}>
      <div>
        <div>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      style={{
                        padding: "8px",
                        textAlign: "start",
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                  {/* <TableCell></TableCell>
                  <TableCell></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedData.data.map((row, rowIndex) => {
                  return (
                    <TableRow
                      key={rowIndex}
                      style={{ padding: "8px", textAlign: "center" }}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.field}>
                          {column.field === "profilePic" ? (
                            <img
                              src={`http://localhost:8080/uploads/${row.profilePic}`}
                              alt="Profile Pic"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            row[column.field]
                          )}
                        </TableCell>
                      ))}
                      <TableCell style={{ padding: "8px" }}>
                        <Button
                          variant="contained"
                          disabled={row.text_content === "" ? true : false}
                          sx={{ backgroundColor: "#27979C" }}
                          onClick={() => {
                            setData({
                              id: row._id,
                              customerName: row.customerName,
                              username: row.username,
                              email: row.email,
                              profilePic: row.profilePic,
                            });
                            handleOpen();
                          }}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell style={{ padding: "8px" }}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "red !important" }}
                          onClick={() => {
                            setDeleteID(row._id);
                            handleDeleteOpen();
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <CustomModal open={open} handleClose={handleClose}>
        <>
          <Typography textAlign={"center"} variant="h4">
            Add Customer
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            //      value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <TextField
            label="Customer Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.customerName}
            onChange={(e) => setData({ ...data, customerName: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {/* Change the input file button label to "Upload File" */}
          <label
            htmlFor="file-upload"
            style={{
              display: "block",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            {selectedFile ? `Upload File: ${selectedFile.name}` : "Upload File"}
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />
          </label>
          {/* Add a button for adding a customer */}
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Customer
          </Button>
        </>
      </CustomModal>
      <CustomModal open={openDelete} handleClose={handleDeleteClose}>
        <GridDeleteIcon color="error" fontSize="large" />
        <Typography textAlign={"center"} variant="h4">
          Delete Customer
        </Typography>
        <Typography variant="body1">
          Are you sure you want to delete this customer?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleDelete();
              handleDeleteClose();
            }}
            sx={{ marginRight: "5px" }}
          >
            Yes
          </Button>
          <Button
            variant="Contained"
            color="primary"
            onClick={handleDeleteClose}
            sx={{ marginLeft: "5px" }}
          >
            No
          </Button>
        </Box>
      </CustomModal>
    </div>
  );
};

export default CustomDataGrid;
