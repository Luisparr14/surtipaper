import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Button from "../../components/commons/Button";
import InputText from '../../components/commons/InputText';
import NavBar from "../../components/content/header/NavBar";

export default function NewEmployee () {
  const data = { cedula: '', nombre: '', apellido: '', entrada: '', salida: '', direccion: '', sueldo: '', telefono: '' };

  const [empleado, setEmpleado] = useState(data);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ChangeMode = () => {
    setEmpleado(data);
    setModeNewProduct(!modeNewProduct);
  }

  const showErrorMessage = (message) => {
    setError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setError(false)
    }, 1500);
  }

  const AddEmpleado = async () => {
    
    if (empleado.cedula === '', empleado.nombre === '', empleado.apellido === '', empleado.entrada === '', empleado.salida === '', empleado.direccion === '', empleado.sueldo === '', empleado.telefono === '') {
      showErrorMessage('Todos los campos son obligatorios')
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/employees/add`, empleado);
    } catch (error) {
      showErrorMessage(error.response.data.message);
      return;
    }

    setEmpleado(data);
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <Head>
          <title>Agregar empleado</title>
          <meta name="description" content="Listado completo de productos" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="header">
          <h1>Agregar Nuevo empleado</h1>
        </header>
        <main className="main">
          <section className="inputs">
            <>
              <InputText
                id={"cedula-add-product-new"}
                height={"47px"}
                width={"70%"}
                type={"number"}
                placeHolder={"Cedula"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, cedula: e.target.value })}
                value={empleado.cedula}
              />
              <InputText
                id={"name-add-employee-new"}
                height={"47px"}
                width={"70%"}
                type={"text"}
                placeHolder={"Nombre"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, nombre: e.target.value })}
                value={empleado.nombre}
              />
              <InputText
                id={"lastname-add-employee-new"}
                height={"47px"}
                width={"70%"}
                type={"text"}
                placeHolder={"Apellido"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, apellido: e.target.value })}
                value={empleado.apellido}
              />
              <InputText
                id={"entry-time-add-employee-new"}
                height={"47px"}
                width={"70%"}
                type={"time"}
                placeHolder={"Horario entrada"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, entrada: e.target.value })}
                value={empleado.entrada}
              />
              <InputText
                id={"departure-time-add-employee-new"}
                height={"47px"}
                width={"70%"}
                type={"time"}
                placeHolder={"Horario salida"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, salida: e.target.value })}
                value={empleado.salida}
              />
              <InputText
                id={"address-add-employee-new"}
                height={"47px"}
                width={"70%"}
                type={"text"}
                placeHolder={"Direccion"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, direccion: e.target.value })}
                value={empleado.direccion}
              />
              <InputText
                id={"salary-add-employee-new"}
                height={"47px"}
                width={"70%"}
                type={"number"}
                placeHolder={"Sueldo"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, sueldo: e.target.value })}
                value={empleado.sueldo}
              />
              <InputText
                id={"phone-add-employee-new"}
                height={"47px"}
                width={"70%"}
                type={"text"}
                placeHolder={"Telefono"}
                background={"#F2D7D7"}
                onChange={(e) => setEmpleado({ ...empleado, telefono: e.target.value })}
                value={empleado.telefono}
              />

            </>
            {error && <div className="message-error">{errorMessage}</div>}
            <Button
              id={"add-employee-button"}
              title={"Agregar Empleado"}
              backGroundColor={"#A5EA4D"}
              margin={"30px 0px 0px 0px"}
              onClick={AddEmpleado}
            />
          </section>
          <section className="options">
            <Image
              src="/images/nuevo-empleado.png"
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