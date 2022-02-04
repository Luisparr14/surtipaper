import db from '../../../lib/db';
export default function Sales (req, res) {
  let totalVendido = 0
  let totalHoy = 0
  const queryDetalles = `select detalle.id_factura,sum(detalle.cantidad*detalle.precio) as total, factura.empleado, factura.fecha from detalle inner join factura on factura.id_factura=detalle.id_factura group by detalle.id_factura order by factura.fecha desc`

  db.query(queryDetalles, async (err, resultQueryDetalles) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener los productos',
        error: err
      })
    }

    if (resultQueryDetalles.length === 0) {
      return res.status(405).json({
        ok: false,
        message: 'No hay ventas'
      })
    }

    let queryNombreEmpleado = `select concat(empleados.primer_nombre, ' ',empleados.primer_apellido) as "responsable" from empleados where empleados.no_empleado = ?`

    resultQueryDetalles.map((row, i) => {
      db.query(queryNombreEmpleado, [row.empleado], (err, resultQueryNombreEmpleado) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message: 'Error al obtener los productos',
            error: err
          })
        }

        if (resultQueryNombreEmpleado.length === 0) {
          return res.status(404).json({
            ok: false,
            message: 'No hay empleados'
          })
        }
        let today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
        let tomorrow = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1))

        if (row.fecha > today && row.fecha < tomorrow) {
          totalHoy += parseFloat(row.total)
        }

        totalVendido = totalVendido + parseFloat(row.total)
        if (!(i === resultQueryDetalles.length - 1)) {
          row.empleado = resultQueryNombreEmpleado[0].responsable
        } else {
          row.empleado = resultQueryNombreEmpleado[0].responsable
          return res.status(200).json({
            ok: true,
            sales: resultQueryDetalles,
            totalHistorico: totalVendido,
            totalHoy,
          })

        }
      })
    })
  })
}