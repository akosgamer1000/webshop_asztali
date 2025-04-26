/**
 * @file ConfirmDialog.tsx
 * @module UI/Components/Common
 * @description Confirm Dialog Component
 * 
 * A reusable modal dialog component for confirming user actions.
 * Features:
 * - Customizable title and message
 * - Configurable button text
 * - Multiple visual variants (danger, warning, info)
 * - Responsive design
 * - Accessible dialog implementation
 * - Simple API with callback functions
 * 
 * This component provides a standardized way to ask for user confirmation
 * before performing potentially destructive or important actions.
 * It displays as a modal dialog positioned in the center of the screen.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import React from 'react';

/**
 * Props interface for the ConfirmDialog component
 * @interface ConfirmDialogProps
 * @property {boolean} isOpen - Controls whether the dialog is visible
 * @property {string} title - Text to display in the dialog header
 * @property {string} message - Main content text of the dialog
 * @property {string} [confirmText='Confirm'] - Text for the confirm button (defaults to 'Confirm')
 * @property {string} [cancelText='Cancel'] - Text for the cancel button (defaults to 'Cancel')
 * @property {() => void} onConfirm - Callback function when confirm is clicked
 * @property {() => void} onCancel - Callback function when cancel is clicked
 * @property {'danger' | 'warning' | 'info'} [variant='warning'] - Visual style of the dialog (defaults to 'warning')
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
 * @component
 * @param {ConfirmDialogProps} props - Component properties
 * @param {boolean} props.isOpen - Controls dialog visibility
 * @param {string} props.title - Dialog title text
 * @param {string} props.message - Dialog message content
 * @param {string} [props.confirmText='Confirm'] - Text for confirm button
 * @param {string} [props.cancelText='Cancel'] - Text for cancel button
 * @param {() => void} props.onConfirm - Callback function for confirm action
 * @param {() => void} props.onCancel - Callback function for cancel action
 * @param {'danger' | 'warning' | 'info'} [props.variant='warning'] - Visual style variant
 * @returns {JSX.Element | null} The dialog component or null if not open
 * @example
 * <ConfirmDialog
 *   isOpen={showDialog}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item?"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDialog(false)}
 *   variant="danger"
 * />
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
   * @function getButtonClasses
   * @returns {string} Tailwind CSS classes for the confirm button
   * @inner
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
    // Fixed positioning in the center of the screen, no backdrop
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      {/* Dialog container with additional border for better visibility */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full border border-gray-300">
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