import { useState } from "react";
import { X, Lock, ChevronRight } from "lucide-react";
import { UNITS, getUnitProgress, type Unit } from "@/data/lessons";

interface Props {
  open: boolean;
  onClose: () => void;
  currentUnitId: string;
  onSelectUnit: (unit: Unit) => void;
}

const UnitSheet = ({ open, onClose, currentUnitId, onSelectUnit }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-[480px] bg-card border-t border-border rounded-t-2xl p-5 pb-8"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slide-up 0.3s ease-out" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-extrabold text-foreground">All Units</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors btn-press">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {UNITS.map((unit) => {
            const progress = getUnitProgress(unit);
            const isCurrent = unit.id === currentUnitId;
            const isLocked = unit.status === "locked";

            return (
              <button
                key={unit.id}
                onClick={() => { if (!isLocked) { onSelectUnit(unit); onClose(); } }}
                disabled={isLocked}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all btn-press ${
                  isCurrent ? "bg-primary/10 border border-primary/30" : "bg-secondary/50"
                } ${isLocked ? "opacity-50" : ""}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm"
                  style={{ background: isLocked ? "hsl(var(--secondary))" : unit.color, color: "white" }}
                >
                  {isLocked ? <Lock size={16} /> : unit.number}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{unit.title}</p>
                  <p className="text-[11px] text-muted-foreground">{unit.subtitle}</p>
                  {!isLocked && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 rounded-pill bg-secondary overflow-hidden">
                        <div className="h-full rounded-pill transition-all" style={{ width: `${progress.percent}%`, background: unit.color }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{progress.completed}/{progress.total}</span>
                    </div>
                  )}
                </div>
                {!isLocked && <ChevronRight size={16} className="text-muted-foreground" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnitSheet;
