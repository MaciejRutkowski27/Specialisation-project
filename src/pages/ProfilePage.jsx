import { getAuth, signOut } from "firebase/auth";

export const ProfilePage = () => {
  const auth = getAuth();

  function handleSignOut() {
    signOut(auth); // sign out from firebase/auth
  }

  return (
    <div>
      <button className="btn-outline" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};
