import handleError from '../../../helpers/handleError';
import database from '../../../lib/db';
export default function AddMethodPayment (req, res) {
  const { metodoPago } = req.body;
  const sql = `INSERT INTO  forma_pago (nombre)VALUES(?);`

  database.query(sql, metodoPago, (err, results) => {
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
        message: 'No se pudo agregar el empleado'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Empleado agregado'
    })

  })
}