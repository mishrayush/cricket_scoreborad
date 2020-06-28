import axios from "axios";

const instance = axios.create({
  baseURL: "https://cricketscorecard-77284.firebaseio.com"
});
export default instance;
