import { useState } from "react";
import EditProfile from "./EditProfile";
import EditAvatar from "./EditAvatar";
import { useEffect } from "react";
import { getAvatar } from "./utils/getAvatar";

// Profile component to let user change or manage their info
export default function Profile({ user }) {
  const [editUser, setEditUser] = useState(false);
  const [editAvatar, setAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatarFromDatabase = async () => {
      const response = await getAvatar(); // fetching the avatar from database
      setAvatarUrl(response); // setting avatarURl to response
    };
    fetchAvatarFromDatabase();
  }, []);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="bg-secondColor rounded-xl px-4 py-6 max-w-2xl min-w-96 flex gap-12 relative">
        <div className="relative profile w-1/2 h-1/2 rounded-full bg-red-400">
          <img
            src={avatarUrl !== null ? avatarUrl : "/male.png"} // conditionally rendering the image
            alt="user profile"
            className="w-full h-full object-cover rounded-full"
          />
          <button
            onClick={() => setAvatar(true)}
            className="absolute bottom-5 right-5 bg-white p-1 rounded-full shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>

        <div className="user-info border-l-2 px-4">
          <h4 className="username font-sans text-3xl text-thirdColor font-bold">
            name: {user?.user?.user_metadata?.username}
          </h4>
          <h4 className="user-age font-sans text-2xl text-thirdColor font-bold">
            age: {user?.user?.user_metadata?.age}
          </h4>
          <h4 className="user-email font-sans text-lg text-purple-300">
            {user?.user?.user_metadata?.email}
          </h4>
        </div>
        <button
          onClick={() => setEditUser(true)}
          className="absolute bottom-5 right-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
      {editUser && ( // if editUser is true load EditProfile
        <EditProfile
          supaUsername={user?.user?.user_metadata?.username}
          supaAge={user?.user?.user_metadata?.age}
          setEditUser={setEditUser}
        />
      )}
      {editAvatar && ( // if editAvatar is true load editAvatar
        <EditAvatar setAvatar={setAvatar} oldAvatar={"/male.png"} />
      )}
    </section>
  );
}
