import { supabase } from "./supabaseClient";
import { redirect } from "react-router-dom";

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("error in logging out", error);
    return redirect("/login");
  }

  redirect("/login");
};
