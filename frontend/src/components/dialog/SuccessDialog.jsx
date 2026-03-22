import React from "react";
import { FaCheckCircle } from "../../icons/index.js";

const SuccessDialog = ({ isOpen, onClose }) => {
  return (
    <>
      <dialog className="modal" open={isOpen}>
        <div className="modal-box ">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold text-lg text-green-400">Success!</h3>
            <FaCheckCircle
              className={`absolute text-green-500 text-5xl transition-all duration-300 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default SuccessDialog;
