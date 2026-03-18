import { useState } from "react";
import type { TongueTwisterLesson as TongueTwisterLessonData } from "@/data/lessons";

interface Props {
  lesson: TongueTwisterLessonData;
  onFinish: () => void;
}

type Step = "WATCH" | "PRACTICE" | "PERFORM";

const HighlightedText = ({ text, focusSound, focusColor }: { text: string; focusSound: string; focusColor: string }) => {
  const parts = text.split(new RegExp(`(${focusSound})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === focusSound.toLowerCase() ? (
          <span key={i} className="font-extrabold" style={{ color: focusColor }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const cleanSpeedLabel = (label: string) => label.replace(/[⭐★]/g, "").trim();

const TongueTwisterLesson = ({ lesson, onFinish }: Props) => {
  const [step, setStep] = useState<Step>("WATCH");
  const [recording, setRecording] = useState(false);
  const [practiced, setPracticed] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [scored, setScored] = useState(false);
  const [starResults, setStarResults] = useState<number[]>([]);
  const [watchSpeed, setWatchSpeed] = useState(0);

  const isLastSpeed = speedIndex >= lesson.speeds.length - 1;
  const allDone = starResults.length === lesson.speeds.length;
  const totalStars = starResults.reduce((a, b) => a + b, 0);
  const maxStars = lesson.speeds.reduce((a, s) => a + s.stars, 0);

  const handleRecord = (duration: number, cb: () => void) => {
    setRecording(true);
    setTimeout(() => { setRecording(false); cb(); }, duration);
  };

  const handlePerformDone = () => {
    const maxForSpeed = lesson.speeds[speedIndex].stars;
    const earned = Math.random() > 0.3 ? maxForSpeed : Math.max(1, maxForSpeed - 1);
    const nextResults = [...starResults, earned];
    setStarResults(nextResults);
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
            Watch at 3 Speeds
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Listen to the tongue twister at each speed. Notice the crisp "{lesson.focusSound.toUpperCase()}" sounds!
          </p>
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">
              "<HighlightedText text={lesson.text} focusSound={lesson.focusSound} focusColor={lesson.focusColor} />"
            </p>
          </div>
          <div className="flex gap-2 mb-4">
            {lesson.speeds.map((s, i) => (
              <button key={s.label} onClick={() => setWatchSpeed(i)} className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center border-2" style={{
                background: i === watchSpeed ? "hsl(var(--secondary))" : "transparent",
                borderColor: i === watchSpeed ? "hsl(var(--primary))" : "transparent",
                color: i === watchSpeed ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              }}>
                {cleanSpeedLabel(s.label)}
              </button>
            ))}
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
            Practice — {cleanSpeedLabel(lesson.speeds[0].label)}
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Start slow. Focus on making each "{lesson.focusSound.toUpperCase()}" sound crisp and clear.
          </p>
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">
              "<HighlightedText text={lesson.text} focusSound={lesson.focusSound} focusColor={lesson.focusColor} />"
            </p>
          </div>
          <div className="rounded-xl p-3 mb-4 bg-gold/10 border border-gold/20">
            <p className="text-xs leading-relaxed text-gold">Push your tongue forward for crisp S sounds. Don't let them blur together!</p>
          </div>
          {!recording && !practiced && (
            <div className="flex gap-3">
              <button onClick={() => handleRecord(3000, () => setPracticed(true))} className="flex-1 h-12 rounded-xl bg-secondary text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors">Practice</button>
              <button onClick={() => setStep("PERFORM")} className="h-12 px-4 rounded-xl text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors">Skip</button>
            </div>
          )}
          {recording && <button className="w-full h-12 rounded-xl font-bold text-sm text-destructive-foreground practice-recording-pulse bg-destructive">Recording…</button>}
          {practiced && (
            <div className="animate-fade-in">
              <div className="rounded-xl p-3 mb-4 text-center bg-success/10 border border-success/20">
                <p className="text-sm font-semibold text-success">Nice! Now let's earn some stars!</p>
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
            {cleanSpeedLabel(lesson.speeds[speedIndex].label)}
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            {speedIndex === 0 ? "Start slow and clear." : speedIndex === 1 ? "Pick up the pace!" : "Full speed! Keep it clean!"}
          </p>
          {starResults.length > 0 && (
            <div className="flex items-center justify-center gap-1 mb-3">
              <span className="text-xs text-muted-foreground mr-1">Stars earned:</span>
              {Array.from({ length: totalStars }).map((_, i) => <span key={i} className="text-gold text-sm">★</span>)}
            </div>
          )}
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">
              "<HighlightedText text={lesson.text} focusSound={lesson.focusSound} focusColor={lesson.focusColor} />"
            </p>
          </div>
          {!recording && !scored && (
            <button onClick={() => handleRecord(3000, handlePerformDone)} className="w-full font-bold text-sm text-destructive-foreground rounded-xl hover:opacity-90 perform-record-btn bg-destructive" style={{ height: 52 }}>
              Speak Now — {cleanSpeedLabel(lesson.speeds[speedIndex].label)}
            </button>
          )}
          {recording && <button className="w-full font-bold text-sm text-destructive-foreground rounded-xl perform-recording-pulse bg-destructive" style={{ height: 52 }}>Recording…</button>}
          {scored && (
            <div className="animate-fade-in">
              <div className="rounded-xl p-4 mb-4 text-center bg-accent/5 border border-accent/20">
                <div className="flex justify-center gap-1 mb-1">
                  {Array.from({ length: lesson.speeds[speedIndex].stars }).map((_, i) => (
                    <span key={i} className="text-2xl">{i < starResults[starResults.length - 1] ? "★" : "☆"}</span>
                  ))}
                </div>
                <p className="text-sm font-bold text-foreground">{starResults[starResults.length - 1]}/{lesson.speeds[speedIndex].stars} stars</p>
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
          <p className="text-lg font-extrabold text-foreground text-center mb-2">Tongue Twister Complete!</p>
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: maxStars }).map((_, i) => (
              <span key={i} className="text-2xl text-gold">{i < totalStars ? "★" : "☆"}</span>
            ))}
          </div>
          <p className="text-center text-sm font-bold text-foreground mb-5">{totalStars}/{maxStars} stars earned</p>
          <div className="space-y-3 mb-5">
            {lesson.speeds.map((s, i) => (
              <div key={s.label} className="flex items-center justify-between rounded-xl p-3 bg-secondary/50">
                <span className="text-sm font-semibold text-foreground">{cleanSpeedLabel(s.label)}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: s.stars }).map((_, j) => (
                    <span key={j} className="text-sm text-gold">{j < (starResults[i] || 0) ? "★" : "☆"}</span>
                  ))}
                </div>
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

export default TongueTwisterLesson;
