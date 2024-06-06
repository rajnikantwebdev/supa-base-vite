import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import UserFormAuthentication from "./userAuth";
import UserRegisterPage from "../userRegisterPage";
import Profile from "./Profile";
import { getProfile } from "./utils/getProfile";
import { supabase } from "./utils/supabaseClient";

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
    element: <UserFormAuthentication />,
  },
]);

function App() {
  const [user, setUser] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });
  }, []);

  return (
    <main className="flex justify-center items-center flex-col min-h-screen ">
      {user === 0 ? (
        <>
          <div className="text-5xl font-sans font-bold text-center">
            <span className="text-thirdColor hover:text-purple-600">
              YOU ARE NOT <br />
              AUTHENTICATED
            </span>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <button className="font-sans px-2 py-1 bg-thirdColor text-white rounded-md hover:bg-purple-600">
              REGISTER
            </button>
            <button className="font-sans px-2 py-1 bg-thirdColor text-white rounded-md hover:bg-purple-600">
              LOGIN
            </button>
          </div>
        </>
      ) : (
        <Profile user={user} />
      )}
    </main>
  );
}

export default App;
