import UserFormAuthentication from "./src/userAuth";

function UserRegisterPage() {
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

export default UserRegisterPage;
// bg-gradient-to-b from-violet-600 to-yellow-50
