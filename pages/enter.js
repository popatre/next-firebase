import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function EnterPage() {
    const { user, username } = useContext(UserContext);
    console.log(user, username);
    return (
        <main>
            {user ? (
                !username ? (
                    <UsernameForm />
                ) : (
                    <SignOutButton />
                )
            ) : (
                <SignInButton />
            )}
        </main>
    );
}

function SignInButton() {
    const signInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleAuthProvider);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            Sign In with Google <img src={"/google.png"} alt="" />
        </button>
    );
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {}
