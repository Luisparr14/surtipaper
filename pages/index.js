import Head from 'next/head'
import Image from 'next/image'
import { Table } from '../components/commons/Table'
import NavBar from '../components/content/header/NavBar'
import styles from '../styles/Home.module.css'

export default function Home ({ data }) {
  return (
    <>
      <NavBar />
      <div className={`${styles.container} content-page`} id='content-page'>
        <Head>
          <title>Inicio</title>
          <meta name="description" content="Pagina principal de la app web SURTIPAPER" />
          <link rel="icon" href="/favicon.ico" />
          <script defer type='text/javascript' src='/js/main.js' ></script>
        </Head>
        <main className={styles.main}>
          <section className={styles.tables}>
            <Table
              title={'Productos sin existencias'}
              columns={[
                { key: 'codigo', title: 'ID' },
                { key: 'articulo', title: 'Nombre' },
                { key: 'unidades', title: 'Stock' }
              ]}
              data={data}
            />
            <Table
              title={'Más vendidos'}
              columns={[
                { key: 'codigo', title: 'ID' },
                { key: 'articulo', title: 'Nombre' },
                { key: 'unidades', title: 'Stock' }
              ]}
              data={data}
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
  const response = await fetch('https://61ecbd30f3011500174d2201.mockapi.io/api/v1/productos')
  const products = await response.json()
  return {
    props: {
      data: products
    }
  }
}
