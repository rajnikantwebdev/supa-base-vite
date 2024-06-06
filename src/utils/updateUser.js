import { supabase } from "./supabaseClient";

export const updateUser = async (values, { setSubmitting }) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: { username: values.username, age: values.age },
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
