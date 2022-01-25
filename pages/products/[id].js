export default function ProductsId ({ id, name }) {
  return (
    <div>
      <h1>Products {id}</h1>
      <h2>Name: {name}</h2>
    </div>
  )
}

export async function getStaticPaths () {
  const response = await fetch('https://61ecbd30f3011500174d2201.mockapi.io/api/v1/productos')
  const products = await response.json()

  const paths = products.map(product => {
    return ({
      params: {
        id: product.codigo
      }
    })
  })
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const response = await fetch(`https://61ecbd30f3011500174d2201.mockapi.io/api/v1/productos/${params.id}`)
  const product = await response.json()
  return {
    props: {
      id: product.codigo,
      name: product.articulo,
    }
  }
}
