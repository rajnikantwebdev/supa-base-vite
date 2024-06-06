import { supabase } from "./supabaseClient";
import uploadToAvatarToCloud from "./cloudinary";
import axios from "axios";
import { getProfile } from "./getProfile";

export const updateAvatar = async (value, { setSubmitting }) => {
  try {
    const user = await getProfile();
    console.log("user ", user);

    const formData = new FormData();
    formData.append("file", value.file);
    formData.append("upload_preset", "rajnikisajni");
    formData.append("cloud_name", "dzdwprpbl");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user?.id, avatar_url: result?.url, updated_at: new Date() })
      .select();

    if (error) {
      console.error("Updating profile failed", error);
      throw new Error("Updating avatar failed");
    }

    console.log("data: ", data);
  } catch (error) {
    console.log("Error while uploading the avatar...", error);
    throw new Error(error || "Something went wrong try again later!");
  } finally {
    setSubmitting(false);
  }
};
