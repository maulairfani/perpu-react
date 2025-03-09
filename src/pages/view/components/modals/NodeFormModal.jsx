import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * NodeFormModal component provides a form for adding or editing nodes
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {Function} props.onSubmit - Function to call when submitting the form
 * @param {Object} props.initialData - Initial data for editing (null for new nodes)
 * @param {string} props.title - Modal title ("Add Node" or "Edit Node")
 * @returns {JSX.Element} - Modal with form for node data
 */
const NodeFormModal = ({ isOpen, onClose, onSubmit, initialData, title }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    explanation: ''
  });

  // Initialize form with data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        content: initialData.content || '',
        explanation: initialData.explanation || ''
      });
    } else {
      // Reset form when adding new node
      setFormData({
        name: '',
        content: '',
        explanation: ''
      });
    }
  }, [initialData, isOpen]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl border w-full max-w-md relative overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded-full p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Node name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Node Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background"
                required
              />
            </div>

            {/* Node content field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md bg-background resize-none"
              />
            </div>

            {/* Node explanation field */}
            <div>
              <label htmlFor="explanation" className="block text-sm font-medium mb-1">
                Explanation
              </label>
              <textarea
                id="explanation"
                name="explanation"
                value={formData.explanation}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md bg-background resize-none"
              />
            </div>
          </div>

          {/* Form actions */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NodeFormModal;