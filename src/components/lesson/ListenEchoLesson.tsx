import { useState } from "react";
import type { ListenEchoLesson as ListenEchoLessonData } from "@/data/lessons";

interface Props {
  lesson: ListenEchoLessonData;
  onFinish: () => void;
}

type Step = "WATCH" | "PRACTICE" | "PERFORM";

const ListenEchoLesson = ({ lesson, onFinish }: Props) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [step, setStep] = useState<Step>("WATCH");
  const [recording, setRecording] = useState(false);
  const [practiced, setPracticed] = useState(false);
  const [scored, setScored] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [score] = useState(() => Math.floor(Math.random() * 20) + 78);

  const round = lesson.rounds[roundIndex];
  const isLastRound = roundIndex >= lesson.rounds.length - 1;

  const handleRecord = (duration: number, cb: () => void) => {
    setRecording(true);
    setTimeout(() => { setRecording(false); cb(); }, duration);
  };

  const nextRound = () => {
    if (isLastRound) {
      onFinish();
    } else {
      setRoundIndex(roundIndex + 1);
      setStep("WATCH");
      setPracticed(false);
      setScored(false);
      setRevealed(false);
    }
  };

  const scoreColor = score >= 90 ? "text-success" : score >= 75 ? "text-gold" : "text-destructive";

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Round indicator */}
      <div className="flex items-center gap-2 mb-2">
        {lesson.rounds.map((_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: i <= roundIndex ? "hsl(var(--accent))" : "hsl(var(--secondary))" }} />
            <span className="text-[10px] font-bold uppercase" style={{ color: i === roundIndex ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>
              R{i + 1}
            </span>
          </div>
        ))}
        {round.difficulty === "hard" && (
          <span className="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-pill bg-destructive/15 text-destructive">
            One listen only
          </span>
        )}
      </div>

      {/* WATCH */}
      {step === "WATCH" && (
        <div className="p-5 bg-card border border-border" style={{ borderRadius: 20 }}>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-accent/15 text-accent">
            Listen Carefully
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Listen to this sentence. Try to remember it exactly.
          </p>
          <div className="bg-card rounded-xl p-4 mb-3 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">"{round.sentence}"</p>
          </div>
          <p className="text-[11px] mb-4 text-center text-muted-foreground/50">
            (Sentence disappears after audio in production)
          </p>
          <button onClick={() => setStep("PRACTICE")} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
            Got it! Let me try
          </button>
        </div>
      )}

      {/* PRACTICE */}
      {step === "PRACTICE" && (
        <div className="p-5 bg-card border border-border" style={{ borderRadius: 20 }}>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-accent/15 text-accent">
            Practice
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Now say it from memory. No peeking!
          </p>
          <div className="rounded-xl p-4 mb-4 border-2 border-dashed border-border bg-secondary/30">
            <p className="text-center text-muted-foreground text-sm">· · · · · · · · ·</p>
            <p className="text-center text-[10px] text-muted-foreground mt-1">Sentence hidden — speak from memory</p>
          </div>
          <div className="rounded-xl p-3 mb-4 bg-gold/10 border border-gold/20">
            <p className="text-xs leading-relaxed text-gold">Try to recall the exact words. Close is good enough!</p>
          </div>
          {!recording && !practiced && (
            <div className="flex gap-3">
              <button onClick={() => handleRecord(2500, () => setPracticed(true))} className="flex-1 h-12 rounded-xl bg-secondary text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors">
                Practice
              </button>
              <button onClick={() => setStep("PERFORM")} className="h-12 px-4 rounded-xl text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors">
                Skip
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
                <p className="text-sm font-semibold text-success">Good try! Let's do the real one now.</p>
              </div>
              <button onClick={() => setStep("PERFORM")} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
                Ready for real
              </button>
            </div>
          )}
        </div>
      )}

      {/* PERFORM */}
      {step === "PERFORM" && (
        <div className="p-5 bg-card border border-border" style={{ borderRadius: 20 }}>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-accent/15 text-accent">
            Real Attempt
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Say the sentence from memory. This one counts!
          </p>
          {!revealed && (
            <div className="rounded-xl p-4 mb-4 border-2 border-dashed border-border bg-secondary/30">
              <p className="text-center text-muted-foreground text-sm">· · · · · · · · ·</p>
              <p className="text-center text-[10px] text-muted-foreground mt-1">Hidden — speak from memory</p>
            </div>
          )}
          {!recording && !scored && (
            <button onClick={() => handleRecord(3000, () => { setScored(true); setRevealed(true); })} className="w-full font-bold text-sm text-destructive-foreground rounded-xl transition-colors hover:opacity-90 perform-record-btn bg-destructive" style={{ height: 52 }}>
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
              <div className="rounded-xl p-4 mb-4 bg-success/5 border border-success/30">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-success">The sentence was:</p>
                <p className="text-sm font-bold text-foreground leading-relaxed">"{round.sentence}"</p>
              </div>
              <div className="rounded-xl p-4 mb-4 bg-accent/5 border border-accent/20">
                <div className="text-center">
                  <p className={`text-3xl font-extrabold ${scoreColor}`}>{score}%</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {score >= 90 ? "Excellent recall!" : score >= 75 ? "Good job!" : "Keep practicing!"}
                  </p>
                </div>
              </div>
              <button onClick={nextRound} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
                {isLastRound ? "Finish Lesson" : "Next Round"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListenEchoLesson;
