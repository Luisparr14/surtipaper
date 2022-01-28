import db from '../../../lib/db';
export default function CancelSale (req, res) {
  const { idFactura } = req.body
  const queryCancelSale = `call cancelarCompra(${idFactura})`;
  db.query(queryCancelSale, (err, result) => {
    console.log(result)
    if (err) {
      console.log(err)
      res.status(500).json({
        ok: false,
        message: 'Error al cancelar la venta'
      })
    } else {
      res.status(200).json({
        ok: true,
        message: 'Venta cancelada'
      })
    }
  }
  )
}