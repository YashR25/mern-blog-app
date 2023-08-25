import React from "react";
import "./Typewriter.css";

function Typewriter({ text }) {
  return (
    <div className="Typewriter">
      {text.map((item, index) => {
        console.log(item);
        return (
          <span
            style={{
              "--i": `${index}`,
            }}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default Typewriter;
