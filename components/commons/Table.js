export const Table = ({
  data,
  columns,
  title, 
  maxHeight,
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
              <tr key={`${row.id}-${Math.floor(Math.random()*100000)}`}>
                {columns.map(column => {
                  if (column.key === 'fecha') {
                    let date = new Date(row[column.key]).toLocaleString();
                    return <td key={column.key}>{date}</td>
                  }else{
                    return <td key={column.key}>{row[column.key]}</td>
                  }
                })}
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
          overflow-y: scroll;
          background-color: var(--primaryColor);
          border-radius: 10px;
          margin: 10px 0;
          border: 10px solid var(--primaryColor);
          border-right: 0;
          flex: 1;
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