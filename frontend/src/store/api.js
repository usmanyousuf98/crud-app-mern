import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL + "/v1";

console.log(apiUrl)
const getCallerData = async () => {

  const token =localStorage.getItem("token")
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
    if (error.message) {
      return [];
    }
  }
};

 const loginService = async (email,password) => {
  try {
      const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',

          },
          body: JSON.stringify({
              "email": email,
              "password": password,
          })
      })
      const data = await response.json();
      console.log(data)
      return data;
  } catch (error) {
      console.log("Erro is here ", error)
  }

}
 const tokenCheck = async (token) => {
  try {
      const response = await fetch(`${apiUrl}/token-check`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',

          },
          body: JSON.stringify({
              "token": token,
          })
      })
      const data = await response.json();
      return data;
  } catch (error) {
      console.log("Erro is here ", error)
  }

}

export { getCallerData, loginService,tokenCheck };
