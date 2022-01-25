export default function Button ({ title, backGroundColor }) {
  return (
    <button>
      {title}
      <style jsx>{`
          button {
            background-color: ${backGroundColor};
            color: #000;
            border: 2px solid rgba(255, 255, 255, 0);
            border-radius: 10px;
            padding: 10px;
            font-family: Roboto sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 23px;
            line-height: 23px;
            cursor: pointer;
            margin: 5px 0;
          }
          button:hover {
            border-color: var(--primaryColor);
          }
        `}</style>
    </button>
  )
}