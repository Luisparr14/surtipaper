import db from '../../../lib/db';
import handleError from '../../../helpers/handleError';
export default function UpdateProduct (req, res) {
  const { codigo, cantidad } = req.body;
  const params = [codigo, cantidad];
  const queryFunction = `call SumarCantidadAProducto(?,?)`
  
  db.query(queryFunction, params, (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: 'Error de servidor',
        message: handleError(err),
        err
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'El codigo de producto no existe',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Producto actualizado'
    })

  })
}