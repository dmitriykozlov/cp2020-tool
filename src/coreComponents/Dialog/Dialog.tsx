import React, { ReactNode } from "react";
import c from "./dialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type DialogProps = {
  children: ReactNode;
  onClose?: () => void;
};

export const Dialog: React.FC<DialogProps> = ({ children, onClose }) => {
  return (
    <div className={c.overlay}>
      <div className={c.dialogContainer}>
        <div className={c.closeBlock} onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className={c.content}>{children}</div>
      </div>
    </div>
  );
};
