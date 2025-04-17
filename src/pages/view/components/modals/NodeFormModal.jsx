
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NodeFormModal = ({ isOpen, onClose, onSubmit, initialData, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    content: '',
    explanation: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || '',
        content: initialData.content || '',
        explanation: initialData.explanation || ''
      });
    } else {
      setFormData({
        name: '',
        type: '',
        content: '',
        explanation: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      type: '',
      content: '',
      explanation: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-blue-400">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white rounded-full p-1 hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
              Node Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              autoFocus
            />
          </div>

          <input
            type="hidden"
            id="type"
            name="type"
            value={formData.type}
          />

          {(!formData.type || formData.type === 'pasal' || formData.type === 'ayat') && (
            <>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter content here..."
                />
              </div>

              <div>
                <label htmlFor="explanation" className="block text-sm font-medium mb-2 text-gray-700">
                  Explanation
                </label>
                <textarea
                  id="explanation"
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter explanation here..."
                />
              </div>
            </>
          )}

          {formData.type && ['bab', 'bagian', 'paragraf'].includes(formData.type) && (
            <div className="bg-blue-50 text-blue-600 p-4 rounded-lg text-sm">
              {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} nodes can only have their title edited.
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
