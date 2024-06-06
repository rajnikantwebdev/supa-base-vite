import { supabase } from "./supabaseClient";
import { getProfile } from "./getProfile";

export const updateAvatar = async (value, { setSubmitting }) => {
  // this is used to update the user avatar
  try {
    const user = await getProfile(); // getting the user

    const formData = new FormData();
    formData.append("file", value.file);
    formData.append("upload_preset", "rajnikisajni");
    formData.append("cloud_name", "dzdwprpbl");

    const response = await fetch(
      // here using the cloudinary to get the URL out of image
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    const { data, error } = await supabase // storing the avatar url in database
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
    setSubmitting(false); // finally making isSubmitting false
  }
};
