import { useState } from "react";

interface LessonData {
  sentence: string;
  characters: { name: string; emoji: string; badge: string; hint: string; color: string }[];
}

interface PerformStepProps {
  lesson: LessonData;
  onFinish: () => void;
}

const PerformStep = ({ lesson, onFinish }: PerformStepProps) => {
  const [charIndex, setCharIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [scored, setScored] = useState(false);
  const [score] = useState(() => Math.floor(Math.random() * 20) + 78);

  const char = lesson.characters[charIndex];
  const isLast = charIndex >= lesson.characters.length - 1;

  const handleRecord = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      setScored(true);
    }, 3000);
  };

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCharIndex(charIndex + 1);
      setScored(false);
      setRecording(false);
    }
  };

  const scoreColor = score >= 90 ? "text-success" : score >= 75 ? "text-gold" : "text-destructive";

  return (
    <div
      className="p-5 animate-fade-in"
      style={{
        background: "linear-gradient(145deg, hsl(var(--card)), hsl(var(--card)))",
        border: "1.5px solid hsl(var(--border))",
        borderRadius: 20,
      }}
    >
      <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-accent/15 text-accent">
        Real Attempt
      </span>

      <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
        This is your scored read. Give it your best!
      </p>

      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold mb-5 border border-border text-foreground">
        {char.name}
      </div>

      <div className="flex gap-2 mb-4">
        {lesson.characters.map((c, i) => (
          <div key={c.name} className="w-2 h-2 rounded-full transition-colors" style={{ background: i === charIndex ? "hsl(var(--accent))" : "hsl(var(--secondary))" }} />
        ))}
      </div>

      <div className="bg-card rounded-xl p-4 mb-5 shadow-sm border border-border">
        <p className="text-base font-bold text-foreground leading-relaxed text-center">
          "{lesson.sentence}"
        </p>
      </div>

      {!recording && !scored && (
        <button onClick={handleRecord} className="w-full font-bold text-sm text-destructive-foreground rounded-xl transition-colors hover:opacity-90 perform-record-btn bg-destructive" style={{ height: 52 }}>
          Speak Now
        </button>
      )}

      {recording && (
        <button className="w-full font-bold text-sm text-destructive-foreground rounded-xl perform-recording-pulse bg-destructive" style={{ height: 52 }}>
          Recording — this is your scored attempt
        </button>
      )}

      {scored && (
        <div className="animate-fade-in">
          <div className="rounded-xl p-4 mb-4 bg-accent/5 border border-accent/20">
            <div className="text-center">
              <p className={`text-3xl font-extrabold ${scoreColor}`}>{score}%</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {score >= 90 ? "Excellent!" : score >= 75 ? "Good job!" : "Keep trying!"}
              </p>
            </div>
          </div>
          <button onClick={handleNext} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
            {isLast ? "Finish Lesson" : "Next Character"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PerformStep;
