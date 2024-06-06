import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUser } from "./utils/updateUser";

const authenticationSchema = Yup.object().shape({
  // handling validation using Yup
  username: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
});

const EditProfile = ({ supaUsername, supaAge, setEditUser }) => {
  // using Formik to handle user info update
  return (
    <div className="bg-secondColor min-w-[40rem] max-w-4xl rounded-xl fixed px-6 py-12">
      <div className="mb-12">
        <h2 className="text-3xl text-thirdColor">Edit your Profile!</h2>
      </div>
      <Formik
        initialValues={{ username: supaUsername, age: supaAge }} // passing the initial value from props
        validationSchema={authenticationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await updateUser(values, { setSubmitting });
          } catch (error) {
            console.error("Error in updating user. try again later");
            throw new Error("Updating User failed!");
          }
        }}
      >
        {(props) => (
          <Form>
            <div className="flex gap-4 flex-col">
              <div>
                <Field
                  type="username"
                  name="username"
                  className="px-2 py-1 bg-mainColor text-white focus:outline-none"
                  placeholder="username"
                  as="input"
                  value={props.values.username}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <br />
                <ErrorMessage
                  className="text-sm text-red-400"
                  name="username"
                  component="div"
                />
              </div>

              <div>
                <Field
                  type="age"
                  name="age"
                  className="px-2 py-1 bg-mainColor text-white focus:outline-none"
                  placeholder="age"
                />
                <br />
                <ErrorMessage
                  className="text-sm text-red-400"
                  name="age"
                  component="div"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className="mt-4 px-2 py-1 bg-thirdColor text-white hover:bg-purple-600"
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                onClick={() => setEditUser(false)} // making editUser false
                className="mt-4 px-2 py-1 bg-red-400 text-white hover:bg-red-600"
              >
                close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
