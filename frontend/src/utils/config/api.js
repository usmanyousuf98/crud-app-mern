import axios from "axios";
import { instanceAuth, instanceFetch } from "./axios";
import moment from "moment";
// const token = localStorage.getItem("token");

const fetchDataApi = async (pageNo, filters) => {
  const apiUrl = `/users/`;
  return instanceAuth({
    url: apiUrl,
    method: "get",
  }).then((data) => {
    return data;
  });
};
const updateUser = async (data) => {
  const apiUrl = `/users/update`;

  // Create a new FormData object and append the fields
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("customerName", data.customerName);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("profilePic", data.profilePic);

  return instanceAuth({
    url: apiUrl,
    method: "put",
    data: formData, // Use the FormData object as the request data
    headers: {
      "Content-Type": "multipart/form-data", // Set content type for FormData
    },
  }).then((response) => {
    return response.data;
  });
};
const createUser = async (data) => {
  console.log(data);
  const apiUrl = `/users/create`;

  const formData = new FormData();
  //formData.append("id", data.id);
  formData.append("customerName", data.customerName);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("profilePic", data.profilePic);

  return instanceAuth({
    url: apiUrl,
    method: "post",
    data: formData, // Use the FormData object as the request data
    headers: {
      "Content-Type": "multipart/form-data", // Set content type for FormData
    },
  }).then((response) => {
    return response.data;
  });
};
const deleteUser = async (deleteId) => {
  const apiUrl = `/users/delete/?id=${deleteId}`;
  return instanceAuth({
    url: apiUrl,
    method: "delete",
  }).then((data) => {
    return data;
  });
};
export { fetchDataApi, updateUser, deleteUser, createUser };
