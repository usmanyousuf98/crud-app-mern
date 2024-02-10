import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/uiComponents/Header";

import CustomDataGrid from "../components/uiComponents/DataGrid/CustomDataGrid";
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import CustomModal from "../components/CustomModal";
import { createUser } from "../utils/config/api";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({
    customerName: "",
    username: "",
    email: "",
    profilePic: "",
    id: "",
  });
  const [fetchedData, setFetchedData] = useState({
    data: [],
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setData({
      ...data,
      profilePic: file, // Assuming you want to store the file name in profilePic
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await createUser(data);

      setFetchedData(() => ({
        data: response,
      }));
      console.log(response);
      handleClose();
      setData({
        customerName: "",
        username: "",
        email: "",
        profilePic: "",
        id: "",
      });
      <Alert severity="success">Added successful</Alert>;
      return response.data;
    } catch (error) {
      console.error(error.message);
      if (error.message) {
        handleClose();
        setData({
          customerName: "",
          username: "",
          email: "",
          profilePic: "",
          id: "",
        });
        <Alert severity="error">error.message</Alert>;
      }
    }
  };
  return (
    <>
      <Header
        title={
          <Button
            variant="contained"
            startIcon={<GridAddIcon />}
            onClick={handleOpen}
          >
            ADD NEW CUSTOMER
          </Button>
        }
      />
      <Container>
        <Box position="relative">
          <CustomDataGrid />
        </Box>
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
              // value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <TextField
              label="Customer Name"
              variant="outlined"
              fullWidth
              margin="normal"
              //value={data.customerName}
              onChange={(e) =>
                setData({ ...data, customerName: e.target.value })
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              //value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <label
              htmlFor="file-upload"
              style={{ display: "block", marginBottom: "10px", left: "0px" }}
            >
              {selectedFile
                ? `Upload File: ${selectedFile.name}`
                : "Upload File"}
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add new Customer
            </Button>
          </>
        </CustomModal>
      </Container>
    </>
  );
};

export default Dashboard;
