import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import UserFormAuthentication from "./userAuth";
import UserRegisterPage from "./userRegisterPage";
import Profile from "./Profile";
import { supabase } from "./utils/supabaseClient";
import UserLoginPage from "./UserLogin";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "./utils/logoutUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <UserRegisterPage />,
  },
  {
    path: "/login",
    element: <UserLoginPage />,
  },
]);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("user: ", user);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });
  }, []);

  return (
    <main className="flex justify-center items-center flex-col min-h-screen ">
      {user === null ? (
        <>
          <div className="text-5xl font-sans font-bold text-center">
            <span className="text-thirdColor hover:text-purple-600">
              YOU ARE NOT <br />
              AUTHENTICATED
            </span>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <Link
              to="/register"
              className="font-sans px-2 py-1 bg-thirdColor text-white rounded-md hover:bg-purple-600"
            >
              REGISTER
            </Link>
            <Link
              to="/login"
              className="font-sans px-2 py-1 bg-thirdColor text-white rounded-md hover:bg-purple-600"
            >
              LOGIN
            </Link>
          </div>
        </>
      ) : (
        <>
          <Profile user={user} />
          <button
            onClick={logoutUser}
            className="bg-red-400 fixed bottom-10 right-10 px-2 py-1 text-white hover:bg-red-600"
          >
            Log out
          </button>
        </>
      )}
    </main>
  );
}

export default App;
