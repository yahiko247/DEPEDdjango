import React from "react";

const PDFDialog = ({ file, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-5xl h-[90vh] rounded-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-semibold">Lesson Plan Preview</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1">
          <iframe src={file} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default PDFDialog;
