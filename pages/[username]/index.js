import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";

export async function getServerSideProps({ query }) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();
        console.log(userDoc.ref, "<----");
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
    return (
        <main>
            <h1>Username page</h1>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    );
}
