import React, { createContext, useContext, useState, useCallback } from 'react';
import initialTreeData from '../Data';

// Create context
const TreeContext = createContext();

/**
 * TreeProvider component provides state management for the document tree
 * Handles operations like adding, editing, and deleting nodes
 * 
 * @param {Object} props - Component props including children
 * @returns {JSX.Element} - Context provider with tree management functionality
 */
export function TreeProvider({ children }) {
  // State for the entire tree data structure
  const [treeData, setTreeData] = useState(initialTreeData);
  
  /**
   * Find a node by its path in the tree
   * 
   * @param {Array} path - Array of indices representing the path to the node
   * @param {Array} currentNodes - Current level of nodes to search in (defaults to treeData)
   * @returns {Object|null} - The found node or null if not found
   */
  const findNodeByPath = useCallback((path, currentNodes = treeData) => {
    if (path.length === 0) return null;
    
    if (path.length === 1) {
      return currentNodes[path[0]];
    }
    
    const currentIndex = path[0];
    const currentNode = currentNodes[currentIndex];
    
    if (!currentNode || !currentNode.children) return null;
    
    return findNodeByPath(path.slice(1), currentNode.children);
  }, [treeData]);
  
  /**
   * Add a new node to the tree
   * 
   * @param {Array} parentPath - Path to the parent node where the new node will be added
   * @param {Object} newNode - The new node to add
   */
  const addNode = useCallback((parentPath, newNode) => {
    setTreeData(prevData => {
      // Create a deep copy of the tree data
      const newData = JSON.parse(JSON.stringify(prevData));
      
      // If adding to root level
      if (parentPath.length === 0) {
        newData.push(newNode);
        return newData;
      }
      
      // Find the parent node
      let currentLevel = newData;
      let parent = null;
      
      for (let i = 0; i < parentPath.length; i++) {
        const index = parentPath[i];
        if (i === parentPath.length - 1) {
          parent = currentLevel[index];
        } else {
          currentLevel = currentLevel[index].children || [];
        }
      }
      
      // Add the new node to the parent's children
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(newNode);
      }
      
      return newData;
    });
  }, []);
  
  /**
   * Edit an existing node in the tree
   * 
   * @param {Array} path - Path to the node to edit
   * @param {Object} updatedNode - The updated node data
   */
  const editNode = useCallback((path, updatedNode) => {
    setTreeData(prevData => {
      // Create a deep copy of the tree data
      const newData = JSON.parse(JSON.stringify(prevData));
      
      // Find the node to update
      let currentLevel = newData;
      let targetNode = null;
      
      for (let i = 0; i < path.length; i++) {
        const index = path[i];
        if (i === path.length - 1) {
          // Preserve children if they exist
          if (currentLevel[index].children) {
            updatedNode.children = currentLevel[index].children;
          }
          currentLevel[index] = updatedNode;
        } else {
          currentLevel = currentLevel[index].children || [];
        }
      }
      
      return newData;
    });
  }, []);
  
  /**
   * Delete a node from the tree
   * 
   * @param {Array} path - Path to the node to delete
   */
  const deleteNode = useCallback((path) => {
    setTreeData(prevData => {
      // Create a deep copy of the tree data
      const newData = JSON.parse(JSON.stringify(prevData));
      
      // If deleting from root level
      if (path.length === 1) {
        newData.splice(path[0], 1);
        return newData;
      }
      
      // Find the parent node
      let currentLevel = newData;
      let parentLevel = null;
      let parentIndex = null;
      
      for (let i = 0; i < path.length - 1; i++) {
        const index = path[i];
        parentLevel = currentLevel;
        parentIndex = index;
        currentLevel = currentLevel[index].children || [];
      }
      
      // Remove the node from its parent's children
      if (parentLevel && parentLevel[parentIndex] && parentLevel[parentIndex].children) {
        parentLevel[parentIndex].children.splice(path[path.length - 1], 1);
        
        // If parent has no more children, remove the children array
        if (parentLevel[parentIndex].children.length === 0) {
          delete parentLevel[parentIndex].children;
        }
      }
      
      return newData;
    });
  }, []);
  
  // Context value with tree data and operations
  const contextValue = {
    treeData,
    findNodeByPath,
    addNode,
    editNode,
    deleteNode
  };
  
  return (
    <TreeContext.Provider value={contextValue}>
      {children}
    </TreeContext.Provider>
  );
}

/**
 * Custom hook to use the tree context
 * 
 * @returns {Object} - Tree context with data and operations
 */
export function useTree() {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTree must be used within a TreeProvider');
  }
  return context;
}