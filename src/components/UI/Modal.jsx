import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ children, open, cssClass = "" }) {
  const dialogRef = useRef();
  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialogRef} open={open} className={`modal ${cssClass}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
