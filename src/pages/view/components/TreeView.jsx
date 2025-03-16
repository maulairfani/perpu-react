import React, { useState } from "react";
import TreeNode from "./TreeNode";
import { useTree } from "./context/TreeContext";
import { ChevronDown, ChevronUp } from "lucide-react";

const TreeView = ({ onNodeSelect, onAddNode, onEditNode, onDeleteNode }) => {
  const { treeData } = useTree();
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isStructureExpanded, setIsStructureExpanded] = useState(true);

  return (
    <div className="p-6 h-full bg-background/95 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Header section with document number */}
        <div className="px-4 py-3 border border-border/10 shadow-sm rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-md transition-all duration-200">
          <div className="flex flex-col space-y-1.5">
            <div className="text-sm font-semibold text-primary">
              Undang-Undang
            </div>
            <div className="text-sm font-medium text-foreground/80">
              No. 5 Tahun 2017
            </div>
          </div>
        </div>

        {/* Metadata card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-border/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
          {/* Metadata section */}
          <button 
            onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-primary/5 transition-colors duration-200"
          >
            <h3 className="text-sm font-semibold text-primary">Metadata Dokumen</h3>
            {isMetadataExpanded ? (
              <ChevronUp className="w-4 h-4 text-primary-foreground/70" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary-foreground/70" />
            )}
          </button>
          {isMetadataExpanded && (
            <div className="p-4 space-y-3 bg-card/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nama</span>
                <span className="text-foreground/90 text-right max-w-[70%]">Pemajuan Kebudayaan</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Jenis</span>
                <span className="text-foreground/90">UU</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nomor</span>
                <span className="text-foreground/90">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tahun</span>
                <span className="text-foreground/90">2017</span>
              </div>
            </div>
          )}

          {/* Change history section */}
          <button 
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="w-full flex items-center justify-between p-4 bg-card/50 hover:bg-primary/10 transition-colors duration-200 border-t border-border/10"
          >
            <h3 className="text-sm font-semibold text-primary">Riwayat Perubahan</h3>
            {isHistoryExpanded ? (
              <ChevronUp className="w-4 h-4 text-primary-foreground/70" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary-foreground/70" />
            )}
          </button>
          {isHistoryExpanded && (
            <div className="p-4 bg-card/50">
              <div className="text-sm text-muted-foreground italic">
                Belum ada status perubahan
              </div>
            </div>
          )}
        </div>

        {/* Document structure section */}
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
      </div>
    </div>
  );
};

export default TreeView;
