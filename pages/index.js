import Link from "next/link";
import styles from "../styles/Home.module.css";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { firestore, postToJSON, fromMillis } from "../lib/firebase";
import PostFeed from "../components/PostFeed";
import { useState } from "react";

const limit = 1;

export async function getServerSideProps(context) {
    const postsQuery = firestore
        .collectionGroup("posts")
        .where("published", "==", true)
        .orderBy("created_at", "desc")
        .limit(limit);

    const result = postsQuery.get().then((data) => data.docs.map(postToJSON));

    const posts = (await postsQuery.get()).docs.map(postToJSON);

    return {
        props: { posts },
    };
}

export default function Home(props) {
    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(false);
    const [postsEnd, setPostsEnd] = useState(false);

    const getMorePosts = async () => {
        setLoading(true);
        const lastPost = posts[posts.length - 1];
        const lastPoint =
            typeof lastPost.created_at === "number"
                ? fromMillis(lastPost.created_at)
                : lastPost.created_at;

        const query = firestore
            .collectionGroup("posts")
            .where("published", "==", true)
            .orderBy("created_at", "desc")
            .startAfter(lastPoint)
            .limit(limit);

        const newPosts = (await query.get()).docs.map((document) =>
            document.data()
        );

        setPosts(posts.concat(newPosts));
        setLoading(false);

        if (newPosts.length < limit) {
            setPostsEnd(true);
        }
    };

    return (
        <main>
            <PostFeed posts={posts} />

            {!loading && !postsEnd && (
                <button onClick={getMorePosts}>Load more</button>
            )}

            <Loader show={loading} />

            {postsEnd && "You have reached the end"}
        </main>
    );
}
