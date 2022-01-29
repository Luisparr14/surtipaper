import db from "../../../lib/db"

export default function MinStock (req, res) {
  const querySelect = 'SELECT * FROM producto WHERE unidades <= 20'
  db.query(querySelect, (err, rows) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener los productos',
        error: err
      })
    }
    rows.length === 0 ? res.status(404).json({
      ok: false,
      message: 'No hay productos'
    }) : res.status(200).json({
      ok: true,
      message: 'Productos obtenidos',
      products: rows
    })
  })
}