import { supabase } from "./supabaseClient";

export const userSignup = async (values, { setSubmitting, resetForm }) => {
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
    });

    if (error) {
      console.log("register error: ", error);
      throw new Error("Unable to register try again later.");
    }

    if (data) {
      resetForm();
    }

    console.log("data: ", data);
  } catch (error) {
    console.log("register Error: ", error);
    throw new Error("Unable to register try again later.");
  } finally {
    setSubmitting(false);
  }
};
