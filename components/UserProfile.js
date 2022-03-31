import { auth } from "../lib/firebase";

export default function UserProfile({ user }) {
    return (
        <>
            <div className="box-center">
                <img src={user.photoURL} className="card-img-center" />
                <p>
                    <i>@{user.username}</i>
                </p>
                <h1>{user.displayName}</h1>
                <div className="row">
                    {auth.currentUser?.uid && <SignOutButton />}
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
