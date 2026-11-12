import { useState } from "react";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button className="accordion__head" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="accordion__body">{children}</div>}
    </div>
  );
}