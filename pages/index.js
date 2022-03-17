import Link from "next/link";
import styles from "../styles/Home.module.css";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
    return (
        <div className={styles.container}>
            <Loader show />
            <h1>Hello</h1>
            <button
                onClick={() => {
                    toast.success("Success toast!");
                }}
            >
                Toast message
            </button>
            <Link href="/enter">Enter page</Link>
        </div>
    );
}
