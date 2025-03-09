import { useState } from 'react';

/**
 * Custom hook to manage tree node state and behavior
 * 
 * @param {Object} node - The node data to manage state for
 * @returns {Object} - State and handler functions for the node
 */
export default function useTreeNode(node) {
  // Track expansion state (whether children are visible)
  const [isExpanded, setIsExpanded] = useState(false);
  // Track hover state for styling
  const [isHovered, setIsHovered] = useState(false);

  // Determine if node has children or content
  const hasChildren = node.children && node.children.length > 0;
  const hasContent = node.content || node.description;

  /**
   * Toggle the expanded state of the node
   * Only allows toggling if the node has children or content
   */
  const toggleExpand = () => {
    if (hasChildren || hasContent) {
      setIsExpanded(!isExpanded);
    }
  };

  // Mouse event handlers for hover effects
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isExpanded,
    isHovered,
    hasChildren,
    hasContent,
    toggleExpand,
    handleMouseEnter,
    handleMouseLeave
  };
}