import handleError from '../../../helpers/handleError';
import database from '../../../lib/db';
export default function AddEmployee (req, res) {
  const { nombre, apellido, cedula, entrada, salida, telefono, direccion, sueldo } = req.body;
  const params = [cedula, nombre, apellido, `${entrada} - ${salida}`, direccion, sueldo, telefono];
  const sql = `INSERT INTO empleados (cc,primer_nombre,primer_apellido,horario,direccion,sueldo,telefono)VALUES(?,?,?,?,?,?,?)`

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
        message: 'No se pudo agregar el empleado'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Empleado agregado'
    })

  })
}