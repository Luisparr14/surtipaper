import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import InputText from "../../components/commons/InputText";
import Button from "../../components/commons/Button";
import { Table } from "../../components/commons/Table";
import NavBar from "../../components/content/header/NavBar";
import InputSelect from "../../components/commons/InputSelect";

export default function Sell ({ methodPayments, employees }) {
  const [vendiendo, setVendiendo] = useState(true)
  const [factura, setFactura] = useState(2)
  const [empleado, setEmpleado] = useState(employees.length === 0 ? 0 : employees[0].id)
  const [metodoPago, setMetodoPago] = useState(methodPayments.length === 0 ? 0 : methodPayments[0].id)
  const [producto, setProducto] = useState('')
  const [cantidad, setCantidad] = useState(1)

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData () {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sell/list-products`, { "idFactura": factura });
      setProducts(res.data.productsList);
    }
    fetchData();
  }, [factura])

  const ComenzarVenta = async () => {
    console.log(process.env)
    setVendiendo(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bill/create-bill`, { empleado, metodoPago })
    setFactura(response.data.idFactura)
  }

  const AgregarProducto = async () => {
    if (producto === '') {
      console.log('No se ha seleccionado un producto')
      return
    }
    if (cantidad <= 0) {
      console.log('La cantidad debe ser mayor a 0')
      return
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sell/add-product`, { factura, producto, cantidad })
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sell/list-products`, { "idFactura": factura });
      setProducts(res.data.productsList);
      console.log('click')
      setCantidad(1)
      setProducto('')
    } catch (error) {
      console.log(error)
      return
    }
  }

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
          <h1>VENDER</h1>
        </header>
        <main className="main">
          {vendiendo && <section className="tables sell-table">
            <div className="inputs">
              <InputText
                id="product-code"
                type="text"
                placeHolder="Ingrese el codigo del producto"
                width="100%"
                height={"40px"}
                onChange={(e) => setProducto(e.target.value)}
                value={producto}
              />
              <InputText
                id="product-quantity"
                type="number"
                placeHolder="Ingrese cantidad de producto"
                width="45%"
                height={"40px"}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                value={cantidad}
              />
              <Button
                title={"+"}
                backGroundColor={`#00b894`}
                borderRadius={"100%"}
                width={"45px"}
                height={"37px"}
                onClick={AgregarProducto}
              />
            </div>
            <Table
              columns={[
                { key: "codigo", title: "Codigo" },
                { key: "articulo", title: "Nombre" },
                { key: "cantidad", title: "Cantidad" },
                { key: "precio", title: "Precio" },
                { key: "total", title: "Total" },
              ]}
              data={products}
              title={`Detalle de la factura # ${factura}`}
            />
            <div className="options">
              <Button
                title={"Finalizar Venta"}
                backGroundColor={`#A5EA4D`}
                width={"40%"}
              />
              <Button
                title={"Cancelar Venta"}
                backGroundColor={`#FA6E6E`}
                width={"40%"}
              />
            </div>
          </section>}
          <section className="image-sell">
            {!vendiendo && <div>
              <Button
                title={"Nueva Venta"}
                backGroundColor={`#00b894`}
                width={"100%"}
                onClick={ComenzarVenta}
              />
              <InputSelect
                id="id-empleado"
                text={`Empleado`}
                width={"100%"}
                height={"40px"}
                options={employees}
                onChange={(e) => setEmpleado(parseInt(e.target.value))}
              />
              <InputSelect
                id="id-forma-pago"
                text="Forma de pago"
                width="100%"
                height={"40px"}
                options={methodPayments}
                onChange={(e) => setMetodoPago(parseInt(e.target.value))}
              />
            </div>}
            <Image
              src='/images/vendido.png'
              width={300}
              height={300}
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
      .image-sell {
          flex: 0.4;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          }
      .sell-table {
        flex: 0.6;
      }
      .inputs{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
      }
      .options{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        justify-content: space-between;
      }
      `}</style>
    </>
  )
}

export async function getServerSideProps () {
  let methodPayments = []
  let employees = []
  try {
    const response = await axios.post(`${process.env.API_URL}/methods-payments`);
    methodPayments = response.data.methods;
  } catch (error) {
    console.log(error.Error)
  }

  try {
    const response = await axios.post(`${process.env.API_URL}/employees`);
    employees = response.data.employees;
  } catch (error) {
    console.log(error.Error)
  }
  console.log(methodPayments)
  return {
    props: {
      methodPayments,
      employees
    }
  }

}