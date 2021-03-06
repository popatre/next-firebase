import Loader from "../components/Loader";
import { firestore, postToJSON, fromMillis } from "../lib/firebase";
import PostFeed from "../components/PostFeed";
import { useState } from "react";
import Metatags from "../components/Metatags";

const limit = 3;

export async function getServerSideProps() {
    const postsQuery = firestore
        .collectionGroup("posts")
        .where("published", "==", true)
        .orderBy("created_at", "desc")
        .limit(limit);

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

        setPosts((prevPosts) => {
            return [...prevPosts, ...newPosts];
        });

        // setPosts(posts.concat(newPosts));
        setLoading(false);

        if (newPosts.length < limit) {
            setPostsEnd(true);
        }
    };

    return (
        <main>
            <Metatags
                title="JM News feed"
                description="News feed description"
                image={
                    "https://newsfeed.org/wp-content/uploads/How-news-feed-works-Newsfeed.png"
                }
            />
            <PostFeed posts={posts} />

            {!loading && !postsEnd && (
                <button onClick={getMorePosts}>Load more</button>
            )}

            <Loader show={loading} />

            {postsEnd && "You have reached the end"}
        </main>
    );
}
