import { supabase } from "./supabaseClient";

export const getProfile = async () => {
  // this function is used to get the user profile
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession(); // using getSession to fetch the current session
    if (error) {
      console.log("Error in fetching Profile");
      throw new Error("Fetching User Profile failed!!");
    }
    return session?.user; // returning the user in session
  } catch (error) {
    console.log("Error in fetching Profile");
    throw new Error("Fetching User Profile failed!!");
  }
};
