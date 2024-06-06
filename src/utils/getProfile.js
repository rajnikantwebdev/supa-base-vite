import { supabase } from "./supabaseClient";

export const getProfile = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.log("Error in fetching Profile");
      throw new Error("Fetching User Profile failed!!");
    }
    return session?.user;
  } catch (error) {
    console.log("Error in fetching Profile");
    throw new Error("Fetching User Profile failed!!");
  }
};
