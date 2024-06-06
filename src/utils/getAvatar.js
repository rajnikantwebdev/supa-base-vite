import { getProfile } from "./getProfile";
import { supabase } from "./supabaseClient";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const getAvatar = async () => {
  const user = await getProfile();

  if (!user) {
    return;
  }
  const { data, error } = await supabase
    .from("profiles")
    .select(`avatar_url`)
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Unable to fetch User profile ", error);
    throw new Error("Unable to fetch user Profile");
  }

  console.log("data ", data);
  return data?.avatar_url;
};
