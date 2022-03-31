import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import Metatags from "../../components/Metatags";
import { useContext } from "react";
import { UserContext } from "../../lib/context";

export async function getServerSideProps({ params }) {
    const { username } = params;

    const userDoc = await getUserWithUsername(username);

    if (!userDoc) {
        return { notFound: true };
    }

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();

        const postsQuery = userDoc.ref
            .collection("posts")
            .where("published", "==", true)
            .orderBy("created_at", "desc")
            .limit(5);

        posts = (await postsQuery.get()).docs.map(postToJSON);
    }

    return {
        props: { user, posts },
    };
}

export default function UsernamePage({ user, posts }) {
    const { username } = useContext(UserContext);
    let admin = false;
    if (username === user.username) admin = true;

    return (
        <main>
            <Metatags
                title={`${user.username}'s posts`}
                description={`A collection of ${user.username}'s posts to the site`}
                image={
                    "https://newsfeed.org/wp-content/uploads/How-news-feed-works-Newsfeed.png"
                }
            />
            <UserProfile user={user} />
            <PostFeed posts={posts} admin={admin} />
        </main>
    );
}
