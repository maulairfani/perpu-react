import React, { createContext, useContext, useState, useCallback } from 'react';
import staticData from '../Data';

// Create context
const TreeContext = createContext();

export function TreeProvider({ children }) {
  // States for managing tree data, loading state, and errors
  const [treeData, setTreeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize with static data
  useState(() => {
    setTreeData(staticData);
    setIsLoading(false);
  });
  
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
  
  const addNode = useCallback((parentPath, newNode) => {
    const newTreeData = [...treeData];
    let currentNode = newTreeData;
    
    // Navigate to parent node
    for (let i = 0; i < parentPath.length - 1; i++) {
      currentNode = currentNode[parentPath[i]].children;
    }
    
    // Add new node
    if (parentPath.length === 0) {
      newTreeData.push(newNode);
    } else {
      const lastIndex = parentPath[parentPath.length - 1];
      if (!currentNode[lastIndex].children) {
        currentNode[lastIndex].children = [];
      }
      currentNode[lastIndex].children.push(newNode);
    }
    
    setTreeData(newTreeData);
  }, [treeData]);

  const editNode = useCallback((path, updatedNode) => {
    const newTreeData = [...treeData];
    let currentNode = newTreeData;
    
    // Navigate to node
    for (let i = 0; i < path.length - 1; i++) {
      currentNode = currentNode[path[i]].children;
    }
    
    // Update node
    const lastIndex = path[path.length - 1];
    currentNode[lastIndex] = { ...currentNode[lastIndex], ...updatedNode };
    
    setTreeData(newTreeData);
  }, [treeData]);

  const deleteNode = useCallback((path) => {
    const newTreeData = [...treeData];
    let currentNode = newTreeData;
    
    // Navigate to parent node
    for (let i = 0; i < path.length - 1; i++) {
      currentNode = currentNode[path[i]].children;
    }
    
    // Delete node
    const lastIndex = path[path.length - 1];
    currentNode.splice(lastIndex, 1);
    
    setTreeData(newTreeData);
  }, [treeData]);
  
  // Context value with tree data, loading state, error, and operations
  const contextValue = {
    treeData,
    isLoading,
    error,
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

export function useTree() {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTree must be used within a TreeProvider');
  }
  return context;
}