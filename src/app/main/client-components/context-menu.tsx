'use client';

import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from 'clsx'


type Props = {
  x: number;
  y: number;
  options: { label: string; action: () => void }[];
  onClose: () => void;
}

const ContextMenu: FC<Props> = ({ x, y, options, onClose }) => {
  const portalRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const handleDocClick = (e: Event) => {
      if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.body.addEventListener('click', handleDocClick)

    return () => {
      document.body.removeEventListener('click', handleDocClick)
    }
  }, [])

  return createPortal(
    <ul
      style={{ top: y, left: x }}
      className="fixed bg-white shadow-sm cursor-pointer"
      ref={portalRef}
    >
      {options.map((option, index) => (
        <li key={index} className="px-[20px]">
          <button
            className={clsx("cursor-pointer h-[32px] flex items-center text-[14px]", index !== 0 && "border-t-[1px] border-line-2")}
            onClick={() => { option.action(); onClose(); }}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>,
    document.body
  )
}

export default ContextMenu;