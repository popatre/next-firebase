import Link from "next/link";

export default function Navbar({}) {
    const user = true;
    const username = true;

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>

                {/* //logged in */}

                {username && (
                    <>
                        <li className="push-left">
                            <Link href="/admin">
                                <button className="btn-blue">
                                    Write posts
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/$username`}>
                                <img src={`user?.photoURL`} />
                            </Link>
                        </li>
                    </>
                )}

                {/* //logged out */}

                {!username && (
                    <>
                        <li>
                            <Link href="/enter">
                                <button className="btn-blue">Log in</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
