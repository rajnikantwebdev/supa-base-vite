import { supabase } from "./supabaseClient";

export const logoutUser = async () => {
  // this is basically signing out the user
  const { error } = await supabase.auth.signOut(); // using signOut function

  if (error) {
    console.log("error in logging out", error);
    return;
  }
};
