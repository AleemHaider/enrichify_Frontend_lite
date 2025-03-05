import axios from "axios";

export const callApiLinkedIn = async (url, requestType, body, auth) => {
  let host = 'http://192.168.100.148:8082/';
  // let host = 'http://192.168.100.148:8082/';
  
  // let host = 'http://54.219.173.101:8081/';

  let token = localStorage.getItem("authToken");
  if (requestType === "GET") {
    try {
      if (auth) {
        const data = await axios.get(host + url,
          { headers: {'Content-Type': 'application/json'}})
        return data;
      }
      const data = await axios.get(host + url);
      return data;
    } catch (err) {
      return err.response
    }
  } else if (requestType === "POST") {
    if (auth) {
      try {
        const data = await axios.post(host + url, body,
          { headers: {'Content-Type': 'application/json'}})
        return data;
      } catch (error) {
        if (error.response) {

          return error.response
        }
      }
    }
    else {
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
        { headers: {'Content-Type': 'application/json'}})
      return data;
    } catch (error) {
      if (error.response) {
        return error.response
      }
    }
  }
};
// const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMiLCJlbWFpbCI6ImZ1cnFhbjMxMzA0QGdtYWlsLmNvbSIsImV4cCI6NDczMzcyNjYzNiwiaXNzdWVkX2F0Ijp7ImRhdGUiOiIyMDI0LTEyLTA5IDA2OjQzOjU2LjAwMDAwMCIsInRpbWV6b25lX3R5cGUiOjMsInRpbWV6b25lIjoiVVRDIn19.92bUvRgSZ0_OlVwKOKhOMGKv6iEAXCJBTJFgCFu3piw'
// const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMiLCJlbWFpbCI6ImZ1cnFhbjMxMzA0QGdtYWlsLmNvbSIsImV4cCI6MzAxNzM0MDExMzg2LCJpc3N1ZWRfYXQiOnsiZGF0ZSI6IjIwMjQtMTItMTIgMTM6NDk6NDYuMDAwMDAwIiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJVVEMifX0.B2vPvyxxQ6LrqXIrtxeZ36rcBzABysb-Y9iL-bz8NFI'
export const callApi = async (url, requestType, body, auth) => {
  // let host = 'https://www.googledevelopertoolkit.com/GoogleAnalytics';
  // let host='http://192.168.1.42/GoogelAnalytics'/
  let host='http://192.168.100.50/'
  // let host='https://ewebsftp.com/GoogelAnalytics'


  console.log("request... ",host+url, requestType, body, auth)
  let token = localStorage.getItem("authToken");
  

  if (requestType === "GET") {
  console.log("request... ",host+url, requestType, body, auth)

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
  console.log("requestpost... ",host+url, requestType, body, auth)

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
      console.log("requestpostelse... ",host+url, requestType, body, auth)
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
