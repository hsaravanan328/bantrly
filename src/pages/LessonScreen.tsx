import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PLAYABLE_LESSONS, type AnyLesson } from "@/data/lessons";
import WatchStep from "@/components/lesson/WatchStep";
import PracticeStep from "@/components/lesson/PracticeStep";
import PerformStep from "@/components/lesson/PerformStep";
import ListenEchoLesson from "@/components/lesson/ListenEchoLesson";
import EmotionDifferenceLesson from "@/components/lesson/EmotionDifferenceLesson";
import PaceDifferenceLesson from "@/components/lesson/PaceDifferenceLesson";
import TongueTwisterLesson from "@/components/lesson/TongueTwisterLesson";
import BlobMascot from "@/components/lesson/BlobMascot";

const STEPS = ["WATCH", "PRACTICE", "PERFORM"] as const;
type Step = typeof STEPS[number];

const LessonScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("id") || PLAYABLE_LESSONS[0].id;
  const lesson = PLAYABLE_LESSONS.find((l) => l.id === lessonId) || PLAYABLE_LESSONS[0];

  const [currentStep, setCurrentStep] = useState<Step>("WATCH");

  const stepIndex = STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const goNext = () => {
    if (currentStep === "WATCH") setCurrentStep("PRACTICE");
    else if (currentStep === "PRACTICE") setCurrentStep("PERFORM");
  };

  const finish = () => {
    navigate(`/complete?title=${encodeURIComponent(lesson.title)}&xp=${lesson.xp}&lessonId=${lesson.id}`);
  };

  const renderLessonContent = () => {
    switch (lesson.type) {
      case "listen_and_echo":
        return <ListenEchoLesson lesson={lesson} onFinish={finish} />;
      case "emotion_difference":
        return <EmotionDifferenceLesson lesson={lesson} onFinish={finish} />;
      case "pace_difference":
        return <PaceDifferenceLesson lesson={lesson} onFinish={finish} />;
      case "tongue_twister":
        return <TongueTwisterLesson lesson={lesson} onFinish={finish} />;
      case "character_read":
      default:
        return (
          <>
            <div className="flex items-center justify-center gap-4 mb-6">
              {STEPS.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full transition-colors" style={{ background: i <= stepIndex ? "hsl(var(--primary))" : "hsl(var(--secondary))" }} />
                  <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: i === stepIndex ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>{step}</span>
                </div>
              ))}
            </div>
            {currentStep === "WATCH" && <WatchStep lesson={lesson} onNext={goNext} />}
            {currentStep === "PRACTICE" && <PracticeStep lesson={lesson} onNext={goNext} />}
            {currentStep === "PERFORM" && <PerformStep lesson={lesson} onFinish={finish} />}
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen page-transition">
      <div className="sticky top-0 z-40 bg-background px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate("/")} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors btn-press">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <span className="text-sm font-bold text-foreground truncate mx-3">{lesson.title}</span>
          <div className="w-9" />
        </div>
        <div className="h-1.5 rounded-pill bg-secondary overflow-hidden">
          <div className="h-full rounded-pill bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 px-4 pb-20 overflow-y-auto">
        {/* Blob mascot + lesson info */}
        <div className="flex items-center gap-4 p-4 mb-4 mt-3 bg-card border border-border" style={{ borderRadius: 20 }}>
          <BlobMascot lessonType={lesson.type} size={56} />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{lesson.domainLabel}</span>
            <h2 className="text-lg font-extrabold text-foreground leading-tight">{lesson.title}</h2>
            <p className="text-xs text-muted-foreground">{lesson.subtitle}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-pill bg-secondary text-muted-foreground">{lesson.durationSec}s</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-pill bg-secondary text-muted-foreground">{lesson.xp} XP</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-pill bg-secondary text-muted-foreground">{lesson.skill}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-5 pl-1">
          <div className="w-1 rounded-pill bg-primary shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">{lesson.instruction}</p>
        </div>

        {renderLessonContent()}
      </div>
    </div>
  );
};

export default LessonScreen;
