import { supabase } from "./supabaseClient";

export const loginUser = async (values, { setSubmitting, resetForm }) => {
  // simple function to login user
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      // using email and password based login system
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error("Error while login ", error);
      throw new Error("Unable to login");
    }
  } catch (error) {
    console.error("Error while login ", error);
    throw new Error("Unable to login");
  } finally {
    setSubmitting(false); // finally making isSubmitting false
  }
};
