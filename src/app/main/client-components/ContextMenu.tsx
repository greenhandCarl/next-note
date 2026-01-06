'use client';

import { FC } from "react";
import { createPortal } from "react-dom";


type Props = {
  x: number;
  y: number;
  options: { label: string; action: () => void }[];
  onClose: () => void;
}

const ContextMenu: FC<Props> = ({ x, y, options, onClose }) => {
  return createPortal(
    <ul style={{ top: y, left: x, position: 'fixed', background: 'white', border: '1px solid #ccc', padding: '10px', listStyle: 'none' }}>
      {options.map((option, index) => (
        <li key={index}>
          <button onClick={() => { option.action(); onClose(); }}>
            {option.label}
          </button>
        </li>
      ))}
    </ul>,
    document.body
  )
}

export default ContextMenu;