import Link from "next/link";
import Modal from "react-modal";
import { useState, useContext, useRef } from "react";
import { firestore } from "../lib/firebase";
import { UserContext } from "../lib/context";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export default function PostFeed({ posts, admin }) {
    return posts ? (
        posts.map((post) => (
            <PostItem post={post} key={post.slug} admin={admin} />
        ))
    ) : (
        <h1>Loading...</h1>
    );
}

function PostItem({ post, admin = false }) {
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);
    const [isOpen, setIsOpen] = useState(false);
    let subtitle;

    const { user } = useContext(UserContext);
    const router = useRouter();

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.display = "flex";
        subtitle.style.flexDirection = "column";
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleClick = async () => {
        try {
            await firestore
                .collection("users")
                .doc(user.uid)
                .collection("posts")
                .doc(post.slug)
                .delete();
            toast.success("Deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error("Something went wrong, please try again");
            console.log("somethings gone wrong");
        }
    };

    return (
        <div className="card">
            <Link href={`/${post.username}`}>
                <a>
                    <strong> By @{post.username}</strong>
                </a>
            </Link>

            {admin && (
                <Link href={`/admin/${post.slug}`}>
                    <button>Edit</button>
                </Link>
            )}

            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <a> {post.title}</a>
                </h2>
            </Link>

            <footer>
                <span>
                    {wordCount} words. {minutesToRead} min read
                    <span className="push-left">
                        {" "}
                        ❤️ {post.heartCount || 0} Hearts
                    </span>
                    {admin && !router.query.username && (
                        <button
                            onClick={openModal}
                            className="btn-red post-feed_btn"
                        >
                            Delete
                        </button>
                    )}
                </span>
            </footer>
            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Confirm deletion"
            >
                <div ref={(_subtitle) => (subtitle = _subtitle)}>
                    <h2>Are you sure you want to delete this?</h2>
                    <div className="row">
                        <button
                            className="btn-red modal-btn"
                            onClick={handleClick}
                        >
                            Confirm
                        </button>
                    </div>
                    <div className="row">
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
