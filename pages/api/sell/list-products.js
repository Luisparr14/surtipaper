import db from '../../../lib/db';
export default function ListProducts (req, res) {
  let lista=[]
  const { idFactura } = req.body;
  const queryListProducts = `select detalle.id_producto, sum(detalle.cantidad) as \`cantidad\`, detalle.precio, (detalle.cantidad*detalle.precio) as 'total' from detalle inner join factura on detalle.id_factura = ${idFactura} and factura.id_factura= ${idFactura} group by id_producto`;
  db.query(queryListProducts, (err, productsResults) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: 'Internal Server Error',
        err
      });
    }
    if (productsResults.length === 0) {
      return res.status(404).json({
        ok: false,
        nombre: 'No hay productos registrados'
      });
    }

    productsResults.map((product, i) => {
      const queryProduct = `SELECT articulo FROM producto WHERE codigo = '${product.id_producto}'`
      db.query(queryProduct, (err, productResult) => {
        if (!(i === productsResults.length - 1)) {
          let array = {
            "codigo": product.id_producto,
            "cantidad": product.cantidad,
            "precio": product.precio,
            "total": parseFloat(product.precio) * parseFloat(product.cantidad),
            "articulo": productResult[0].articulo
          }
          lista.push(array)
        } else {
          let array = {
            "codigo": product.id_producto,
            "cantidad": product.cantidad,
            "precio": product.precio,
            "total": parseFloat(product.precio) * parseFloat(product.cantidad),
            "articulo": productResult[0].articulo
          }
          lista.push(array)
          return res.status(200).json({
            ok: true,
            productsList: lista
          });
        }
      })
    })
  })
}