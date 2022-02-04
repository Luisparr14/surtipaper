import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/commons/Button";
import InputText from '../../components/commons/InputText';
import NavBar from "../../components/content/header/NavBar";

export default function NewMethodPayment () {
  const [metodoPago, setMetodoPago] = useState('');
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const ChangeMode = () => {
    setEmpleado(data);
    setModeNewProduct(!modeNewProduct);
  }

  const showMessageError = (message) => {
    setError(true)
    setMessageError(message)
    setTimeout(() => {
      setError(false)
    }, 1500);
  }

  const AddMetodoPago = async () => {

    if (metodoPago === '') {
      showMessageError('El campo es obligatorio')
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/methods-payments/add`, { metodoPago });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      showMessageError(error.response.data.message);
      return;
    }

    setMetodoPago('');
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <Head>
          <title>Agregar Metodo de pago</title>
          <meta name="description" content="Listado completo de productos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="header">
          <h1>Agregar Metodo de pago</h1>
        </header>
        <main className="main">
          <section className="inputs">
            <>
              <InputText
                id={"nombre-add-method-payment"}
                height={"47px"}
                width={"70%"}
                type={"text"}
                placeHolder={"Nombre metodo de pago"}
                background={"#F2D7D7"}
                onChange={(e) => setMetodoPago(e.target.value)}
                value={metodoPago}
              />
            </>
            {error && <div className="message-error">{messageError}</div>}
            <Button
              id={"add-payment-button"}
              title={"Agregar Metodo de Pago"}
              backGroundColor={"#A5EA4D"}
              margin={"30px 0px 0px 0px"}
              onClick={AddMetodoPago}
            />
          </section>
          <section className="options">
            <Image
              src="/images/metodo-de-pago.png"
              width={300}
              height={300}
              alt="new-product"
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
            .change-mode-product-button {
                position: absolute;
                bottom: 5%;
                left: 5%;
            }
            `}</style>
    </>
  )
}