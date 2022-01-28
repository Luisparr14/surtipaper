import db from '../../../lib/db';
export default function CreateBill (req, res) {
  const { empleado, metodoPago } = req.body;
  const params = [empleado, metodoPago];
  const queryFunction = `SELECT crear_factura(?,?) as id`

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
        nombre: 'No se pudo crear la factura'
      });
    }

    return res.status(200).json({
      ok: true,
      idFactura:results[0].id
    })

  })

}