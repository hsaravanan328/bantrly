import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const RUBRIC = [
  { skill: "Vocal Contrast", desc: "both characters sounded different", score: 92 },
  { skill: "Delivery", desc: "matched the character style", score: 88 },
  { skill: "Clarity", desc: "every word was clear", score: 95 },
];

const SKILLS = ["Vocal Variety", "Volume Control", "Prosody"];

const useCountUp = (target: number, duration: number, start: boolean) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, start]);
  return value;
};

const LessonComplete = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonTitle = searchParams.get("title") || "Lesson";
  const xp = parseInt(searchParams.get("xp") || "15", 10);

  const [mounted, setMounted] = useState(false);
  const [showStars, setShowStars] = useState([false, false, false]);
  const [showContent, setShowContent] = useState(false);

  const xpDisplay = useCountUp(xp, 800, mounted);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setShowStars([true, false, false]), 400);
    const t2 = setTimeout(() => setShowStars([true, true, false]), 600);
    const t3 = setTimeout(() => setShowStars([true, true, true]), 800);
    const t4 = setTimeout(() => setShowContent(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="flex flex-col min-h-screen page-transition pb-20">
      {/* Floating balloons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="balloon absolute rounded-full"
            style={{
              width: 12 + Math.random() * 16,
              height: 12 + Math.random() * 16,
              left: `${10 + Math.random() * 80}%`,
              bottom: -40,
              background: ["hsl(var(--primary))", "hsl(var(--success))", "hsl(var(--gold))", "hsl(var(--accent))", "hsl(var(--destructive))", "#06b6d4", "#ec4899", "#f97316"][i],
              opacity: 0.6,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="flex-1 px-4 pt-8 relative z-10">
        {/* Hero */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full border border-success/25 bg-success/10 flex items-center justify-center mb-2 animate-fade-in">
            <CheckCircle2 size={30} className="text-success" />
          </div>
          <h1 className="text-[26px] font-extrabold text-foreground mb-1 animate-fade-in">Lesson Complete!</h1>
          <p className="text-sm text-muted-foreground animate-fade-in">{lessonTitle}</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-5">
          {showStars.map((show, i) => (
            <span
              key={i}
              className="text-4xl text-gold transition-all duration-300"
              style={{
                transform: show ? "scale(1)" : "scale(0)",
                opacity: show ? 1 : 0,
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* XP pill */}
        <div className="flex justify-center mb-6">
          <div className="px-6 py-2 rounded-pill text-center border-2 border-gold bg-gold/10">
            <span className="text-[28px] font-extrabold text-gold">+{xpDisplay} XP</span>
          </div>
        </div>

        {/* Score section */}
        {showContent && (
          <div className="animate-fade-in">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Your Performance</p>
            <div className="space-y-2 mb-5">
              {RUBRIC.map((r) => (
                <RubricRow key={r.skill} skill={r.skill} desc={r.desc} score={r.score} />
              ))}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">What you practiced</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {SKILLS.map((s) => (
                <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-pill bg-secondary text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>

            <button
              onClick={() => navigate("/?completed=true")}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors btn-press mb-3"
            >
              Back to Lessons
            </button>
            <button
              onClick={() => navigate(`/lesson?id=${searchParams.get("lessonId") || ""}`, { replace: true })}
              className="w-full h-12 rounded-xl bg-secondary text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors btn-press"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RubricRow = ({ skill, desc, score }: { skill: string; desc: string; score: number }) => {
  const [started, setStarted] = useState(false);
  const display = useCountUp(score, 800, started);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const colorClass = score >= 90 ? "text-success" : score >= 75 ? "text-gold" : "text-destructive";

  return (
    <div className="flex items-center gap-3 rounded-xl p-3 bg-secondary/50">
      <CheckCircle2 size={16} className={colorClass} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground">{skill}</p>
        <p className="text-[11px] text-muted-foreground truncate">{desc}</p>
      </div>
      <span className={`text-sm font-extrabold ${colorClass}`}>{display}%</span>
    </div>
  );
};

export default LessonComplete;
