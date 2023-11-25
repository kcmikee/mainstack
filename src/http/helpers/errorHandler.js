import { toast } from "react-toastify";
import { handleArrayMessage } from "./message_helpers";

export const handleAxiosError = (ex, callback = null) => {
  if (ex) {
    if (ex.response?.data) {
      handleArrayMessage(
        ex.response.data.message ??
          ex.response.data.title ??
          "sorry, unknown error occurred.",
        toast.error,
        "\n"
      );
      if (callback) {
        callback(ex.response?.data?.errors ?? {}, ex.response?.status);
      } else {
      }
      return;
    } else {
      if (callback) callback({}, ex.response?.status);
    }
  } else {
  }
  if (parseInt(ex.response?.status) === 401) {
    toast.error("You need to login in order to continue", {
      toastId: "LoginError",
    });
  } else {
    toast.error("Sorry, An error occurred, please contact the administrator.", {
      toastId: "AdminError",
    });
  }
};
