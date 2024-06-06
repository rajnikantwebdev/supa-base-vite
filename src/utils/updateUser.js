import { supabase } from "./supabaseClient";

export const updateUser = async (values, { setSubmitting }) => {
  // simple function to update user meta data
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: { username: values.username, age: values.age }, // here user can pass the new data
    });

    if (error) {
      console.error("Unable to update user", error);
      throw new Error("User update failed!");
    }
  } catch (error) {
    console.error("Unable to update user", error);
    throw new Error("User update failed!");
  } finally {
    setSubmitting(false);
  }
};
