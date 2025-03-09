import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * DeleteConfirmationModal component provides a confirmation dialog for deleting nodes
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {Function} props.onConfirm - Function to call when confirming deletion
 * @param {Object} props.node - The node to be deleted
 * @returns {JSX.Element} - Modal with confirmation dialog
 */
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, node }) => {
  // If modal is not open or no node is provided, don't render anything
  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl border w-full max-w-md relative overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-destructive flex items-center gap-2">
            <AlertTriangle size={18} />
            Delete Node
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded-full p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-4">
          <p className="mb-2">Are you sure you want to delete the following node?</p>
          <div className="bg-muted p-3 rounded-md mb-4">
            <p className="font-medium">{node.name}</p>
            {node.children && node.children.length > 0 && (
              <p className="text-sm text-destructive mt-2">
                Warning: This node has {node.children.length} child node(s) that will also be deleted.
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
        </div>

        {/* Modal actions */}
        <div className="flex justify-end space-x-2 p-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-accent"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(node)}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;