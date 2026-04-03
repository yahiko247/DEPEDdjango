import React from "react";
import { FaReact } from "../../icons/index.js";
import ErrorAlert from "../alerts/ErrorAlert.jsx";
const ConfirmDialog = ({
  isOpen,
  closeAll,
  onClose,
  headerText,
  children,
  confirmButton,
}) => {
  return (
    <>
      <dialog open={isOpen} className="modal">
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            X
          </button>
          <h3 className="font-bold text-lg">{headerText}</h3>
          <p className="py-4">{children}</p>
          <div className="flex flex-row justify-evenly">
            <button
              className="btn btn-outline"
              onClick={() => {
                closeAll();
                confirmButton();
              }}
            >
              Confirm
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ConfirmDialog;
