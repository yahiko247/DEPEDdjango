import React from "react";

const LessonPlanModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[420px] bg-white rounded-xl shadow-2xl p-6 animate-[fadeIn_.2s_ease-in-out]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-semibold">
            📄 Submit Your Lesson Plan
          </h2>
          <button
            onClick={onClose}
            className="text-xl hover:text-gray-600 transition"
          >
            &times;
          </button>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Select File</label>
          <input
            type="file"
            className="w-full text-sm border border-gray-300 rounded-lg p-2 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 hover:file:bg-gray-200"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Description (Optional)
          </label>
          <textarea
            placeholder="Add notes about this lesson plan..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none h-24"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition">
          ⬆ Submit Lesson Plan
        </button>
      </div>
    </div>
  );
};

export default LessonPlanModal;
