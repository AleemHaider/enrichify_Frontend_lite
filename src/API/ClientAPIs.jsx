import axios from "axios";

export const callClientApi = async (url, requestType, body, auth) => {
  // let host = 'http://255.255.255.0'
  let host = 'http://192.168.107.92'

  console.log("request... ", host + url, requestType, body, auth)
  let token = localStorage.getItem("cAuthToken");

  if (requestType === "GET") {
    console.log("request... ", host + url, requestType, body, auth)

    try {
      if (auth) {
        const data = await axios.get(host + url,
          { headers: { 'x-auth-token': token } })
        return data;
      }
      const data = await axios.get(host + url);
      return data;
    } catch (err) {
      return err.response
    }

  } else if (requestType === "POST") {
    console.log("requestpost... ", host + url, requestType, body, auth)
    if (auth) {
      try {
        const data = await axios.post(host + url, body,
          { headers: { 'x-auth-token': token } })

        return data;
      } catch (error) {
        if (error.response) {

          return error.response
        }
      }
    }
    else {
      console.log("requestpostelse... ", host + url, requestType, body, auth)
      try {
        const data = await axios.post(host + url, body)
        return data;
      } catch (error) {
        if (error.response) {
          return error.response
        }
      }
    }

  } else if (requestType === "DELETE") {
    try {
      const data = await axios.delete(host + url,
        { headers: { 'x-auth-token': token } })
      return data;
    } catch (error) {
      if (error.response) {
        return error.response
      }
    }
  }
};
