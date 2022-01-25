import Head from "next/head";
import Link from "next/link";
import Button from "../../components/commons/Button";
import { Table } from '../../components/commons/Table';
import NavBar from "../../components/content/header/NavBar";

export default function Products ({ data }) {
    return (
        <>
            <NavBar />
            <div className="container">
                <Head>
                    <title>Productos</title>
                    <meta name="description" content="Listado completo de productos" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className="main">
                    <section className="tables">
                        <Table
                            title="Productos"
                            columns={[
                                { key: 'codigo', title: 'ID' },
                                { key: 'articulo', title: 'Nombre' },
                                { key: 'precio_unitario', title: 'Precio' },
                                { key: 'unidades', title: 'Cantidad' },
                            ]}
                            data={data}
                        />
                    </section>
                    <section className="options">
                        <Button
                            title={'Agregar producto'}
                            backGroundColor={'#A5EA4D'}
                        />
                        <Button
                            title={'Eliminar producto'}
                            backGroundColor={'#FA6E6E'}
                        />
                    </section>
                </main>
            </div>
            <style jsx>{`
            .main {
                min-height: calc(100vh - 50px);
                padding: 0;
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
            }
            .options {
                flex: 0.3;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                }
            `}</style>
        </>
    )
}

export async function getServerSideProps () {
    let products = [];
    try {
        const response = await fetch('https://61ecbd30f3011500174d2201.mockapi.io/api/v1/productos')
        products = await response.json()
    }
    catch (error) {
        console.error('Error en la peticion', error)
    }
    return {
        props: {
            data: products
        }
    }
}