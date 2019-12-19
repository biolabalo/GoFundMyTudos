import axios from "axios";

const instance = axios.create({
  baseURL: "https://xerde-staging.tk/api/v1/"
});

export default instance;
