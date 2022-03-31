import { auth } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function UserProfile({ user }) {
    const { username } = useContext(UserContext);
    return (
        <>
            <div className="box-center">
                <img src={user.photoURL} className="card-img-center" />
                <p>
                    <i>@{user.username}</i>
                </p>
                <h1>{user.displayName}</h1>
                <div className="row">
                    {username === user.username && <SignOutButton />}
                </div>
            </div>
        </>
    );
}

function SignOutButton() {
    return (
        <button className="btn-signout" onClick={() => auth.signOut()}>
            Sign Out
        </button>
    );
}
