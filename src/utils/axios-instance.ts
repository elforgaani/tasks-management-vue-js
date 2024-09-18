import axios from "axios";
import { apiConstants } from "./api-constants";

export const instance = axios.create({
  baseURL: apiConstants.url,
});
