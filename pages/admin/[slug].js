import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthCheck from "../../components/AuthCheck";
import { auth, serverTimeStamp, firestore } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

export default function AdminPostEdit() {
    return (
        <main>
            <AuthCheck>
                <PostManager />
            </AuthCheck>
        </main>
    );
}

function PostManager() {
    const [preview, setPreview] = useState(false);
    const router = useRouter();
    const { slug } = router.query;

    const postRef = firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("posts")
        .doc(slug);
    const [post] = useDocumentData(postRef);

    return (
        <main classname="container">
            {post && (
                <>
                    <section>
                        <h1>{post.title}</h1>
                        <p>ID: {post.slug}</p>
                        <PostForm
                            postRef={postRef}
                            defaultValues={post}
                            preview={preview}
                        />
                    </section>
                    <aside></aside>
                </>
            )}
        </main>
    );
}

function PostForm({ postRef, defaultValues, preview }) {
    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues,
        mode: "onChange",
    });

    const updatePost = async ({ content, published }) => {
        await postRef.update({
            content,
            published,
            updated_at: serverTimeStamp(),
        });
        reset({ content, published });
        toast.success("Post successfully updated");
    };

    return (
        <form onSubmit={handleSubmit(updatePost)}>
            {preview && (
                <div className="card">
                    <ReactMarkdown>{watch("content")}</ReactMarkdown>
                </div>
            )}
            <div className={preview ? "hidden" : "controls"}>
                <textarea name="content" {...register("content")}></textarea>
                <fieldset>
                    <input
                        {...register("published")}
                        className="checkbox"
                        name="published"
                        type="checkbox"
                    />
                    <label>Published</label>
                </fieldset>
                <button type="submit" className="btn-green">
                    Save Changes
                </button>
            </div>
        </form>
    );
}
