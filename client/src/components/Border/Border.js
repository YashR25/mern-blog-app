import React from "react";

function Border({ width }) {
  return (
    <div className={`w-[${width}]`}>
      <div
        class={`border-2 w-[100%] border-blue-700 mt-1 rounded-sm animate-width`}
      ></div>
    </div>
  );
}

export default Border;
