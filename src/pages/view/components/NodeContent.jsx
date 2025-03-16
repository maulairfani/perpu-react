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
    <div className="space-y-8 max-w-5xl mx-auto px-4 h-full overflow-y-auto">
      {/* Hierarchy path with modern styling */}
      <nav className="mb-8">
        <ol className="flex flex-wrap gap-2 items-center justify-center text-xs font-medium">
          {hierarchyPath
            .filter(pathNode => pathNode !== pasalNode)
            .map((pathNode, index, array) => (
              <React.Fragment key={index}>
                <li className={`
                  px-3 py-1.5 rounded-lg backdrop-blur-sm
                  ${index === 0 ? 'bg-primary/20 text-primary-foreground font-semibold' : 
                   index === array.length - 1 ? 'bg-secondary/20 text-secondary-foreground' : 
                   'bg-muted/20 text-muted-foreground'}
                `}>
                  {getNodeDisplayText(pathNode)}
                </li>
                {index < array.length - 1 && (
                  <li className="text-muted-foreground/50">/</li>
                )}
              </React.Fragment>
            ))}
          {pasalNode && pasalNode.type === 'pasal' && (
            <>
              <li className="text-muted-foreground/50">/</li>
              <li className="px-3 py-1.5 rounded-lg backdrop-blur-sm bg-secondary/20 text-secondary-foreground">
                {pasalNode.name}
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Content cards with modern styling */}
      <div className="grid gap-8 pb-8">
        {contents.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-border/20"
          >
            {/* Section header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-400 px-6 py-4 border-b border-border/20">
              <h3 className="font-semibold text-sm text-white">{item.title}</h3>
            </div>

            {/* Content section */}
            <div className="p-6 space-y-6">
              {/* Main content */}
              {item.content && (
                <div className="prose prose-sm max-w-none">
                  <div className="bg-white rounded-lg p-4 leading-relaxed text-foreground border border-border/20">
                    {item.content}
                  </div>
                </div>
              )}

              {/* Explanation section */}
              {item.explanation && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-foreground/80">Penjelasan:</h4>
                  <div className="prose prose-sm max-w-none bg-muted/30 rounded-lg p-4 border border-border/20 text-foreground">
                    {item.explanation}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}