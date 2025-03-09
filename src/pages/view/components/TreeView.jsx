import React from "react";
import treeData from "./Data";
import TreeNode from "./TreeNode";

const TreeView = () => {
  return (
    <div className="p-6 h-full">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Document Structure
          </h2>
          <div className="rounded-md bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground">
            UU ITE
          </div>
        </div>
        
        <div className="space-y-1">
          {treeData.map((node, index) => (
            <TreeNode 
              key={index} 
              node={node} 
              isFirst={index === 0}
              isLast={index === treeData.length - 1}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <p className="text-xs text-muted-foreground">
          Click on a node to view its content and explanation
        </p>
      </div>
    </div>
  );
};

export default TreeView;
