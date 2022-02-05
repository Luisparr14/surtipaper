import db from '../../../lib/db';
export default function AllProviders (req, res) {
  if (req.method === 'GET') {
    db.query(`SELECT * FROM proveedores`, (err, results) => {
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
          message: 'No se encontraron proveedores'
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Proveedores encontrados',
        proveedores: results
      })

    })
  } else {
    return res.status(405).json({
      ok: false,
      message: 'Metodo no permitido'
    })
  }
}