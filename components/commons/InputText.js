export default function InputText ({ type, placeHolder, id, width, height, onChange, value }) {
  return (
    <>
      <input id={id} className="input" type={type} placeholder={placeHolder} onChange={onChange} value={value} min={0} max={1000}/>
      <style jsx>{`
        .input {
          width: ${width};
          height: ${height};
          border-radius: 5px;
          border: 1px solid var(--primaryColor);
          padding: 0 10px;
          margin: 5px 5px;
          font-size: 14px;

        }
      `}</style>
    </>
  )
}
