import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { Table } from '../components/commons/Table'
import NavBar from '../components/content/header/NavBar'
import styles from '../styles/Home.module.css'
import Button from '../components/commons/Button'
import { useRouter } from 'next/router'

export default function Home ({ minStock, topSellers }) {
  const router = useRouter()
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
            <Button
              title={'Realizar pedido'}
              onClick={() => router.push('/order')}
              backGroundColor={'#6FDCFF'}
              width={'30%'}
              height={'30px'}
            />
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
            <div className='options'>
              <Button
                title='agregar nuevo empleado'
                type='button'
                onClick={() => {router.push('/employee/new')}}
                backGroundColor={"#A5EA4D"}
                height={'35px'}
              />
              <Button
                title='Nueva forma de pago'
                type='button'
                onClick={() => {router.push('/payment/new')}}
                backGroundColor={"#A5EA4D"}
                height={'35px'}
              />
              <Button
                title='Nuevo proveedor'
                type='button'
                onClick={() => {router.push('/provider/new')}}
                backGroundColor={"#A5EA4D"}
                height={'35px'}
              />
            </div>
          </section>
        </main>
      </div>
      <style jsx>{`
        .options {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          flex-direction: column;
        }
        `}</style>
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
