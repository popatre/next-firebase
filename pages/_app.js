import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <UserContext.Provider value={{ user: {}, username: "Jon" }}>
            <Navbar />
            <Component {...pageProps} />
            <Toaster />
        </UserContext.Provider>
    );
}

export default MyApp;
