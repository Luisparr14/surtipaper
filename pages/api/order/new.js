import handleError from '../../../helpers/handleError';
import database from '../../../lib/db';
export default function AddEmployee (req, res) {
  const { producto, cantidad, proveedor } = req.body;
  const params = [producto, cantidad, proveedor];
  const sql = `INSERT INTO pedidos(codigo_producto,cantidad,codigo_proveedor)VALUES(?,?,?);`

  if (req.method === 'POST') {
    database.query(sql, params, (err, results) => {
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
          message: 'No se pudo agregar el pedido'
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Pedido agregado correctamente'
      })

    })
  } else {
    return res.status(405).json({
      ok: false,
      message: 'Metodo no permitido'
    })
  }
}