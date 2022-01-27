import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Table } from "../../components/commons/Table";
import NavBar from "../../components/content/header/NavBar";

export default function Sales ({ data, total, totalHoy }) {
  const [showTotal, setShowTotal] = useState(true)
  return (
    <>
      <NavBar />
      <div className="container">
        <Head>
          <meta name="description" content="Listado completo de ventas" />
          <link rel="icon" href="/favicon.ico" />
          <title>Ventas</title>
        </Head>
        <header className="header">
          {
            showTotal ? <h1>Total Historico vendido $ {total}</h1> : <h1>Total vendido hoy: $ {totalHoy}</h1>
          }
        </header>
        <main className="main">
          <section className="tables">
            <Table
              columns={[
                { key: "id_factura", title: "ID Factura" },
                { key: "total", title: "Total" },
                { key: "empleado", title: "Responsable" },
                { key: "fecha", title: "Fecha" },
              ]}
              data={data}
              title={`Hostorial de ventas`}
            />
          </section>
          <section className="image-sales">
            <Image
              src='/images/caja-registradora.png'
              width={200}
              height={200}
              alt="Caja registradora"
            />
          </section>
        </main>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-family: Roboto san-serif; ;
          font-size: 26px;
          height: 100px;
        }
      .main {
          min-height: calc(100vh - 150px);
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }
      .image-sales {
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
  let total = 0
  let totalHoy = 0
  let facturas = []

  try {
    const response = await axios.get(`${process.env.API_URL}/sales`)
    facturas = response.data.sales
    total = response.data.totalHistorico
    totalHoy = response.data.totalHoy
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      data: facturas,
      total,
      totalHoy
    }
  }

}