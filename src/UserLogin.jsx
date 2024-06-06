import UserFormAuthentication from "./userAuth";

function UserLoginPage() {
  // rendering user Login page
  return (
    <section className="w-full min-h-screen flex  items-center">
      <UserFormAuthentication />
      <div className="flex-1 flex relative items-center justify-center">
        <img
          src={"/space.svg"}
          alt="Next todo app"
          className="object-cover"
          style={{ width: "50%" }}
        />
      </div>
    </section>
  );
}

export default UserLoginPage;
// bg-gradient-to-b from-violet-600 to-yellow-50
