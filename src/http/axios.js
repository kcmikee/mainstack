import axios from "axios";
import { toast } from "react-toastify";

export const baseURL = process.env.NEXT_PUBLIC_MS_BASE_URL;
const client = axios.create({ baseURL });

client.interceptors.request.use(async (configs) => {
  configs.headers["Content-Type"] = "application/json";
  configs.headers.accept = "/";
  return configs;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.toString() === "Error: Network Error")
      toast.error(
        "Network Error!, There is a problem with your internet connection. Check it",
        {
          toastId: "error",
        }
      );

    return Promise.reject(error);
  }
);

export default client;
