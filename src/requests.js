import axios from "axios"
import { urls } from "./config"
import queryString from "query-string"
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

export const loginRequest = (data) =>
  axios
    .post(urls.login, data)
    .then(async function (response) {
      console.log(response.data.token)
      window.localStorage.setItem("token", response.data.token)
      window.localStorage.setItem("refreshToken", response.data.refreshToken)
      const data = await myProfileRequest()
      window.localStorage.setItem(
        "role",
        data.roles[data.roles.length - 1].title
      )

      window.location.href = "/"
    })
    .catch(function (error) {
      console.log(error)
    })

export const getMyActivities = (data) =>
  axios
    .get(urls.getMyActivities)
    .then(function (response) {
      console.log("response.data")
      return response.data
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

export const logoutRequest = (data) =>
  axios
    .post(urls.logout, data)
    .then(function (response) {
      window.localStorage.clear()
      window.location.href = "/login"
    })
    .catch(function (error) {
      console.log(error)
    })

export const myProfileRequest = (data) =>
  axios
    .get(urls.myProfile)
    .then(function (response) {
      //   window.location.href = "/user"
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

export const editMyProfile = (data) =>
  axios
    .put(urls.editMyProfile, data)
    .then(function (response) {
      window.location.href = "/activities"
    })
    .catch(function (error) {
      console.log(error)
    })

export const myActivityRequest = (id) =>
  axios
    .get(urls.userGetSingleActivity.replace(":id", id))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

export const editMyActivity = (data, id) =>
  axios
    .put(urls.userGetSingleActivity.replace(":id", id), data)
    .then(function (response) {
      window.location.href = "/activities"
    })
    .catch(function (error) {
      console.log(error)
    })

export const createActivity = (data) =>
  axios
    .post(urls.createActivity, data)
    .then(function (response) {
      window.location.href = "/activities"
    })
    .catch(function (error) {
      console.log(error)
    })

export const getAllUsers = (data) =>
  axios
    .get(urls.getUsers)
    .then(function (response) {
      console.log("response.data")
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

export const getUserRequest = (id) =>
  axios
    .get(urls.getUser.replace(":id", id))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

export const editUserRequest = (data, id) =>
  axios
    .put(urls.getUser.replace(":id", id), data)
    .then(function (response) {
      window.location.href = "/users"
    })
    .catch(function (error) {
      console.log(error)
    })

export const getUsersActivitiesRequest = (id, query) =>
  axios
    .get(
      `${urls.getUsersActivities.replace(":id", id)}${queryString.stringify(
        query
      )}`
    )
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

export const adminActivityRequest = (id) =>
  axios
    .get(urls.adminGetSingleActivity.replace(":id", id))
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

export const adminEditActivity = (
  data,
  id,
  user_id // not done
) =>
  axios
    .put(urls.adminGetSingleActivity.replace(":id", id), data)
    .then(function (response) {
      //window.location.href = `/users/${id}` //change
      window.location.href = `/users/${user_id}/activities`
    })
    .catch(function (error) {
      console.log(error)
    })

export const deleteMyActivity = (id) =>
  axios
    .delete(urls.userGetSingleActivity.replace(":id", id))
    .then(function (response) {
      window.location.href = "/activities"
    })
    .catch(function (error) {
      console.log(error)
    })

export const adminDeleteActivity = (id, user_id) =>
  axios
    .delete(urls.adminGetSingleActivity.replace(":id", id))
    .then(function (response) {
      window.location.href = `/users/${user_id}/activities`
    })
    .catch(function (error) {
      console.log(error)
    })

export const getUsersStatisticsRequest = (id, query) =>
  axios
    .get(
      `${urls.getUsersStatistics.replace(":id", id)}?${queryString.stringify(
        query
      )}`
    )
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
