import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const handleArrayMessage = (msg, callback = null, delimiter = "\n") => {
  if (msg === null || typeof msg === "undefined") return false;
  if (msg.includes(msg)) {
    msg = msg.trim(delimiter);
    let msgArr = msg.split(delimiter);
    msgArr.forEach((item) => {
      callback ? callback(item) : toast.info(item);
    });
  } else {
    callback ? callback(msg) : toast.info(msg);
  }
};
