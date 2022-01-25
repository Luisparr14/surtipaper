export const Table = ({
  data,
  columns,
  title
}) => {
  return (
    <>
      <div className="table-container">
        <div className="table-title">
          {title}
        </div>
        {/* <label className="title">Productos sin existencias</label> */}
        <table className='table'>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                {columns.map(column => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-title {
          padding: 10px;
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 23px;
          color: #000000;
        }
        .table-container {
          width: 100%;
          overflow-y: auto;
          max-height: 250px;
          background-color: var(--primaryColor);
          border-radius: 10px;
          margin: 10px 0;
          padding: 0 10px 10px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          border-radius: 10px;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        tr:hover {
          background-color: #b0b0b0;
        }
        `}</style>
    </>
  )
}