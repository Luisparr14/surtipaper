export default async function ProductsId (req, res) {
  const { id } = req.query
  let product = null;
  const response = await fetch(`http://localhost:3000/api/products`);
  const datos = await response.json();

  datos.map(prod => {
    if (prod.id == id) {
      product = prod;
    }
  })
  
  product === null
    ? res.status(404).json({ message: "Product not found" })
    : res.status(200).json(product)

}
