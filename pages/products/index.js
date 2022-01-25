import Head from "next/head";
import Link from "next/link";
import NavBar from "../../components/content/header/NavBar";

const Products = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <Head>
                    <title>Productos</title>
                    <meta name="description" content="Listado completo de productos" />
                    <link rel="icon" href="/favicon.ico" />
                    <script defer type='text/javascript' src='/js/main.js' ></script>
                </Head>
                <main className="main">
                    <section className="tables">
                        <h1>Productos</h1>
                    </section>
                </main>
            </div>
            <Link href="/">
                <a>Home</a>
            </Link>
        </>
    )
}

export default Products;