import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { Table } from '../components/commons/Table'
import NavBar from '../components/content/header/NavBar'
import styles from '../styles/Home.module.css'

export default function Home ({ minStock, topSellers }) {
  return (
    <>
      <NavBar />
      <div className={`container content-page`} id='content-pages'>
        <Head>
          <title>Inicio</title>
          <meta name="description" content="Pagina principal de la app web SURTIPAPER" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <section className={styles.tables}>
            <Table
              title={'Productos a punto de agotarse'}
              columns={[
                { key: 'codigo', title: 'ID' },
                { key: 'articulo', title: 'Nombre' },
                { key: 'unidades', title: 'Stock' }
              ]}
              data={minStock}
            />
            <Table
              title={'Más vendidos'}
              columns={[
                { key: 'codigo', title: 'ID' },
                { key: 'articulo', title: 'Nombre' },
                { key: 'vendido', title: 'Cantidad vendida' }
              ]}
              data={topSellers}
            />
          </section>
          <section className={styles.imageContent}>
            <label className={styles.title}>SURTIPAPER</label>
            <Image
              alt='Papeleria'
              src='/images/papeleria.png'
              width={300}
              height={300}
            />
          </section>
        </main>
      </div>
    </>
  )
}
export async function getServerSideProps () {
  let minStock = []
  let topSellers = []
  try {
    const responseMinStock = await axios.get(`${process.env.API_URL}/products/min-stock`);
    minStock = responseMinStock.data.products;
  } catch (error) {
    console.error(error.response.data)
  }

  try {
    const responseTopSellers = await axios.get(`${process.env.API_URL}/products/top-sellers`);
    topSellers = responseTopSellers.data.products;
  } catch (error) {
    console.error(error.response.data)
  }

  return {
    props: {
      minStock,
      topSellers
    }
  }
}
