import { useState } from "react";
import type { EmotionDifferenceLesson as EmotionDifferenceLessonData } from "@/data/lessons";

interface Props {
  lesson: EmotionDifferenceLessonData;
  onFinish: () => void;
}

type Step = "WATCH" | "PRACTICE" | "PERFORM";

const EmotionDifferenceLesson = ({ lesson, onFinish }: Props) => {
  const [step, setStep] = useState<Step>("WATCH");
  const [recording, setRecording] = useState(false);
  const [practiced, setPracticed] = useState(false);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const [scored, setScored] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [watchingEmotion, setWatchingEmotion] = useState(0);

  const currentEmotion = lesson.emotions[emotionIndex];
  const isLastEmotion = emotionIndex >= lesson.emotions.length - 1;
  const allScored = scores.length === lesson.emotions.length;

  const handleRecord = (duration: number, cb: () => void) => {
    setRecording(true);
    setTimeout(() => { setRecording(false); cb(); }, duration);
  };

  const handlePerformDone = () => {
    const s = Math.floor(Math.random() * 20) + 78;
    const nextScores = [...scores, s];
    setScores(nextScores);
    setScored(nextScores.length < lesson.emotions.length);
  };

  const nextEmotion = () => {
    if (isLastEmotion) return;
    setEmotionIndex(emotionIndex + 1);
    setScored(false);
  };

  const scoreClass = (s: number) => s >= 90 ? "text-success" : s >= 75 ? "text-gold" : "text-destructive";

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Step dots */}
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
            Listen to All 3
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Hear the same sentence said three different ways.
          </p>
          <div className="flex gap-2 mb-4">
            {lesson.emotions.map((e, i) => (
              <button
                key={e.name}
                onClick={() => setWatchingEmotion(i)}
                className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all border-2"
                style={{
                  background: i === watchingEmotion ? "hsl(var(--secondary))" : "transparent",
                  borderColor: i === watchingEmotion ? e.color : "transparent",
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                <span className="text-[10px] font-bold uppercase" style={{ color: e.color }}>{e.name}</span>
              </button>
            ))}
          </div>
          <div className="bg-card rounded-xl p-4 mb-3 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">"{lesson.sentence}"</p>
          </div>
          <p className="text-[11px] text-center mb-4 text-muted-foreground">
            Now playing: {lesson.emotions[watchingEmotion].name}
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
            Start with {lesson.emotions[0].name}. No score yet.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill text-xs font-semibold mb-4 border border-border text-foreground">
            {lesson.emotions[0].name}
          </div>
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">"{lesson.sentence}"</p>
          </div>
          <div className="rounded-xl p-3 mb-4 bg-gold/10 border border-gold/20">
            <p className="text-xs leading-relaxed text-gold">{lesson.emotions[0].hint}</p>
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
                <p className="text-sm font-semibold text-success">Nice! Let's do all three for real.</p>
              </div>
              <button onClick={() => setStep("PERFORM")} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">Ready for real</button>
            </div>
          )}
        </div>
      )}

      {/* PERFORM */}
      {step === "PERFORM" && !allScored && (
        <div className="p-5 bg-card border border-border" style={{ borderRadius: 20 }}>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-pill mb-4 bg-accent/15 text-accent">
            Real Attempt — {currentEmotion.name}
          </span>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            Say it like you really feel {currentEmotion.name.toLowerCase()}!
          </p>
          <div className="flex gap-2 mb-4">
            {lesson.emotions.map((e, i) => (
              <div key={e.name} className="w-2.5 h-2.5 rounded-full" style={{ background: i <= emotionIndex ? currentEmotion.color : "hsl(var(--secondary))" }} />
            ))}
          </div>
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border">
            <p className="text-base font-bold text-foreground leading-relaxed text-center">"{lesson.sentence}"</p>
          </div>
          {!recording && !scored && (
            <button onClick={() => handleRecord(3000, handlePerformDone)} className="w-full font-bold text-sm text-destructive-foreground rounded-xl hover:opacity-90 perform-record-btn bg-destructive" style={{ height: 52 }}>
              Speak Now — {currentEmotion.name}
            </button>
          )}
          {recording && <button className="w-full font-bold text-sm text-destructive-foreground rounded-xl perform-recording-pulse bg-destructive" style={{ height: 52 }}>Recording…</button>}
          {scored && (
            <div className="animate-fade-in">
              <div className="rounded-xl p-4 mb-4 text-center bg-accent/5 border border-accent/20">
                <p className={`text-3xl font-extrabold ${scoreClass(scores[scores.length - 1])}`}>{scores[scores.length - 1]}%</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{currentEmotion.name}</p>
              </div>
              {isLastEmotion ? (
                <button onClick={() => setScored(false)} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
                  See Results
                </button>
              ) : (
                <button onClick={nextEmotion} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
                  Next Emotion
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Final results */}
      {step === "PERFORM" && allScored && !scored && (
        <div className="p-5 animate-fade-in bg-card border border-border" style={{ borderRadius: 20 }}>
          <p className="text-lg font-extrabold text-foreground text-center mb-4">All Emotions Complete!</p>
          <div className="space-y-3 mb-5">
            {lesson.emotions.map((e, i) => (
              <div key={e.name} className="flex items-center justify-between rounded-xl p-3 bg-secondary/50">
                <span className="text-sm font-semibold text-foreground">{e.name}</span>
                <span className={`text-lg font-extrabold ${scoreClass(scores[i])}`}>{scores[i]}%</span>
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

export default EmotionDifferenceLesson;
