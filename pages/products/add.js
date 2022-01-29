import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/commons/Button";
import InputText from '../../components/commons/InputText';
import NavBar from "../../components/content/header/NavBar";

export default function Add ({ products }) {
  const data = { codigo: '', nombre: '', cantidad: '', precio: '', marca: '' };

  const [modeNewProduct, setModeNewProduct] = useState(false);
  const [product, setProduct] = useState(data);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const ChangeMode = () => {
    setProduct(data);
    setModeNewProduct(!modeNewProduct);
  }

  const showMessageError = (message) => {
    setError(true)
    setMessageError(message)
    setTimeout(() => {
      setError(false)
    }, 1000);
  }

  const AddProduct = async () => {
    if (modeNewProduct) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/add-new-product`, product);
      } catch (error) {
        showMessageError(error.response.data.message);
        return;
      }
    } else {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/update-product`, product);
      } catch (error) {
        showMessageError(error.response.data.message);
        return;
      }
    }
    setProduct(data);
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
          <h1>{modeNewProduct ? 'Agregar nuevo producto' : 'Agregar cantidad a producto existente'}</h1>
        </header>
        <main className="main">
          <section className="inputs">
            {!modeNewProduct ?
              <>
                <InputText
                  id={"codigo-add-product"}
                  height={"47px"}
                  width={"70%"}
                  type={"text"}
                  placeHolder={"Id producto"}
                  background={"#F2D7D7"}
                  onChange={(e) => setProduct({ ...product, codigo: e.target.value })}
                  value={product.codigo === undefined ? '' : product.codigo}
                />
                <InputText
                  id={"cant-add-product"}
                  height={"47px"}
                  width={"70%"}
                  type={"number"}
                  placeHolder={"Cantidad de producto"}
                  background={"#F2D7D7"}
                  onChange={(e) => setProduct({ ...product, cantidad: e.target.value })}
                  value={product.cantidad === undefined ? '' : product.cantidad}
                />
              </> :
              <>
                <InputText
                  id={"codigo-add-product-new"}
                  height={"47px"}
                  width={"70%"}
                  type={"text"}
                  placeHolder={"Id producto"}
                  background={"#F2D7D7"}
                  onChange={(e) => setProduct({ ...product, codigo: e.target.value })}
                  value={product.codigo === undefined ? '' : product.codigo}
                />
                <InputText
                  id={"name-add-product-new"}
                  height={"47px"}
                  width={"70%"}
                  type={"text"}
                  placeHolder={"Nombre de producto"}
                  background={"#F2D7D7"}
                  onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
                  value={product.nombre === undefined ? '' : product.nombre}
                />
                <InputText
                  id={"cant-add-product-new"}
                  height={"47px"}
                  width={"70%"}
                  type={"number"}
                  placeHolder={"Cantidad"}
                  background={"#F2D7D7"}
                  onChange={(e) => setProduct({ ...product, cantidad: e.target.value })}
                  value={product.cantidad === undefined ? '' : product.cantidad}
                />
                <InputText
                  id={"preciounit-add-product-new"}
                  height={"47px"}
                  width={"70%"}
                  type={"number"}
                  placeHolder={"Precio unitario"}
                  background={"#F2D7D7"}
                  onChange={(e) => setProduct({ ...product, precio: e.target.value })}
                  value={product.precio === undefined ? '' : product.precio}
                />
                <InputText
                  id={"maker-add-product-new"}
                  height={"47px"}
                  width={"70%"}
                  type={"text"}
                  placeHolder={"Marca"}
                  background={"#F2D7D7"}
                  onChange={(e) => setProduct({ ...product, marca: e.target.value })}
                  value={product.marca === undefined ? '' : product.marca}
                />
              </>
            }
            {error && <div className="message-error">{messageError}</div>}
            <Button
              id={"add-product-button"}
              title={"Agregar producto"}
              backGroundColor={"#A5EA4D"}
              margin={"30px 0px 0px 0px"}
              onClick={AddProduct}
            />
            <div className="change-mode-product-button">
              <Button
                id={"change-mode-product-button"}
                title={"Cambiar modo"}
                backGroundColor={"#6FDCFF"}
                onClick={ChangeMode}
              />
            </div>
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
    const response = await axios(`${process.env.API_URL}/products`);
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