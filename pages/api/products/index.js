export default function Products (req, res) {
  const products = [
    {
      id: 1,
      name: 'Arrox',
      price: 100
    },
    {
      id: 2,
      name: 'Celudar',
      price: 203
    },
    {
      id: 3,
      name: 'Xiaomi',
      price: 43
    },
    {
      id: 4,
      name: 'Samsung',
      price: 203
    },
  ]
  return res.status(200).json(products)
}