import handleError from '../../../helpers/handleError';
import db from '../../../lib/db';
export default function AddNewProduct (req, res) {
  console.log(req.body);
  const { codigo, nombre, cantidad, precio, marca} = req.body;
  const params = [codigo, nombre, cantidad, precio, marca];

  const queryFunction = `call InsertarProducto(?,?,?,?,?)`

  db.query(queryFunction, params, (err, results) => {
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
        nombre: 'No se pudo agregar el producto'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Producto agregado'
    })

  })
}   