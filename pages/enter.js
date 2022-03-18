import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../lib/context";
import { firestore } from "../lib/firebase";
import debounce from "lodash.debounce";

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

function UsernameForm() {
    const [formInput, setFormInput] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);

    const { user, username } = useContext(UserContext);

    const handleChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length < 3) {
            setFormInput(val);
            setIsValid(false);
            setLoading(false);
        }

        if (re.test(val)) {
            setFormInput(val);
            setIsValid(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUsername(formInput);
    }, [formInput]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //refs for both documents = users and usernames

        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formInput}`);

        //writing to the firestore - with routes above

        const batch = firestore.batch();
        batch.set(userDoc, {
            username: formInput,
            photoURL: user.photoURL,
            displayName: user.displayName,
        });
        batch.set(usernameDoc, { uid: user.uid });

        try {
            await batch.commit();
        } catch (error) {
            console.log(error);
        }
    };

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log("Firestore read executed!");
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );

    return (
        !username && (
            <section>
                <h3>Choose a username</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        placeholder="username"
                        value={formInput}
                        onChange={handleChange}
                    />
                    <UsernameMessage
                        username={username}
                        isValid={isValid}
                        loading={loading}
                    />
                    <button
                        type="submit"
                        className="btn-green"
                        disabled={!isValid}
                    >
                        Submit
                    </button>
                </form>
            </section>
        )
    );
}

function UsernameMessage({ loading, isValid, username }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p classname="text-danger">That username is already taken</p>;
    } else {
        return <p></p>;
    }
}
