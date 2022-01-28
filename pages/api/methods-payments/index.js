import db from '../../../lib/db';
export default function MethodPayments (req, res) {
  const queryMethodPayments = `SELECT forma_pago.id_pago as "id", nombre FROM  forma_pago`;
  db.query(queryMethodPayments, (err, methodsResults) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: 'Internal Server Error',
        err
      });
    }
    if (methodsResults.length === 0) {
      return res.status(404).json({
        ok: false,
        nombre: 'No hay formas de pago registradas'
      });
    }
    return res.status(200).json({
      ok: true,
      methods: methodsResults
    });
  })
}