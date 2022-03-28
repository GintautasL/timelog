import axios from "axios";
import { urls } from "./config";

export const loginRequest = (data) =>
  axios
    .post(urls.login, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
