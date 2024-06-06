import { supabase } from "./supabaseClient";

export const userSignup = async (values, { setSubmitting, resetForm }) => {
  // this function is used to register the user on supabase
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          username: values.username,
          age: values.age,
        },
      },
    }); // registering the user using email, pass, and additional data.

    if (error) {
      console.log("register error: ", error);
      throw new Error("Unable to register try again later.");
    }

    if (data) {
      resetForm(); // if response is ok, reset the form field.
    }
  } catch (error) {
    console.log("register Error: ", error);
    throw new Error("Unable to register try again later.");
  } finally {
    setSubmitting(false); // finally make isSubmitting false
  }
};
