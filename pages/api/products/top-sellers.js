import db from '../../../lib/db';
export default function TopSeller (req, res) {
  let topSellers = []
  const querySelect1 = `select id_producto, sum(cantidad) as vendido from detalle group by id_producto order by vendido desc`
  db.query(querySelect1, async (err, resultQuery1) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: 'Error al obtener los productos'
      })
    }

    if (resultQuery1.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No hay productos vendidos'
      })
    }

    resultQuery1.map((row, i) => {
      const selectTopSeller = `select * from producto where codigo = '${row.id_producto}'`
      db.query(selectTopSeller, (err, resultTopSeller) => {
        let array={};
        if (err) {
          return res.status(500).json({
            ok: false,
            message: 'Error al obtener los productos'
          })
        }
        if (!(i === resultQuery1.length - 1)) {
          array = {
            codigo: resultTopSeller[0].codigo,
            articulo: resultTopSeller[0].articulo,
            vendido: row.vendido
          }
          topSellers.push(array)
        } else {
          array = {
            codigo: resultTopSeller[0].codigo,
            articulo: resultTopSeller[0].articulo,
            vendido: row.vendido
          }
          topSellers.push(array)
          return res.status(200).json({
            ok: true,
            products: topSellers
          })
        }
      })
    })
  })
}
