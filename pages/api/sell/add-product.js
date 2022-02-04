import handleError from '../../../helpers/handleError';
import db from '../../../lib/db';
export default function AddProduct (req,res){
  const { factura, cantidad,producto } = req.body;
  const params = [producto,cantidad,factura];
  const queryFunction = `SELECT agregarProductoADetalle(?,?,?) as estado`

  db.query(queryFunction, params, (err, results) => {
    if (err) {

      return res.status(500).json({
        ok: false,
        error: 'Error de servidor',
        message: handleError(err),
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