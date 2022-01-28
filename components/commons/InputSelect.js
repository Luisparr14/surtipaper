export default function InputSelect ({ id, width, height, text, options, onChange }) {
  return (
    <>
      <label htmlFor={id} className="input-label">{text}</label>
      <select id={id} className="input-select" onChange={onChange}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.nombre}</option>
        ))}
      </select>
      <style jsx>{`
        .input-select {
          width: ${width || '100%'};
          height: ${height || '40px'};
          border-radius: 5px;
          border: 1px solid var(--primaryColor);
          padding: 0 10px;
          margin: 5px 5px;
          font-size: 14px;
        }
        .input-label {
          font-size: 14px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  )
}