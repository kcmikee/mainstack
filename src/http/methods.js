import client, { baseURL } from "./axios";
import { toast } from "react-toastify";
import { handleAxiosError } from "./helpers/errorHandler";
// import axios from "axios";
// import { CLOUDINARY } from "../appConstants/appConstants";
// import blogClient, { blogBaseURL } from "./blogAxios";
// import Cookies from "js-cookie";

export const stripBaseUrl = (url) => {
  const urlArr = url.replace(baseURL, "");
  return urlArr;
};
// export const stripBlogBaseUrl = (url) => {
//   const urlArr = url.replace(blogBaseURL, "");
//   return urlArr;
// };
export const postAsync = async ({ url, payload }) => {
  let requestPayload = JSON.stringify(payload.data);
  if (payload?.setLoader) payload?.setLoader(true);
  try {
    const response = await client.post(url, requestPayload, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });

    if (response.data.status == true || response.status == 200) {
      if (payload?.silently !== true) {
        if (payload?.hideSuccess) {
          payload?.hideSuccess(response.data.message);
        } else {
          toast.success(response.data.message);
        }
      }
      if (payload.onComplete) payload.onComplete(response?.data?.data);
      return response.data;
    } else {
      if (payload?.retrieveErrorBody) {
        payload?.retrieveErrorBody(response?.data);
      }
      if (payload.returnError) {
        return response.data.message;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log(err);
    if (payload.onError) {
      payload.onError(err, handleAxiosError);
    } else {
      handleAxiosError(err, payload?.error);
    }
    if (payload?.retrieveErrorBody) {
      payload?.retrieveErrorBody(err?.response?.data);
    }
    if (payload.returnError) {
      return err?.response?.data?.message;
    } else {
      return false;
    }
  } finally {
    if (payload?.setLoader) payload?.setLoader(false);
  }
};

export const putAsync = async ({ url, payload, toaster = null }) => {
  let requestPayload = JSON.stringify(payload.data);
  const msg = toaster ?? "Processing this, please wait...";
  const load = toast.loading(msg);
  if (payload?.setLoader) payload?.setLoader();
  try {
    const response = await client.put(url, requestPayload, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });
    if (response.data.status == true) {
      toast.update(load, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
        className: "rotateY animated",
      });
      if (payload?.setLoader) payload?.setLoader();
      if (payload.onComplete) payload.onComplete();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    toast.update(load, {
      render: "Ooops!!!",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    handleAxiosError(err);
    return false;
  }
};

export const patchAsync = async ({ url, payload }) => {
  if (payload?.setLoader) payload?.setLoader(true);
  try {
    const response = await client.patch(url, payload?.data ?? {}, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });
    if (response.data.status == true) {
      if (payload?.silently !== true) {
        if (payload?.hideSuccess) {
          payload?.hideSuccess(response.data.message);
        } else {
          toast.success(response.data.message);
        }
      }
      if (payload.onComplete) payload.onComplete(response.data.data);
      return response.data.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    handleAxiosError(err, payload.onErrors);
    return false;
  } finally {
    if (payload?.setLoader) payload?.setLoader(false);
  }
};

export const getAsync = async ({ url, data }) => {
  const params = data?.query ?? {};
  if (data?.setLoader) data?.setLoader(true);
  try {
    const response = await client.get(stripBaseUrl(url), {
      params,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });
    if (response.data.status == true) {
      if (data?.setLoader) data?.setLoader(false);
      if (data?.onComplete)
        data?.onComplete(response.data.message, response.data.data);
      if (data?.renderMessage) toast.success(response.data.message);
      return response.data.data;
    } else {
      if (data?.setLoader) data?.setLoader(false);
      return false;
    }
  } catch (err) {
    // console.log(err);
    if (data?.setLoader) data?.setLoader(false);
    if (data?.retrieveErrorBody) {
      data?.retrieveErrorBody(err?.response?.data);
    }
    if (!data?.hideError) handleAxiosError(err, data?.onError);
    return false;
  }
};

export const deleteAsync = async ({ url, payload, toaster = null }) => {
  const msg = toaster ?? "Processing this, please wait...";
  const load = toast.loading(msg);
  if (payload?.setLoader) payload?.setLoader();
  try {
    const response = await client.delete(url, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });
    if (response.data.status == true) {
      toast.update(load, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
        className: "rotateY animated",
      });
      if (payload?.setLoader) payload?.setLoader();
      if (payload.onComplete) payload.onComplete();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    toast.update(load, {
      render: "Ooops!!!",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    handleAxiosError(err);
    return false;
  }
};

// export const uploadToCloudinary = async ({
//   file,
//   folder = null,
//   iloader = null,
//   onComplete = null,
//   resourceType = "image",
//   tags = null,
// }) => {
//   const cloudinary = CLOUDINARY;
//   const uploadUrl = `${cloudinary.BASE_URL}/${cloudinary.NAME}/${resourceType}/upload`;
//   const formData = new FormData();

//   if (file?.length > 0) {
//     for (let i = 0; i < file.length; i++) {
//       formData.append("file", file[i]); // Append each file to the FormData
//     }
//   } else {
//     formData.append("file", file);
//   }
//   formData.append("upload_preset", cloudinary.UNSIGNED_UPLOAD_PRESET);
//   formData.append("folder", folder ?? cloudinary.FOLDERS.SHOP_COVER_PHOTOS);
//   if (tags) formData.append("tags", tags);
//   try {
//     if (iloader) iloader(true);
//     let creds = {
//       transformRequest: (data, headers) => {
//         console.log(data);
//         delete headers.common["Authorized"];
//         return data;
//       },
//     };
//     if (file?.length > 0) {
//       creds = {
//         ...creds,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };
//     }
//     const { data } = await axios.post(uploadUrl, formData, creds);
//     if (onComplete) onComplete(data);
//     return data;
//   } catch (ex) {
//     toast.error(ex.response?.data?.error?.message ?? "Failed to upload file.");
//   } finally {
//     if (iloader) iloader(false);
//   }
// };
