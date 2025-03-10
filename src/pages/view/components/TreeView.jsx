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
    <div className="p-6 h-full">
      <div className="space-y-6">
        {/* Header section with document number */}
        <div className="px-3 py-1 border border-border/10 shadow-sm rounded-xl bg-primary/10">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-semibold text-primary-foreground/90">
              Undang-Undang
            </div>
            <div className="text-[11px] text-muted-foreground">
              No. 5 Tahun 2017
            </div>
          </div>
        </div>

        {/* Metadata card */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/10 overflow-hidden">
          {/* Metadata section */}
          <button 
            onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
            className="w-full flex items-center justify-between p-3 bg-card/50 hover:bg-primary/10 transition-colors duration-200"
          >
            <h3 className="text-xs font-semibold text-primary-foreground">Metadata Dokumen</h3>
            {isMetadataExpanded ? (
              <ChevronUp className="w-3 h-3 text-primary-foreground/70" />
            ) : (
              <ChevronDown className="w-3 h-3 text-primary-foreground/70" />
            )}
          </button>
          {isMetadataExpanded && (
            <div className="p-3 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Nama</span>
                <span className="text-foreground/90 text-right">Pelaksanaan Piloting Penerapan Tanda Tangan Elektronik Dan Penyampaian Dokumen Elektronik Melalui Aplikasi Surat Perintah Membayar Elektronik</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Jenis</span>
                <span className="text-foreground/90">Peraturan Menteri Keuangan</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Nomor</span>
                <span className="text-foreground/90">177/PMK.05/2017</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Tahun</span>
                <span className="text-foreground/90">2017</span>
              </div>
            </div>
          )}

          {/* Change history section */}
          <button 
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="w-full flex items-center justify-between p-3 bg-card/50 hover:bg-primary/10 transition-colors duration-200 border-t border-border/10"
          >
            <h3 className="text-xs font-semibold text-primary-foreground">Riwayat Perubahan</h3>
            {isHistoryExpanded ? (
              <ChevronUp className="w-3 h-3 text-primary-foreground/70" />
            ) : (
              <ChevronDown className="w-3 h-3 text-primary-foreground/70" />
            )}
          </button>
          {isHistoryExpanded && (
            <div className="p-3">
              <div className="text-[11px] text-muted-foreground italic">
                Belum ada status perubahan
              </div>
            </div>
          )}
        </div>

        {/* Document structure section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/10 overflow-hidden">
          <button 
            onClick={() => setIsStructureExpanded(!isStructureExpanded)}
            className="w-full flex items-center justify-between p-3 bg-card/50 hover:bg-primary/10 transition-colors duration-200"
          >
            <h3 className="text-xs font-semibold text-primary-foreground">Struktur Dokumen</h3>
            {isStructureExpanded ? (
              <ChevronUp className="w-3 h-3 text-primary-foreground/70" />
            ) : (
              <ChevronDown className="w-3 h-3 text-primary-foreground/70" />
            )}
          </button>
          {isStructureExpanded && (
            <div className="p-3">
              <div className="space-y-1">
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
