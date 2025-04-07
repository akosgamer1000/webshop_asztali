/**
 * Confirm Dialog Component
 * 
 * A reusable modal dialog component for confirming user actions.
 * Features:
 * - Customizable title and message
 * - Configurable button text
 * - Multiple visual variants (danger, warning, info)
 * - Backdrop overlay
 * - Responsive design
 */

import React from 'react';

/**
 * Props interface for the ConfirmDialog component
 * @property {boolean} isOpen - Controls whether the dialog is visible
 * @property {string} title - Text to display in the dialog header
 * @property {string} message - Main content text of the dialog
 * @property {string} [confirmText] - Text for the confirm button (defaults to 'Confirm')
 * @property {string} [cancelText] - Text for the cancel button (defaults to 'Cancel')
 * @property {() => void} onConfirm - Callback function when confirm is clicked
 * @property {() => void} onCancel - Callback function when cancel is clicked
 * @property {'danger' | 'warning' | 'info'} [variant] - Visual style of the dialog (defaults to 'warning')
 */
interface ConfirmDialogProps {
  isOpen: boolean;           // Controls dialog visibility
  title: string;            // Dialog title
  message: string;          // Dialog message content
  confirmText?: string;     // Text for confirm button (default: 'Confirm')
  cancelText?: string;      // Text for cancel button (default: 'Cancel')
  onConfirm: () => void;    // Callback for confirm action
  onCancel: () => void;     // Callback for cancel action
  variant?: 'danger' | 'warning' | 'info';  // Visual style variant
}

/**
 * A modal dialog component for confirming user actions
 * @param {ConfirmDialogProps} props - Component properties
 * @returns {JSX.Element | null} The dialog component or null if not open
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,                    // Controls dialog visibility
  title,                    // Dialog title text
  message,                  // Dialog message content
  confirmText = 'Confirm',  // Text for confirm button
  cancelText = 'Cancel',    // Text for cancel button
  onConfirm,                // Confirm action callback
  onCancel,                 // Cancel action callback
  variant = 'warning'       // Visual style variant
}) => {
  // Don't render if dialog is closed
  if (!isOpen) return null;

  /**
   * Returns the appropriate button classes based on the variant
   * @returns {string} Tailwind CSS classes for the confirm button
   */
  const getButtonClasses = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-500 hover:bg-red-600';      // Red styling for danger actions
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600'; // Yellow styling for warnings
      case 'info':
      default:
        return 'bg-blue-500 hover:bg-blue-600';    // Blue styling for info/neutral actions
    }
  };

  return (
    // Backdrop overlay - covers the entire screen with semi-transparent black
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Dialog container - white background with rounded corners and shadow */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {/* Dialog header - bold title text */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        
        {/* Dialog content - message text in gray */}
        <p className="mb-6 text-gray-700">{message}</p>
        
        {/* Action buttons - right-aligned with spacing */}
        <div className="flex justify-end gap-3">
          {/* Cancel button - gray styling */}
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            {cancelText}
          </button>
          
          {/* Confirm button - variant-based styling */}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded ${getButtonClasses()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 