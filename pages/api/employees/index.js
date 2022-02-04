import db from '../../../lib/db';
export default function Employees (req, res) {
  const queryEmployees = `SELECT empleados.no_empleado as "id", concat(empleados.primer_nombre, ' ',empleados.primer_apellido) as "nombre", empleados.* FROM empleados`;
  db.query(queryEmployees, (err, employeesResults) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: 'Internal Server Error',
        err
      });
    }
    if (employeesResults.length === 0) {
      return res.status(404).json({
        ok: false,
        nombre: 'No hay empleados registrados'
      });
    }
    return res.status(200).json({
      ok: true,
      employees: employeesResults
    });
  })
}