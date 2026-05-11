import React, { useState } from "react";
import { FaReact } from "../../icons/index.js";
import ErrorAlert from "../alerts/ErrorAlert.jsx";
const ConfirmDialog = ({
  isOpen,
  onClose,
  headerText,
  children,
  confirmButton,
  loading,
}) => {
  const handleClose = () => {
    if (loading) return;
    onClose();
  };
  return (
    <>
      <dialog
        open={isOpen}
        className="modal"
        onCancel={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">{headerText}</h3>
          <div className="py-4">{children}</div>
          <div className="flex flex-row justify-evenly">
            <button
              disabled={loading}
              className="btn btn-outline"
              onClick={() => {
                // closeAll();
                confirmButton();
              }}
            >
              {loading ? (
                <span>
                  <div className="loading loading-spinner loading-md" /> Saving
                </span>
              ) : (
                "Save"
              )}
            </button>
            <button
              disabled={loading}
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button
            onClick={(e) => {
              if (loading) {
                e.preventDefault();
              } else {
                onClose();
              }
            }}
            className={loading ? "cursor-default" : "cursor-pointer"}
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
};

export default ConfirmDialog;
