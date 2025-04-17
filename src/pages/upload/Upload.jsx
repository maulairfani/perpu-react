
import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    
    // Simulate file upload for each file
    acceptedFiles.forEach((file) => {
      const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));

          if (progress >= 100) {
            clearInterval(interval);
            setUploadedFiles((prev) => [...prev, file]);
            setFiles((prev) => prev.filter((f) => f.name !== file.name));
          }
        }, 500);
      };

      simulateUpload();
    });
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onDrop(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onDrop(selectedFiles);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Unggah Dokumen</h1>
      
      {/* Upload area */}
      <div
        className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Choose file
          </label>
          <p className="text-sm text-muted-foreground">
            or drag and drop files here
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, DOCX, XLS, XLSX
          </p>
        </div>
      </div>

      {/* Upload progress */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Uploading files</h2>
          {files.map((file) => (
            <div key={file.name} className="bg-card rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-sm text-muted-foreground">
                  {uploadProgress[file.name]}%
                </span>
              </div>
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress[file.name]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Uploaded files</h2>
          <div className="grid gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between bg-card rounded-lg p-4"
              >
                <span className="text-sm font-medium">{file.name}</span>
                <button
                  onClick={() => setUploadedFiles((prev) => prev.filter((f) => f !== file))}
                  className="p-1 hover:bg-primary/10 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
