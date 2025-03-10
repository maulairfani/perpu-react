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
    type: '',
    content: '',
    explanation: ''
  });

  // Initialize form with data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || '',
        content: initialData.content || '',
        explanation: initialData.explanation || ''
      });
    } else {
      // Reset form when adding new node
      setFormData({
        name: '',
        type: '',
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
      <div className="bg-card/95 backdrop-blur-sm rounded-xl shadow-xl border border-border/10 w-full max-w-md relative overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-border/10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <h3 className="text-sm font-medium text-primary-foreground/90">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded-full p-1 hover:bg-primary/10 transition-colors duration-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-4">
            {/* Node name field */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium mb-1.5 text-foreground/80">
                Node Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-background/50 border border-border/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-shadow duration-200"
                required
              />
            </div>

            {/* Node type field (hidden, will be set programmatically) */}
            <input
              type="hidden"
              id="type"
              name="type"
              value={formData.type}
            />
            
            {/* Content and explanation fields only for Pasal and Ayat */}
            {(!formData.type || formData.type === 'pasal' || formData.type === 'ayat') && (
              <>
                {/* Node content field */}
                <div>
                  <label htmlFor="content" className="block text-xs font-medium mb-1.5 text-foreground/80">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 text-sm bg-background/50 border border-border/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-shadow duration-200 resize-none"
                  />
                </div>

                {/* Node explanation field */}
                <div>
                  <label htmlFor="explanation" className="block text-xs font-medium mb-1.5 text-foreground/80">
                    Explanation
                  </label>
                  <textarea
                    id="explanation"
                    name="explanation"
                    value={formData.explanation}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-background/50 border border-border/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-shadow duration-200 resize-none"
                  />
                </div>
              </>
            )}
            
            {/* Display message for BAB, Bagian, and Paragraf */}
            {formData.type && ['bab', 'bagian', 'paragraf'].includes(formData.type) && (
              <div className="text-xs text-muted-foreground bg-muted/10 backdrop-blur-sm p-3 rounded-lg border border-border/5">
                {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} nodes can only have their title edited.
              </div>
            )}
          </div>

          {/* Form actions */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium border border-border/10 rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium bg-primary/90 hover:bg-primary text-primary-foreground rounded-lg transition-colors duration-200"
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