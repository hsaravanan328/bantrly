import { useState } from "react";
import type { PaceDifferenceLesson as PaceDifferenceLessonData } from "@/data/lessons";

interface Props {
  lesson: PaceDifferenceLessonData;
  onFinish: () => void;
}

type Step = "WATCH" | "PRACTICE" | "PERFORM";

const SpeedDial = ({ value, max, label, color }: { value: number; max: number; label: string; color: string }) => {
  const angle = -90 + (value / max) * 180;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full border-2 border-b-0 border-border bg-secondary/30" />
        {[-90, -45, 0, 45, 90].map((deg) => (
          <div key={deg} className="absolute bottom-0 left-1/2 w-0.5 h-14 origin-bottom bg-border/30" style={{ transform: `rotate(${deg}deg)` }} />
        ))}
        <div className="absolute bottom-0 left-1/2 w-1 h-12 origin-bottom transition-transform duration-700" style={{ transform: `rotate(${angle}deg)`, background: `linear-gradient(to top, ${color}, transparent)`, borderRadius: 4 }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full" style={{ background: color }} />
      </div>
      <p className="text-sm font-bold mt-2" style={{ color }}>{value} WPM · {label}</p>
    </div>
  );
};

const PaceDifferenceLesson = ({ lesson, onFinish }: Props) => {
  const [step, setStep] = useState<Step>("WATCH");
  const [recording, setRecording] = useState(false);
  const [practiced, setPracticed] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [scored, setScored] = useState(false);
  const [results, setResults] = useState<{ wpm: number }[]>([]);
  const [watchSpeed, setWatchSpeed] = useState(0);

  const currentSpeed = lesson.speeds[speedIndex];
  const isLastSpeed = speedIndex >= lesson.speeds.length - 1;
  const allDone = results.length === lesson.speeds.length;

  const handleRecord = (duration: number, cb: () => void) => {
    setRecording(true);
    setTimeout(() => { setRecording(false); cb(); }, duration);
  };

  const handlePerformDone = () => {
    const variance = Math.floor(Math.random() * 30) - 15;
    const nextResults = [...results, { wpm: currentSpeed.wpm + variance }];
    setResults(nextResults);
    setScored(nextResults.length < lesson.speeds.length);
  };

  const nextSpeed = () => {
    setSpeedIndex(speedIndex + 1);
    setScored(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-center gap-4 mb-2">
        {(["WATCH", "PRACTICE", "PERFORM"] as Step[]).map((s, i) => {
          const stepIdx = ["WATCH", "PRACTICE", "PERFORM"].indexOf(step);
          return (
            <div key={s} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: i <= stepIdx ? "hsl(var(--primary))" : "hsl(var(--secondary))" }} />
              <span className="text-[10px] font-bold uppercase" style={{ color: i === stepIdx ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>{s}</span>
            </div>
          );
        })}
      </div>

      {/* WATCH */}
      {step === "WATCH" && (
        <div className="p-5 bg-card border border-border" style={{ borderRadius: 20 }}>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-primary/15 text-primary">
            Watch the Speed
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Listen to the same sentence at two different speeds.
          </p>
          <div className="flex gap-2 mb-4">
            {lesson.speeds.map((s, i) => (
              <button key={s.name} onClick={() => setWatchSpeed(i)} className="flex-1 py-2 rounded-xl text-sm font-bold transition-all border-2" style={{
                background: i === watchSpeed ? "hsl(var(--secondary))" : "transparent",
                borderColor: i === watchSpeed ? s.color : "transparent",
                color: s.color,
              }}>
                {s.name}
              </button>
            ))}
          </div>
          <div className="flex justify-center mb-4">
            <SpeedDial value={lesson.speeds[watchSpeed].wpm} max={200} label={lesson.speeds[watchSpeed].name} color={lesson.speeds[watchSpeed].color} />
          </div>
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">"{lesson.sentence}"</p>
          </div>
          <button onClick={() => setStep("PRACTICE")} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
            Got it! Let me try
          </button>
        </div>
      )}

      {/* PRACTICE */}
      {step === "PRACTICE" && (
        <div className="p-5 bg-card border border-border" style={{ borderRadius: 20 }}>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-accent/15 text-accent">
            Practice — {lesson.speeds[0].name}
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Start slow. Take your time and breathe between phrases.
          </p>
          <div className="flex justify-center mb-4">
            <SpeedDial value={lesson.speeds[0].wpm} max={200} label={lesson.speeds[0].name} color={lesson.speeds[0].color} />
          </div>
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">"{lesson.sentence}"</p>
          </div>
          <div className="rounded-xl p-3 mb-4 bg-gold/10 border border-gold/20">
            <p className="text-xs leading-relaxed text-gold">Breathe naturally between phrases. No rush!</p>
          </div>
          {!recording && !practiced && (
            <div className="flex gap-3">
              <button onClick={() => handleRecord(2500, () => setPracticed(true))} className="flex-1 h-12 rounded-xl bg-secondary text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors">Practice</button>
              <button onClick={() => setStep("PERFORM")} className="h-12 px-4 rounded-xl text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors">Skip</button>
            </div>
          )}
          {recording && <button className="w-full h-12 rounded-xl font-bold text-sm text-destructive-foreground practice-recording-pulse bg-destructive">Recording…</button>}
          {practiced && (
            <div className="animate-fade-in">
              <div className="rounded-xl p-3 mb-4 text-center bg-success/10 border border-success/20">
                <p className="text-sm font-semibold text-success">Good pace! Now let's try both for real.</p>
              </div>
              <button onClick={() => setStep("PERFORM")} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">Ready for real</button>
            </div>
          )}
        </div>
      )}

      {/* PERFORM */}
      {step === "PERFORM" && !allDone && (
        <div className="p-5 bg-card border border-border" style={{ borderRadius: 20 }}>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-accent/15 text-accent">
            Real Attempt — {currentSpeed.name}
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            {speedIndex === 0 ? "Read it slowly and clearly." : "Now speed it up! Keep it clear."}
          </p>
          <div className="flex justify-center mb-4">
            <SpeedDial value={currentSpeed.wpm} max={200} label={currentSpeed.name} color={currentSpeed.color} />
          </div>
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">"{lesson.sentence}"</p>
          </div>
          {!recording && !scored && (
            <button onClick={() => handleRecord(3000, handlePerformDone)} className="w-full font-bold text-sm text-destructive-foreground rounded-xl hover:opacity-90 perform-record-btn bg-destructive" style={{ height: 52 }}>
              Speak Now — {currentSpeed.name}
            </button>
          )}
          {recording && <button className="w-full font-bold text-sm text-destructive-foreground rounded-xl perform-recording-pulse bg-destructive" style={{ height: 52 }}>Recording…</button>}
          {scored && (
            <div className="animate-fade-in">
              <div className="rounded-xl p-4 mb-4 text-center bg-accent/5 border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Your speed:</p>
                <p className="text-3xl font-extrabold text-foreground">{results[results.length - 1].wpm} WPM</p>
                <p className="text-[10px] text-muted-foreground mt-1">Target: {currentSpeed.wpm} WPM</p>
              </div>
              {isLastSpeed ? (
                <button onClick={() => setScored(false)} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">See Results</button>
              ) : (
                <button onClick={nextSpeed} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">Next Speed</button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Final results */}
      {step === "PERFORM" && allDone && !scored && (
        <div className="p-5 animate-fade-in bg-card border border-border" style={{ borderRadius: 20 }}>
          <p className="text-lg font-extrabold text-foreground text-center mb-4">Speed Results</p>
          <div className="space-y-3 mb-5">
            {lesson.speeds.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between rounded-xl p-3 bg-secondary/50">
                <span className="text-sm font-semibold text-foreground">{s.name} (target: {s.wpm})</span>
                <span className="text-lg font-extrabold text-foreground">{results[i]?.wpm} WPM</span>
              </div>
            ))}
          </div>
          <button onClick={onFinish} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
            Finish Lesson
          </button>
        </div>
      )}
    </div>
  );
};

export default PaceDifferenceLesson;
