import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_EXPRESS_API}`,
  timeout: 1000 * 5,
})