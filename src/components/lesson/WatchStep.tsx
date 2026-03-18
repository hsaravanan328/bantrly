interface LessonData {
  sentence: string;
  characters: { name: string; emoji: string; badge: string; hint: string; color: string }[];
}

interface WatchStepProps {
  lesson: LessonData;
  onNext: () => void;
}

const WatchStep = ({ lesson, onNext }: WatchStepProps) => {
  return (
    <div
      className="p-5 animate-fade-in"
      style={{
        background: "linear-gradient(145deg, hsl(var(--card)), hsl(var(--card)))",
        border: "1.5px solid hsl(var(--border))",
        borderRadius: 20,
      }}
    >
      <span
        className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-primary/15 text-primary"
      >
        Watch First
      </span>

      <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
        Listen to how the same sentence sounds completely different with two characters.
      </p>

      {/* Character chips */}
      <div className="flex gap-2 mb-5">
        {lesson.characters.map((char) => (
          <div
            key={char.name}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold border border-border text-foreground"
          >
            {char.name}
          </div>
        ))}
      </div>

      {/* Sentence card */}
      <div className="bg-card rounded-xl p-4 mb-5 shadow-sm border border-border">
        <p className="text-base font-bold text-foreground leading-relaxed text-center">
          "{lesson.sentence}"
        </p>
      </div>

      {/* Voice hints */}
      <div className="space-y-3 mb-5">
        {lesson.characters.map((char) => (
          <div key={char.name} className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground" style={{ background: char.color }}>
              {char.name[0]}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">{char.name}</p>
              <p className="text-xs text-muted-foreground">{char.hint}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Audio placeholder */}
      <div className="rounded-xl p-3 mb-5 text-center bg-primary/5 border border-primary/15">
        <div className="flex items-center justify-center gap-1 mb-1">
          {[3, 5, 8, 10, 9, 7, 4, 3, 5, 7].map((h, i) => (
            <div key={i} className="w-1 rounded-full bg-primary transition-all" style={{ height: h * 3 }} />
          ))}
        </div>
        <p className="text-[11px] font-semibold text-primary">Coach Maya — model audio</p>
      </div>

      <button
        onClick={onNext}
        className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
      >
        Got it! Let me try
      </button>
    </div>
  );
};

export default WatchStep;
