import { auth, googleAuthProvider } from "../lib/firebase";

export default function EnterPage() {
    const user = null;
    const username = null;

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
    return <button onClick={auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {}
