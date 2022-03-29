import AuthCheck from "../../components/AuthCheck";
import styles from "../../styles/Admin.module.css";
import { auth, firestore, serverTimeStamp } from "../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import PostFeed from "../../components/PostFeed";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { UserContext } from "../../lib/context";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

export default function AdminPostPage() {
    return (
        <main>
            <AuthCheck>
                <PostList />
                <CreateNewPost />
            </AuthCheck>
        </main>
    );
}

function PostList() {
    const ref = firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("posts");

    const query = ref.orderBy("created_at");

    const [querySnapshot] = useCollection(query);

    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1>Manage your posts</h1>
            <PostFeed posts={posts} admin />
        </>
    );
}

function CreateNewPost() {
    const router = useRouter();

    const { username } = useContext(UserContext);

    const [title, setTitle] = useState("");

    const slug = encodeURI(kebabCase(title));

    const isValid = title.length > 3 && title.length < 100;

    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore
            .collection("users")
            .doc(uid)
            .collection("posts")
            .doc(slug);

        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: "Hello world",
            created_at: serverTimeStamp(),
            updated_at: serverTimeStamp(),
            heartCount: 0,
        };

        await ref.set(data);

        toast.success("Post Created");

        router.push(`/admin/${slug}`);
    };

    return (
        <form onSubmit={createPost}>
            <input
                placeholder="My next article..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
            />
            <p>
                <strong>Slug:</strong>
                {slug}
            </p>
            <button className="btn-green" type="submit" disabled={!isValid}>
                Create new post
            </button>
        </form>
    );
}
