import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userSignup } from "./utils/registerAction";

const authenticationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  age: Yup.number().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password must be at least\nof 8 characters")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const UserFormAuthentication = () => {
  const location = useLocation();

  return (
    <div className="bg-secondColor shadow-md px-12 py-8 h-screen flex items-start flex-col justify-center">
      <div className="mb-4">
        {/* <h1 className="text-5xl font-bold text-thirdColor">B-Next</h1> */}
        <h4 className="text-sm text-purple-300">
          Register with
          <br />
          your email
          <br />
          and password
        </h4>
      </div>
      {location.pathname === "/register" ? (
        <>
          <div className="mb-12">
            <h2 className="text-3xl text-thirdColor">Register yourself!</h2>
          </div>
          <Formik
            initialValues={{ username: "", email: "", age: "", password: "" }}
            validationSchema={authenticationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const response = await userSignup(values, {
                  setSubmitting,
                  resetForm,
                });
                console.log("response ", response);
              } catch (error) {
                console.log("Error in Registering: ", error);
                throw new Error("Unable to register user, try again later.");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex gap-4 flex-col">
                  <div>
                    <Field
                      type="username"
                      name="username"
                      className="px-2 py-1 bg-mainColor text-white focus:outline-none"
                      placeholder="username"
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
                      type="email"
                      name="email"
                      className="px-2 py-1 bg-mainColor text-white focus:outline-none"
                      placeholder="Email"
                    />
                    <br />
                    <ErrorMessage
                      className="text-sm text-red-400"
                      name="email"
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
                  <div>
                    <Field
                      type="password"
                      name="password"
                      className="px-2 py-1 bg-mainColor text-white focus:outline-none"
                      placeholder="Password"
                    />
                    <br />
                    <ErrorMessage
                      className="text-sm text-red-400"
                      name="password"
                      component="div"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 px-2 py-1 bg-thirdColor text-white hover:bg-purple-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </>
      ) : location.pathname === "/login" ? (
        <>
          <div className="mb-12">
            <h2 className="text-3xl  text-thirdColor">Login Yourself!</h2>
          </div>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-white">
                  Email:
                </label>
                <br />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="px-2 py-1 bg-mainColor focus:border-b-2 focus:outline-none text-white"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-white">
                  Password:
                </label>
                <br />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="password"
                  className="px-2 py-1 bg-mainColor focus:border-b-2 focus:outline-none text-white"
                />
              </div>
            </div>
            <button className="mt-4 bg-thirdColor text-white px-4 py-1">
              Log in
            </button>
          </form>
        </>
      ) : (
        <div>Invalid path</div>
      )}
    </div>
  );
};

export default UserFormAuthentication;
