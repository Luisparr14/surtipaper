import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/commons/Button";
import InputText from '../../components/commons/InputText';
import NavBar from "../../components/content/header/NavBar";

export default function NewProvider () {
  const data = { codigo: '', nombre: '', telefono: '' };

  const [provider, setProvider] = useState(data);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ChangeMode = () => {
    setProvider(data);
    setModeNewProduct(!modeNewProduct);
  }

  const showErrorMessage = (message) => {
    setError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setError(false)
    }, 1500);
  }

  const AddProvider = async () => {

    if (provider.codigo === '', provider.nombre === '', provider.telefono === '') {
      showErrorMessage('Todos los campos son obligatorios')
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/providers/add`, provider);
    } catch (error) {
      showErrorMessage(error.response.data.message);
      return;
    }

    setProvider(data);
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <Head>
          <title>Agregar Proveedor</title>
          <meta name="description" content="Listado completo de productos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="header">
          <h1>Agregar Nuevo Proveedor</h1>
        </header>
        <main className="main">
          <section className="inputs">
            <>
              <InputText
                id={"codigo-new-provider"}
                height={"47px"}
                width={"70%"}
                type={"text"}
                placeHolder={"Codigo Proveedor"}
                background={"#F2D7D7"}
                onChange={(e) => setProvider({ ...provider, codigo: e.target.value })}
                value={provider.codigo}
              />
              <InputText
                id={"name-new-provider"}
                height={"47px"}
                width={"70%"}
                type={"text"}
                placeHolder={"Nombre"}
                background={"#F2D7D7"}
                onChange={(e) => setProvider({ ...provider, nombre: e.target.value })}
                value={provider.nombre}
              />

              <InputText
                id={"phone-new-provider"}
                height={"47px"}
                width={"70%"}
                type={"number"}
                placeHolder={"Telefono"}
                background={"#F2D7D7"}
                onChange={(e) => setProvider({ ...provider, telefono: e.target.value })}
                value={provider.telefono}
              />

            </>
            {error && <div className="message-error">{errorMessage}</div>}
            <Button
              id={"add-provider-button"}
              title={"Agregar Proveedor"}
              backGroundColor={"#A5EA4D"}
              margin={"30px 0px 0px 0px"}
              onClick={AddProvider}
            />
          </section>
          <section className="options">
            <Image
              src="/images/proveedor.png"
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