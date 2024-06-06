// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: import.meta.env.VITE_CLOUD_NAME,
//   api_key: import.meta.env.VITE_ClOUD_API_KEY,
//   api_secret: import.meta.env.VITE_ClOUD_API_SECRET,
// });
import axios from "axios";
const uploadToAvatarToCloud = async (avatar) => {
  // console.log(import.meta.env.CLOUD_NAME);
  // try {
  //   return await new Promise(async (resolve, reject) => {
  //     cloudinary.uploader
  //       .upload_stream({ resource_type: "image" }, (err, data) => {
  //         if (err) {
  //           reject(err);
  //           return;
  //         }
  //         if (data) {
  //           resolve(data?.url);
  //         }
  //       })
  //       .end(avatar);
  //   });
  // } catch (error) {
  //   console.log("error while upload to cloudinary", error);
  //   throw new Error(error?.message || "Error while uploading file");
  // }
  try {
  } catch (error) {}
};

export default uploadToAvatarToCloud;
