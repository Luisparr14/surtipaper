import handleError from '../../../helpers/handleError';
import database from '../../../lib/db';
export default function AddEmployee (req, res) {
  const { codigo, nombre, telefono } = req.body;
  const params = [codigo, nombre, telefono];
  const sql = `INSERT INTO proveedores (codigo,nombre,telefono)VALUES(?,?,?)`

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
          message: 'No se pudo agregar el proveedor'
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Proveedor agregado correctamente'
      })

    })
  } else {
    return res.status(405).json({
      ok: false,
      message: 'Metodo no permitido'
    })
  }
}