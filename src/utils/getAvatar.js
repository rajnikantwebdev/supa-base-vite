import { getProfile } from "./getProfile";
import { supabase } from "./supabaseClient";

export const getAvatar = async () => {
  const user = await getProfile();
  const { data, error } = await supabase
    .from("profiles")
    .select(`avatar_url`)
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Unable to fetch User profile ", error);
    throw new Error("Unable to fetch user Profile");
  }

  console.log("data ", data);
  return data?.avatar_url;
};
