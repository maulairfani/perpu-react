import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { documentService } from "../../../services/api";

const DocumentInfo = () => {
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await documentService.getDocumentMetadata();
        setMetadata(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <div className="space-y-6">
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
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary/70" />
              </div>
            ) : error ? (
              <div className="text-sm text-red-500 text-center py-2">{error}</div>
            ) : metadata ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nama</span>
                  <span className="text-foreground/90 text-right max-w-[70%]">{metadata.nama}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jenis</span>
                  <span className="text-foreground/90">{metadata.jenis}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nomor</span>
                  <span className="text-foreground/90">{metadata.nomor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tahun</span>
                  <span className="text-foreground/90">{metadata.tahun}</span>
                </div>
              </>
            ) : (
              <div className="text-sm text-center py-2 text-muted-foreground">Tidak ada data</div>
            )}
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
    </div>
  );
};

export default DocumentInfo;