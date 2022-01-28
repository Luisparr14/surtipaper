import db from '../../../lib/db';
export default function AddProduct (req,res){
  const { factura, cantidad,producto } = req.body;
  const params = [producto,cantidad,factura];
  const queryFunction = `SELECT agregarProducto(?,?,?) as estado`

  db.query(queryFunction, params, (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: 'Internal Server Error',
        err
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        ok: false,
        nombre: 'No se pudo agregar el producto'
      });
    }

    return res.status(200).json({
      ok: true,
      estado:results[0].estado
    })

  })
}