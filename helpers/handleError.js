export default function handleError (err) {
  switch (err.code) {
    case "ER_DUP_ENTRY":
      return "El codigo de producto ya existe";
    case "ER_NO_REFERENCED_ROW":
      return "El codigo de producto no existe";
    case "ER_WARN_DATA_OUT_OF_RANGE":
      return "La cantidad seleccionada es mayor a la existente / menor a 0";
    case "ER_BAD_NULL_ERROR":
      return "Asegurese de que los datos sean validos";
    case "ER_SP_WRONG_NO_OF_ARGS":
      return "Asegurese de que los datos sean validos";
    case "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD":
      return "Asegurese de que los datos sean validos";
    default:
      return "Error de servidor";
  }
}

