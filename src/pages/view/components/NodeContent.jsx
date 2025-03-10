import React, { useEffect, useState } from 'react';
import { useTree } from './context/TreeContext';

/**
 * NodeContent component displays the content of a selected node
 * If the node is part of a Pasal, it displays all content from that Pasal
 * 
 * @param {Object} node - The node data containing content to display
 * @returns {JSX.Element} - Rendered content with appropriate styling
 */
export default function NodeContent({ node }) {
  const { treeData } = useTree();
  const [pasalNode, setPasalNode] = useState(null);
  const [hierarchyPath, setHierarchyPath] = useState([]);
  
  useEffect(() => {
    // Find the Pasal node when the selected node changes
    if (node) {
      if (node.type === 'pasal') {
        // If the node itself is a Pasal, use it directly
        setPasalNode(node);
        // Find the hierarchy path for this Pasal
        const path = findNodeHierarchy(treeData, node);
        setHierarchyPath(path);
      } else if (node.type === 'ayat') {
        // If it's an Ayat, we need to find its parent Pasal
        const foundPasal = findParentPasal(treeData, node);
        setPasalNode(foundPasal || node);
        // Find the hierarchy path for this Ayat's Pasal
        const path = findNodeHierarchy(treeData, foundPasal || node);
        setHierarchyPath(path);
      } else {
        // For other nodes, just use the node itself
        setPasalNode(node);
        // Find the hierarchy path for this node
        const path = findNodeHierarchy(treeData, node);
        setHierarchyPath(path);
      }
    }
  }, [node, treeData]);
  
  /**
   * Find the hierarchy path from root to the given node
   * 
   * @param {Array} nodes - The tree data to search in
   * @param {Object} targetNode - The node to find the path for
   * @param {Array} currentPath - The current path being built
   * @returns {Array} - Array of nodes representing the path
   */
  const findNodeHierarchy = (nodes, targetNode, currentPath = []) => {
    if (!nodes || !targetNode) return [];
    
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    
    for (const currentNode of nodeArray) {
      // Check if this is the target node
      if (currentNode === targetNode) {
        return [...currentPath, currentNode];
      }
      
      // Recursively search children
      if (currentNode.children && currentNode.children.length > 0) {
        const path = findNodeHierarchy(
          currentNode.children, 
          targetNode, 
          [...currentPath, currentNode]
        );
        if (path.length > 0) return path;
      }
    }
    
    return [];
  };
  
  /**
   * Recursively search the tree to find the Pasal that contains the given Ayat node
   * 
   * @param {Array|Object} nodes - The current level of nodes to search in
   * @param {Object} targetNode - The node we're looking for (Ayat)
   * @param {Object} currentPasal - The current Pasal node we've found in this branch
   * @returns {Object|null} - The parent Pasal node or null if not found
   */
  const findParentPasal = (nodes, targetNode, currentPasal = null) => {
    // Handle both array of nodes and single node
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    
    for (const currentNode of nodeArray) {
      // Update current Pasal reference if this node is a Pasal
      let pasal = currentPasal;
      if (currentNode.type === 'pasal') {
        pasal = currentNode;
      }
      
      // Check if this is the target node
      if (currentNode === targetNode) {
        return pasal; // Return the last Pasal we encountered
      }
      
      // Recursively search children
      if (currentNode.children && currentNode.children.length > 0) {
        const found = findParentPasal(currentNode.children, targetNode, pasal);
        if (found) return found;
      }
    }
    
    return null;
  };

  /**
   * Function to collect all content from a Pasal's children
   * 
   * @param {Object} pasalNode - The Pasal node whose content to collect
   * @returns {Array} - Array of content objects with title, content, and explanation
   */
  const collectPasalContent = (pasalNode) => {
    const contents = [];
    
    // If the node has direct content and no children, add it
    // This ensures we only show direct content for Pasal nodes without children
    if (pasalNode && pasalNode.content && (!pasalNode.children || pasalNode.children.length === 0)) {
      contents.push({
        title: pasalNode.name,
        content: pasalNode.content,
        explanation: pasalNode.explanation
      });
    }

    // If the node has children (like Ayat), collect their content
    if (pasalNode && pasalNode.children) {
      pasalNode.children.forEach(child => {
        if (child.content || child.explanation) {
          contents.push({
            title: child.name,
            content: child.content,
            explanation: child.explanation
          });
        }
      });
    }

    return contents;
  };

  // Collect content from the Pasal node
  const contents = collectPasalContent(pasalNode);

  /**
   * Formats the node display text based on its type and properties
   * 
   * @param {Object} node - The node to format text for
   * @returns {string} - Formatted display text
   */
  const getNodeDisplayText = (node) => {
    if (!node) return '';
    
    if (node.type === 'bab') {
      return `${node.name} ${node.title}`;
    } else if (node.type === 'bagian') {
      return `${node.name} ${node.title}`;
    } else if (node.type === 'paragraf') {
      return `${node.name} ${node.title}`;
    } else if (node.type === 'pasal') {
      return node.title ? `${node.name} ${node.title}` : node.name;
    } else if (node.type === 'ayat') {
      return node.number ? `${node.name} ${node.number}` : node.name;
    }
    
    return node.name;
  };

  return (
    <div className="space-y-8">
      {/* Display hierarchy path */}
      <div className="text-center mb-10 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-6 rounded-lg shadow-sm">
        {hierarchyPath
          .filter(pathNode => pathNode !== pasalNode) // Exclude the current Pasal node
          .map((pathNode, index) => (
            <div key={index} className={`${index === 0 ? 'text-2xl font-bold' : index === 1 ? 'text-xl font-semibold' : 'text-lg font-medium'} ${index > 0 ? 'mt-3' : ''}`}>
              {getNodeDisplayText(pathNode)}
            </div>
          ))}
      </div>
      
      {/* Display content in a format similar to legal documents */}
      <div className="space-y-6">
        {contents.map((item, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-md border border-border">
            {/* Section title */}
            <div className="bg-primary/10 px-6 py-3 border-b">
              <h3 className="font-semibold text-primary">{item.title}</h3>
            </div>
            
            {/* Main content text */}
            <div className="p-6 bg-card">
              {item.content && (
                <p className="text-foreground leading-relaxed">{item.content}</p>
              )}
              
              {/* Optional explanation - clearly separated */}
              {item.explanation && (
                <div className="mt-4 pt-4 border-t border-dashed border-muted">
                  <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <span className="font-medium text-sm">Penjelasan</span>
                  </div>
                  <p className="text-muted-foreground text-sm pl-6">{item.explanation}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}