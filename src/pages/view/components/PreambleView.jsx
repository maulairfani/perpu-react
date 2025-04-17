import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PreambleView = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-border/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-primary/5 transition-colors duration-200"
      >
        <h3 className="text-sm font-semibold text-primary">Pembukaan</h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-primary-foreground/70" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary-foreground/70" />
        )}
      </button>
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Menimbang Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground/90">Menimbang</h4>
            <div className="space-y-2 pl-4">
              <div className="text-sm text-foreground/80">
                <span className="font-medium">a. </span>
                bahwa kebudayaan merupakan investasi untuk membangun masa depan dan peradaban bangsa sehingga perlu dilakukan pemajuan kebudayaan secara terencana, terpadu, dan berkelanjutan;
              </div>
              <div className="text-sm text-foreground/80">
                <span className="font-medium">b. </span>
                bahwa untuk memajukan kebudayaan nasional Indonesia, diperlukan langkah strategis dalam melakukan pemeliharaan, pengembangan, pemanfaatan, dan pembinaan kebudayaan melalui pelindungan, pengembangan, pemanfaatan, dan pembinaan kebudayaan;
              </div>
              <div className="text-sm text-foreground/80">
                <span className="font-medium">c. </span>
                bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu membentuk Undang-Undang tentang Pemajuan Kebudayaan;
              </div>
            </div>
          </div>

          {/* Mengingat Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground/90">Mengingat</h4>
            <div className="space-y-2 pl-4">
              <div className="text-sm text-foreground/80">
                <span className="font-medium">1. </span>
                Pasal 18B ayat (2), Pasal 28C ayat (1), Pasal 28I ayat (3), Pasal 32 ayat (1) dan ayat (2), dan Pasal 36 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;
              </div>
              <div className="text-sm text-foreground/80">
                <span className="font-medium">2. </span>
                Undang-Undang Nomor 11 Tahun 2010 tentang Cagar Budaya (Lembaran Negara Republik Indonesia Tahun 2010 Nomor 130, Tambahan Lembaran Negara Republik Indonesia Nomor 5168);
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreambleView;