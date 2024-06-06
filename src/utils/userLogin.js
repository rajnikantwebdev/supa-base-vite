import { redirect } from "react-router-dom";
import { supabase } from "./supabaseClient";

export const loginUser = async (values, { setSubmitting, resetForm }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error("Error while login ", error);
      throw new Error("Unable to login");
    }

    redirect("/");
  } catch (error) {
    console.error("Error while login ", error);
    throw new Error("Unable to login");
  } finally {
    setSubmitting(false);
  }
};
