import axios from "axios"
import { urls } from "./config"
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

export const loginRequest = (data) =>
  axios
    .post(urls.login, data)
    .then(function (response) {
      console.log(response.data.token)
      window.localStorage.setItem("token", response.data.token)
      window.localStorage.setItem("refreshToken", response.data.refreshToken)
      window.location.href = "/"
    })
    .catch(function (error) {
      console.log(error)
    })

export const getMyActivities = (data) =>
  axios
    .get(urls.getMyActivities, data)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })

export const registerRequest = (data) =>
  axios
    .post(urls.register, data)
    .then(function (response) {
      window.location.href = "/login"
    })
    .catch(function (error) {
      console.log(error)
    })
