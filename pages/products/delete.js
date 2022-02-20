import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/commons/Button";
import InputSelect from "../../components/commons/InputSelect";
import InputText from '../../components/commons/InputText';
import NavBar from "../../components/content/header/NavBar";

export default function Delete ({ products }) {
  const router = useRouter();
  const [product, setProduct] = useState(products.length > 0 ? products[0].codigo : '');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = (message) => {
    setError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setError(false)
    }, 1000);
  }

  const deleteProduct = async () => {
    if (product == '') {
      showErrorMessage('Falta por llenar un campo obligatorio')
      return
    }

    try {
      const response = await axios.delete(`/api/products/delete/${product}`);
      if (response.data.ok) {
        router.push('/products');
      } else {
        showErrorMessage(response.data.message);
      }
    } catch (error) {
      showErrorMessage(error.response.data.message);
    }
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <Head>
          <title>Agregar producto</title>
          <meta name="description" content="Listado completo de productos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="header">
          <h1>Eliminar producto</h1>
        </header>
        <main className="main">
          <section className="inputs">
            <InputSelect
              id={"marca-delete-product"}
              height={"47px"}
              width={"70%"}
              placeholder={"Marca"}
              options={products}
              onChange={(e) => setProduct(e.target.value)}
              value={product}
              />
            {error && <div className="message-error">{errorMessage}</div>}
            <Button
              id={"add-product-button"}
              title={"Eliminar producto"}
              backGroundColor={"#FA6E6E"}
              margin={"30px 0px 0px 0px"}
              onClick={deleteProduct}
            />
          </section>
          <section className="options">
            <Image
              src="/images/nuevo-producto.png"
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

export async function getServerSideProps () {
  let products = [];
  try {
    const response = await axios.get(`${process.env.API_URL}/products`);
    products = response.data.products;
  }
  catch (error) {
    console.error('Error en la peticion', error)
  }

  return {
    props: {
      products
    }
  }
}