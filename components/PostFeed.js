import Link from "next/link";
import Modal from "react-modal";
import { useState, useContext } from "react";
import { firestore } from "../lib/firebase";
import { UserContext } from "../lib/context";

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

    const { user } = useContext(UserContext);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
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
            console.log("deleted successfully");
            closeModal();
        } catch (error) {
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
                    {admin && (
                        <button onClick={openModal} className="btn-red">
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
                <h2>Are you sure you want to delete this?</h2>
                <button className="btn-red" onClick={handleClick}>
                    Confirm
                </button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
}
