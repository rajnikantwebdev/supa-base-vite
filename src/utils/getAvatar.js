import { getProfile } from "./getProfile";
import { supabase } from "./supabaseClient";

export const getAvatar = async () => {
  // 1. Check if the user is authenticated
  const user = await getProfile(); // Fetch the user's profile data (likely from a Supabase user session)
  if (!user) {
    return; // If no user is found, return without performing any further actions
  }

  // 2. Fetch the avatar URL from the database
  const { data, error } = await supabase
    .from("profiles") // Select from the "profiles" table
    .select(`avatar_url`) // Fetch only the "avatar_url" column
    .eq("id", user?.id) // Filter to match the authenticated user's ID
    .single(); // Expect only a single row in the result

  // 3. Handle errors
  if (error) {
    console.error("Unable to fetch User profile ", error); // Log the error for debugging
    throw new Error("Unable to fetch user Profile"); // Throw an error to signal a problem
  }

  // 4. Return the avatar URL
  console.log("data ", data); // Log the fetched data (optional)
  return data?.avatar_url; // Return the avatar_url property if it exists, otherwise null
};
