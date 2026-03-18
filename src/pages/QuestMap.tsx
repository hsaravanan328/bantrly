import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Star, Play, Lock, Gift, List, Flame } from "lucide-react";
import mascot from "@/assets/mascot.png";
import { useToast } from "@/hooks/use-toast";
import { UNITS, PLAYABLE_LESSONS, USER_STATS, LESSON_TYPE_ICONS, getUnitProgress, type Unit, type LessonNode } from "@/data/lessons";
import UnitSheet from "@/components/UnitSheet";
import ThemeToggle from "@/components/ThemeToggle";

const nodeY = (index: number) => 100 + index * 120;

const zigzagX = (index: number, total: number): number => {
  const positions = [65, 30, 70, 45, 25, 60, 35, 70, 30, 55, 40, 65];
  return positions[index % positions.length];
};

const QuestMap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const justCompleted = searchParams.get("completed") === "true";

  const [currentUnit, setCurrentUnit] = useState<Unit>(UNITS[0]);
  const [showUnitSheet, setShowUnitSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLesson, setModalLesson] = useState<LessonNode | null>(null);

  const [devLessonId, setDevLessonId] = useState("");

  const progress = getUnitProgress(currentUnit);

  type MapNode = { kind: "lesson"; lesson: LessonNode; questTitle: string } | { kind: "reward"; questId: string } | { kind: "quest_label"; title: string };

  const mapNodes: MapNode[] = [];
  currentUnit.quests.forEach((quest, qi) => {
    mapNodes.push({ kind: "quest_label", title: quest.title });
    quest.lessons.forEach((lesson) => {
      mapNodes.push({ kind: "lesson", lesson, questTitle: quest.title });
    });
    if (qi < currentUnit.quests.length - 1) {
      mapNodes.push({ kind: "reward", questId: quest.id });
    }
  });

  const handleNodeTap = (node: MapNode) => {
    if (node.kind === "reward") {
      toast({ title: "Coming soon!", description: "Reward chests will be available soon." });
      return;
    }
    if (node.kind !== "lesson") return;

    const lesson = node.lesson;
    if (lesson.status === "completed") {
      setModalLesson(lesson);
      setShowModal(true);
    } else if (lesson.status === "active") {
      const targetId = devLessonId || lesson.id;
      const playable = PLAYABLE_LESSONS.find((l) => l.id === targetId);
      if (playable) {
        navigate(`/lesson?id=${targetId}`);
      } else {
        toast({ title: "Coming soon!", description: "This lesson content is not built yet." });
      }
    } else {
      toast({ title: "Locked", description: "Complete previous lessons first." });
    }
  };

  const pathNodes = mapNodes.filter((n) => n.kind !== "quest_label");
  const pathPoints = pathNodes.map((_, i) => {
    const x = (zigzagX(i, pathNodes.length) / 100) * 340 + 25;
    const y = nodeY(i);
    return { x, y };
  });

  const buildPath = () => {
    if (pathPoints.length < 2) return "";
    let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];
      const cpY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${cpY}, ${curr.x} ${cpY}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const totalHeight = nodeY(pathNodes.length - 1) + 140;

  let pathNodeIndex = -1;

  return (
    <div className="flex flex-col min-h-screen page-transition">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background px-4 pt-4 pb-3">
        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Flame size={16} className="text-destructive" />
            <span className="text-xs font-bold text-foreground">{USER_STATS.streak}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-primary">{USER_STATS.xp} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-gold" />
            <span className="text-xs font-bold text-foreground">{USER_STATS.badges}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Lvl {USER_STATS.level}</span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Unit banner */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Unit {currentUnit.number}
            </p>
            <h1 className="text-xl font-bold text-foreground leading-tight">{currentUnit.title}</h1>
          </div>
          <button
            onClick={() => setShowUnitSheet(true)}
            className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center btn-press"
          >
            <List size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
            {progress.completed}/{progress.total} lessons
          </span>
          <div className="flex-1 h-2 rounded-pill bg-secondary overflow-hidden">
            <div className="h-full rounded-pill transition-all duration-500 bg-primary" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>

        {/* Dev selector */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">DEV:</span>
          <select
            value={devLessonId}
            onChange={(e) => setDevLessonId(e.target.value)}
            className="flex-1 text-xs bg-card border border-border rounded-lg px-2 py-1.5 text-foreground outline-none"
          >
            <option value="">Default (active lesson)</option>
            {PLAYABLE_LESSONS.map((l) => (
              <option key={l.id} value={l.id}>{l.type} — {l.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quest Map */}
      <div className="flex-1 relative overflow-y-auto pb-20" style={{ minHeight: totalHeight }}>
        <svg
          className="absolute inset-0 w-full pointer-events-none"
          style={{ height: totalHeight }}
          viewBox={`0 0 390 ${totalHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <path d={buildPath()} fill="none" stroke="hsl(var(--border))" strokeWidth="3" strokeDasharray="12 8" strokeLinecap="round" />
        </svg>

        {mapNodes.map((node, i) => {
          if (node.kind === "quest_label") {
            const nextPathIdx = mapNodes.slice(0, i + 1).filter((n) => n.kind !== "quest_label").length;
            const y = nodeY(nextPathIdx) - 40;
            return (
              <div
                key={`label-${i}`}
                className="absolute left-4 right-4 animate-fade-in"
                style={{ top: y, animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{node.title}</p>
              </div>
            );
          }

          pathNodeIndex++;
          const pi = pathNodeIndex;
          const xPx = (zigzagX(pi, pathNodes.length) / 100) * 340 + 25;
          const yPx = nodeY(pi);

          if (node.kind === "reward") {
            return (
              <button
                key={`reward-${node.questId}`}
                onClick={() => handleNodeTap(node)}
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 animate-fade-in btn-press"
                style={{ left: xPx, top: yPx, animationDelay: `${pi * 60}ms`, animationFillMode: "both" }}
              >
                <Gift size={40} className="text-gold" />
              </button>
            );
          }

          const lesson = node.lesson;
          const isActive = lesson.status === "active";
          const isCompleted = lesson.status === "completed";
          const isLocked = lesson.status === "locked";
          const size = isActive ? 80 : 64;
          const icon = LESSON_TYPE_ICONS[lesson.lessonType];

          return (
            <button
              key={lesson.id}
              onClick={() => handleNodeTap(node)}
              className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 animate-fade-in btn-press"
              style={{ left: xPx, top: yPx, animationDelay: `${pi * 60}ms`, animationFillMode: "both" }}
            >
              {isActive && (
                <img src={mascot} alt="Bantrly mascot" className="w-11 h-11 object-contain drop-shadow-lg" style={{ marginBottom: -6 }} />
              )}
              <div
                className={`relative flex items-center justify-center rounded-full transition-all ${
                  isCompleted ? "bg-success quest-node-completed" : ""
                } ${isActive ? "bg-primary quest-node-active" : ""} ${
                  isLocked ? "bg-secondary" : ""
                }`}
                style={{ width: size, height: size, opacity: isLocked ? 0.5 : 1 }}
              >
                {isCompleted && <span className="text-[11px] font-bold tracking-wide text-foreground">{icon}</span>}
                {isActive && <Play size={28} className="text-primary-foreground" fill="white" />}
                {isLocked && <Lock size={20} className="text-muted-foreground" />}
              </div>
              {isCompleted && (
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 3 }).map((_, si) => (
                    <span key={si} className={`text-xs ${si < lesson.stars ? "text-gold" : "text-muted-foreground/40"}`}>
                      {si < lesson.stars ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              )}
              {isActive && <span className="text-foreground font-extrabold text-xs mt-1.5 tracking-wide">START!</span>}
              {isLocked && (
                <span className="text-[10px] text-muted-foreground mt-1 truncate max-w-[80px]">{lesson.title}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && modalLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-8 animate-fade-in">
          <div className="bg-card border border-border p-6 flex flex-col items-center shadow-lg w-full max-w-[320px]" style={{ borderRadius: 22 }}>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="text-2xl text-gold">{i < modalLesson.stars ? "★" : "☆"}</span>
              ))}
            </div>
            <p className="text-foreground font-bold text-base mb-0.5">{modalLesson.title}</p>
            <p className="text-muted-foreground text-xs mb-1">{modalLesson.subtitle}</p>
            <p className="text-gold font-bold text-sm mb-4">+{modalLesson.xp} XP earned</p>
            <button onClick={() => setShowModal(false)} className="w-full h-11 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors btn-press text-sm">
              OK
            </button>
          </div>
        </div>
      )}

      <UnitSheet
        open={showUnitSheet}
        onClose={() => setShowUnitSheet(false)}
        currentUnitId={currentUnit.id}
        onSelectUnit={setCurrentUnit}
      />
    </div>
  );
};

export default QuestMap;
