import React, { useState } from "react";
import TreeNode from "./TreeNode";
import { useTree } from "./context/TreeContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const TreeView = ({ onNodeSelect, onAddNode, onEditNode, onDeleteNode }) => {
  const { treeData } = useTree();
  const [isStructureExpanded, setIsStructureExpanded] = useState(true);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-border/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <button 
        onClick={() => setIsStructureExpanded(!isStructureExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-primary/5 transition-colors duration-200"
      >
        <h3 className="text-sm font-semibold text-primary">Struktur Dokumen</h3>
        {isStructureExpanded ? (
          <ChevronUp className="w-4 h-4 text-primary-foreground/70" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary-foreground/70" />
        )}
      </button>
      {isStructureExpanded && (
        <div className="p-4">
          <div className="space-y-2">
            {treeData.map((node, index) => (
              <TreeNode 
                key={index} 
                node={node} 
                isFirst={index === 0}
                isLast={index === treeData.length - 1}
                onNodeSelect={onNodeSelect}
                onAddNode={onAddNode}
                onEditNode={onEditNode}
                onDeleteNode={onDeleteNode}
                nodePath={[index]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeView;
