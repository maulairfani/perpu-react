import React from 'react';

/**
 * NodeContent component displays the content of a selected node
 * 
 * @param {Object} node - The node data containing content to display
 * @returns {JSX.Element} - Rendered content with appropriate styling
 */
export default function NodeContent({ node }) {
  return (
    <div className="ml-6 p-2 bg-muted rounded-md text-sm">
      {/* Main content text */}
      {node.content && (
        <p className="text-foreground">{node.content}</p>
      )}
      
      {/* Optional description */}
      {node.description && (
        <p className="mt-1 text-muted-foreground">{node.description}</p>
      )}
      
      {/* Optional explanation */}
      {node.explanation && (
        <p className="mt-1 text-muted-foreground">{node.explanation}</p>
      )}
    </div>
  );
}