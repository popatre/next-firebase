import Head from "next/head";

export default function Metatags({ title, description, image }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@popatre" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <title>Next.js News Feed App</title>
            <meta
                name="description"
                content="A next.js web application, built along side firebase. Displays firebase data, using a mixture of SSR, SSG and ISG."
            ></meta>
        </Head>
    );
}
