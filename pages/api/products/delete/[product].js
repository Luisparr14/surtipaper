import handleError from '../../../../helpers/handleError';
import connection from '../../../../lib/db';
export default function Delete (req, res) {
  const { product } = req.query
  if (req.method === 'DELETE') {
    console.log(product)
    const sql = `DELETE FROM producto WHERE codigo = '${product}'`

    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: handleError(err)
        })
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: 'No se pudo eliminar el producto'
        })
      }

      return res.status(200).json({
        ok: true,
        message: 'Producto eliminado'
      })
    })
  } else {
    res.status(405).json({
      ok: false,
      message: 'Method not allowed'
    })
  }

}