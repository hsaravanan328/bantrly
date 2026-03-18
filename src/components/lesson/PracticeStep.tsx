import { useState } from "react";

interface LessonData {
  sentence: string;
  characters: { name: string; emoji: string; badge: string; hint: string; color: string }[];
}

interface PracticeStepProps {
  lesson: LessonData;
  onNext: () => void;
}

const PracticeStep = ({ lesson, onNext }: PracticeStepProps) => {
  const [recording, setRecording] = useState(false);
  const [practiced, setPracticed] = useState(false);

  const handlePractice = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      setPracticed(true);
    }, 2500);
  };

  const char = lesson.characters[0];

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
        Practice
      </span>

      <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
        Try the first character. No score — just practice.
      </p>

      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold mb-5 border border-border text-foreground">
        {char.name}
      </div>

      <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
        <p className="text-base font-bold text-foreground leading-relaxed text-center">
          "{lesson.sentence}"
        </p>
      </div>

      <div className="rounded-xl p-3 mb-5 bg-gold/10 border border-gold/20">
        <p className="text-xs leading-relaxed text-gold">{char.hint}</p>
      </div>

      {!recording && !practiced && (
        <div className="flex gap-3">
          <button onClick={handlePractice} className="flex-1 h-12 rounded-xl bg-secondary text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors">
            Practice
          </button>
          <button onClick={onNext} className="h-12 px-4 rounded-xl text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors">
            Skip practice
          </button>
        </div>
      )}

      {recording && (
        <button className="w-full h-12 rounded-xl font-bold text-sm text-destructive-foreground practice-recording-pulse bg-destructive">
          Recording…
        </button>
      )}

      {practiced && (
        <div className="animate-fade-in">
          <div className="rounded-xl p-3 mb-4 text-center bg-success/10 border border-success/20">
            <p className="text-sm font-semibold text-success">Nice work! That was a solid practice run.</p>
          </div>
          <button onClick={onNext} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
            Ready for real
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticeStep;
