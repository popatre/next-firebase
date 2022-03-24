import Link from "next/link";
import ReactMarkdown from "react-markdown";

// UI component for main post content
export default function PostContent({ post }) {
    const created_at =
        typeof post?.created_at === "number"
            ? new Date(post.created_at)
            : post.created_at.toDate();

    return (
        <div className="card">
            <h1>{post?.title}</h1>
            <span className="text-sm">
                Written by{" "}
                <Link href={`/${post.username}/`}>
                    <a className="text-info">@{post.username}</a>
                </Link>{" "}
                on {created_at.toISOString()}
            </span>

            <ReactMarkdown>{post?.content}</ReactMarkdown>
            <p>{post?.content}</p>
        </div>
    );
}
