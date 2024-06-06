import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateAvatar } from "./utils/updateAvatar";
import { getAvatar } from "./utils/getAvatar";

const FILE_SIZE = 2000000; // 5MB (Adjust as needed)
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]; // accepted format

const authenticationSchema = Yup.object().shape({
  // using Yup schema to handle validation
  file: Yup.mixed()
    .nullable()
    .required()
    .test(
      "FILE_SIZE",
      "Uploaded file is too big. Max size allowed 2mb.",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format. (supported format: png, jpeg, jpg)",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});

const EditAvatar = ({ oldAvatar, setAvatar }) => {
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    const fetchAvatarFromDatabase = async () => {
      const response = await getAvatar();
      setAvatarUrl(response);
    };
    fetchAvatarFromDatabase();
  }, []);

  return (
    // using formkik to handle update Avatar
    <div className="bg-secondColor min-w-[40rem] max-w-4xl rounded-xl fixed px-6 py-12">
      <div className="mb-12">
        <h2 className="text-3xl text-thirdColor">Edit Avatar!</h2>
      </div>
      <Formik
        initialValues={{ file: "" }}
        validationSchema={authenticationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log(values);
            const response = await updateAvatar(values, { setSubmitting }); // using the upadteAvatar Function
            console.log(response);
          } catch (error) {
            console.log("uploading avatar failed", error);
          }
        }}
      >
        {(props) => (
          <Form className="w-full  h-full flex">
            <div className="flex gap-4 flex-col flex-1 min-h-64 items-center justify-center">
              <div className="relative profile rounded-full  h-4/6 w-4/6">
                <img
                  src={avatarUrl !== null ? avatarUrl : "/male.png"} // conditionally rendering the avatar
                  alt="user profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center flex-1">
              <div>
                <Field
                  type="file"
                  name="file"
                  className="px-2 py-1 bg-mainColor text-white focus:outline-none"
                  value={props.values.avatar}
                  onChange={(e) => {
                    props.setFieldValue("file", e.currentTarget.files[0]);
                  }}
                />
                <br />
                <ErrorMessage
                  className="text-sm text-red-400"
                  name="file"
                  component="div"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="mt-4 px-2 py-1 bg-thirdColor text-white hover:bg-purple-600"
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    onClick={() => setAvatar(false)}
                    className="mt-4 px-2 py-1 bg-red-400 text-white hover:bg-red-600"
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAvatar;
