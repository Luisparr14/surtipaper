import Head from "next/head";
import Image from "next/image";
import { Table } from "../../components/commons/Table";
import NavBar from "../../components/content/header/NavBar";

export default function Sales ({ data }) {
  console.log("ENTORNO",process.env.DB_USER)
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
          <h1>Total vendido hoy: $234,231</h1>
        </header>
        <main className="main">
          <section className="tables">
            <Table
              columns={[
                { key: "id_factura", title: "ID Factura" },
                { key: "total", title: "Total" },
                { key: "responsable", title: "Responsable" },
                { key: "fecha", title: "Fecha" },
              ]}
              data={data}
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
  let facturas = [];
  try {
    const res = await fetch('https://61ecbd30f3011500174d2201.mockapi.io/api/v1/facturas')
    facturas = await res.json()
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: facturas
    }
  }

}