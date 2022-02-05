import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/commons/Button";
import InputSelect from "../../components/commons/InputSelect";
import InputText from '../../components/commons/InputText';
import NavBar from "../../components/content/header/NavBar";

export default function Order ({ proveedores, productos }) {
  const data = { producto: productos.length > 0 ? productos[0].codigo : '', cantidad: '', proveedor: proveedores.length > 0 ? proveedores[0].codigo : '' };

  const [order, setOrder] = useState(data);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = (message) => {
    setError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setError(false)
    }, 1500);
  }

  const AddOrder = async () => {
    if (order.producto === '', order.cantidad === '', order.proveedor === '') {
      showErrorMessage('Todos los campos son obligatorios')
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/new`, order);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      showErrorMessage(error.response.data.message);
      return;
    }

    setOrder(data);
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <Head>
          <title>Registrar pedido</title>
          <meta name="description" content="Listado completo de s" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="header">
          <h1>Registrar un pedido</h1>
        </header>
        <main className="main">
          <section className="inputs">
            <>
              <InputSelect
                id={"proveedor-new-order"}
                height={"47px"}
                width={"70%"}
                placeHolder={"Codigo producto"}
                options={productos}
                backgroundColor={"#F2D7D7"}
                onChange={(e) => setOrder({ ...order, proveedor: e.target.value })}
              />
              <InputText
                id={"name-new-order"}
                height={"47px"}
                width={"70%"}
                type={"number"}
                placeHolder={"cantidad"}
                background={"#F2D7D7"}
                onChange={(e) => setOrder({ ...order, cantidad: e.target.value })}
                value={order.cantidad}
              />

              <InputSelect
                id={"proveedor-new-order"}
                height={"47px"}
                width={"70%"}
                placeHolder={"Proveedor"}
                options={proveedores}
                backgroundColor={"#F2D7D7"}
                onChange={(e) => setOrder({ ...order, proveedor: e.target.value })}
              />

            </>
            {error && <div className="message-error">{errorMessage}</div>}
            <Button
              id={"add-order-button"}
              title={"Registrar pedido"}
              backGroundColor={"#A5EA4D"}
              margin={"30px 0px 0px 0px"}
              onClick={AddOrder}
            />
          </section>
          <section className="options">
            <Image
              src="/images/proveedor.png"
              width={300}
              height={300}
              alt="new-producto"
            />
          </section>
        </main>
      </div>
      <style jsx>{`
            .inputs {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                flex: 0.7;
                height: 70vh
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
            .options {
                flex: 0.4;
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
  let proveedores = []
  let productos = []
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/providers/all`);
    proveedores = res.data.proveedores;
  } catch (error) {
    console.log(error.response.data);
  }

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    productos = res.data.products;
  }
  catch (error) {
    console.log(error.response.data);
  }

  return {
    props: {
      proveedores,
      productos
    },
  }
}