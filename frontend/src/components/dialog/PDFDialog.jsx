import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ReviewDialog from "./ReviewDialog";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFDialog = ({ data, onClose }) => {
  const [openReview, setOpenReview] = useState(false);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!data) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex flex-1 w-1/2 h-1/2">
          <Document
            className="w-1/2 h-1/2"
            file={`http://127.0.0.1:8000/${data.lesson_plan}`}
            onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={index} pageNumber={index + 1} />
            ))}
          </Document>
        </div>

        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>

    // <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    //   <div className="bg-white w-11/12 max-w-5xl h-[90vh] rounded-lg flex flex-col gap-y-2">
    //     {/* Header */}
    //     <div className="p-4 border-b flex justify-between">
    //       <h2 className="font-semibold">Lesson Plan Preview</h2>
    //       <button onClick={onClose}>✕</button>
    //     </div>

    //     {/* PDF Viewer */}
    //     <div className="flex flex-row flex-1">
    //       <iframe
    //         src={`http://127.0.0.1:8000/${data.lesson_plan}`}
    //         className="w-full h-full"
    //       />
    //     </div>

    //     <button
    //       className="border border-green-500 rounded-full"
    //       onClick={() => setOpenReview(true)}
    //     >
    //       Review Lesson Plan
    //     </button>

    //     <div>{data.teacherName}</div>
    //   </div>

    //   {openReview && <ReviewDialog onClose={() => setOpenReview(false)} />}
    // </div>
  );
};

export default PDFDialog;
