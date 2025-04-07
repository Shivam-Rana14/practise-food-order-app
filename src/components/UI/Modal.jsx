import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ children, open, cssClass = "", onClose }) {
  const dialogRef = useRef();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      dialog.showModal();
    }

    return () => dialog.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialogRef} className={`modal ${cssClass}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
