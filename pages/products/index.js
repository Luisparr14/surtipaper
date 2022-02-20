import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Button from "../../components/commons/Button";
import { Table } from '../../components/commons/Table';
import NavBar from "../../components/content/header/NavBar";

export default function Products ({ products }) {
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
              data={products}
            />
          </section>
          <section className="options">
            <Link href={"/products/add"}>
              <a>
                <Button
                  title={'Agregar producto'}
                  backGroundColor={'#A5EA4D'}
                />

              </a>
            </Link>
            <Link href={"/products/delete"}>
              <a>
                <Button
                  title={'Eliminar producto'}
                  backGroundColor={'#FA6E6E'}
                />
              </a>
            </Link>

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
    const response = await axios.get(`${process.env.API_URL}/products`);
    products = response.data.products;
  }
  catch (error) {
    console.error(error.response.data)
  }

  return {
    props: {
      products
    }
  }
}