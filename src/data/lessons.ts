// ==========================================
// Curriculum Data — Units, Quests, Lessons
// ==========================================

export type LessonType =
  | "character_read"
  | "listen_and_echo"
  | "emotion_difference"
  | "pace_difference"
  | "tongue_twister"
  | "scrambled_story"
  | "flashcard"
  | "speed_reader"
  | "comic_reader"
  | "scene_speak"
  | "refresher"
  | "topic_read";

export type LessonStatus = "completed" | "active" | "locked";

export const LESSON_TYPE_ICONS: Record<LessonType, string> = {
  character_read: "CR",
  emotion_difference: "EM",
  pace_difference: "PC",
  tongue_twister: "TT",
  listen_and_echo: "LE",
  scrambled_story: "SS",
  flashcard: "FC",
  speed_reader: "SR",
  comic_reader: "CM",
  scene_speak: "SC",
  refresher: "RF",
  topic_read: "TP",
};

// ---- Lesson detail types (for playable lessons) ----

export interface CharacterReadLesson {
  type: "character_read";
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  domainLabel: string;
  domainColor: string;
  domainIcon: string;
  bucket: string;
  bucketColor: string;
  durationSec: number;
  xp: number;
  skill: string;
  instruction: string;
  sentence: string;
  characters: { name: string; emoji: string; badge: string; hint: string; color: string }[];
}

export interface ListenEchoRound {
  sentence: string;
  difficulty: "medium" | "hard";
}

export interface ListenEchoLesson {
  type: "listen_and_echo";
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  domainLabel: string;
  domainColor: string;
  domainIcon: string;
  bucket: string;
  bucketColor: string;
  durationSec: number;
  xp: number;
  skill: string;
  instruction: string;
  rounds: ListenEchoRound[];
}

export interface EmotionDifferenceLesson {
  type: "emotion_difference";
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  domainLabel: string;
  domainColor: string;
  domainIcon: string;
  bucket: string;
  bucketColor: string;
  durationSec: number;
  xp: number;
  skill: string;
  instruction: string;
  sentence: string;
  emotions: { name: string; emoji: string; hint: string; color: string }[];
}

export interface PaceDifferenceLesson {
  type: "pace_difference";
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  domainLabel: string;
  domainColor: string;
  domainIcon: string;
  bucket: string;
  bucketColor: string;
  durationSec: number;
  xp: number;
  skill: string;
  instruction: string;
  sentence: string;
  speeds: { name: string; emoji: string; wpm: number; color: string }[];
}

export interface TongueTwisterLesson {
  type: "tongue_twister";
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  domainLabel: string;
  domainColor: string;
  domainIcon: string;
  bucket: string;
  bucketColor: string;
  durationSec: number;
  xp: number;
  skill: string;
  instruction: string;
  text: string;
  focusSound: string;
  focusColor: string;
  speeds: { label: string; stars: number }[];
}

export type AnyLesson =
  | CharacterReadLesson
  | ListenEchoLesson
  | EmotionDifferenceLesson
  | PaceDifferenceLesson
  | TongueTwisterLesson;

// ---- Curriculum node (metadata for map) ----

export interface LessonNode {
  id: string;
  title: string;
  subtitle: string;
  lessonType: LessonType;
  status: LessonStatus;
  xp: number;
  durationSec: number;
  stars: number; // 0-3, only for completed
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  lessonType: LessonType;
  lessons: LessonNode[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  status: "unlocked" | "locked";
  quests: Quest[];
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  badges: number;
  completedLessons: number;
  totalLessons: number;
}

// ==========================================
// User Stats
// ==========================================

export const USER_STATS: UserStats = {
  xp: 340,
  level: 4,
  streak: 7,
  badges: 2,
  completedLessons: 2,
  totalLessons: 36,
};

// ==========================================
// Curriculum
// ==========================================

export const UNITS: Unit[] = [
  {
    id: "unit_1",
    number: 1,
    title: "Find Your Voice",
    subtitle: "Discover your speaking style",
    color: "#2563eb",
    status: "unlocked",
    quests: [
      {
        id: "q1_1",
        title: "The Newsroom",
        description: "Read news like a pro — different roles, same script",
        lessonType: "character_read",
        lessons: [
          { id: "l_1_1_1", title: "On Air — First Broadcast", subtitle: "Your first time on the mic", lessonType: "character_read", status: "completed", xp: 15, durationSec: 45, stars: 3 },
          { id: "l_1_1_2", title: "On Air — Two Ways", subtitle: "Read like you mean it", lessonType: "character_read", status: "completed", xp: 15, durationSec: 50, stars: 3 },
          { id: "l_1_1_3", title: "On Air — Three Roles", subtitle: "Reporter, anchor, and commentator", lessonType: "character_read", status: "active", xp: 20, durationSec: 60, stars: 0 },
        ],
      },
      {
        id: "q1_2",
        title: "Emotion Lab",
        description: "Express feelings through your voice",
        lessonType: "emotion_difference",
        lessons: [
          { id: "l_1_2_1", title: "Happy vs Sad", subtitle: "Two ends of the spectrum", lessonType: "emotion_difference", status: "locked", xp: 15, durationSec: 50, stars: 0 },
          { id: "l_1_2_2", title: "Three Ways to Feel It", subtitle: "Same words, different feelings", lessonType: "emotion_difference", status: "locked", xp: 18, durationSec: 55, stars: 0 },
          { id: "l_1_2_3", title: "Emotion Mashup", subtitle: "Switch emotions mid-sentence", lessonType: "emotion_difference", status: "locked", xp: 20, durationSec: 60, stars: 0 },
        ],
      },
      {
        id: "q1_3",
        title: "Speed Lab",
        description: "Master your speaking pace",
        lessonType: "pace_difference",
        lessons: [
          { id: "l_1_3_1", title: "Slow Down, Speed Up", subtitle: "Control your pace", lessonType: "pace_difference", status: "locked", xp: 15, durationSec: 45, stars: 0 },
          { id: "l_1_3_2", title: "The Tempo Switch", subtitle: "Change gears mid-flow", lessonType: "pace_difference", status: "locked", xp: 18, durationSec: 50, stars: 0 },
          { id: "l_1_3_3", title: "Race the Clock", subtitle: "Speed with precision", lessonType: "pace_difference", status: "locked", xp: 20, durationSec: 55, stars: 0 },
        ],
      },
      {
        id: "q1_4",
        title: "Tongue Twister Gym",
        description: "Sharpen your articulation",
        lessonType: "tongue_twister",
        lessons: [
          { id: "l_1_4_1", title: "The S Train", subtitle: "Crisp S sounds at any speed", lessonType: "tongue_twister", status: "locked", xp: 15, durationSec: 50, stars: 0 },
          { id: "l_1_4_2", title: "Peter Piper's Challenge", subtitle: "P sounds galore", lessonType: "tongue_twister", status: "locked", xp: 18, durationSec: 50, stars: 0 },
          { id: "l_1_4_3", title: "Woodchuck Marathon", subtitle: "The ultimate test", lessonType: "tongue_twister", status: "locked", xp: 20, durationSec: 55, stars: 0 },
        ],
      },
    ],
  },
  {
    id: "unit_2",
    number: 2,
    title: "Turn Up the Volume",
    subtitle: "Build power and presence",
    color: "#7c3aed",
    status: "locked",
    quests: [
      {
        id: "q2_1",
        title: "Ear Training",
        description: "Listen carefully, then speak from memory",
        lessonType: "listen_and_echo",
        lessons: [
          { id: "l_2_1_1", title: "Did You Catch That?", subtitle: "Listen, remember, repeat", lessonType: "listen_and_echo", status: "locked", xp: 20, durationSec: 60, stars: 0 },
          { id: "l_2_1_2", title: "Echo Chamber", subtitle: "Longer sentences, sharper memory", lessonType: "listen_and_echo", status: "locked", xp: 20, durationSec: 60, stars: 0 },
          { id: "l_2_1_3", title: "One Shot Listen", subtitle: "No repeats — pure recall", lessonType: "listen_and_echo", status: "locked", xp: 25, durationSec: 65, stars: 0 },
        ],
      },
      {
        id: "q2_2",
        title: "Story Detectives",
        description: "Unscramble and narrate stories",
        lessonType: "scrambled_story",
        lessons: [
          { id: "l_2_2_1", title: "Mixed Up Mystery", subtitle: "Put the story back together", lessonType: "scrambled_story", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_2_2_2", title: "Plot Twist", subtitle: "Find the right order", lessonType: "scrambled_story", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_2_2_3", title: "Story Architect", subtitle: "Build a narrative from pieces", lessonType: "scrambled_story", status: "locked", xp: 25, durationSec: 60, stars: 0 },
        ],
      },
      {
        id: "q2_3",
        title: "Delivery Cards",
        description: "Quick-fire speaking drills",
        lessonType: "flashcard",
        lessons: [
          { id: "l_2_3_1", title: "Flash Round", subtitle: "Read fast, speak clear", lessonType: "flashcard", status: "locked", xp: 15, durationSec: 40, stars: 0 },
          { id: "l_2_3_2", title: "Card Blitz", subtitle: "Speed and accuracy", lessonType: "flashcard", status: "locked", xp: 18, durationSec: 45, stars: 0 },
          { id: "l_2_3_3", title: "Final Draw", subtitle: "The ultimate card challenge", lessonType: "flashcard", status: "locked", xp: 20, durationSec: 50, stars: 0 },
        ],
      },
      {
        id: "q2_4",
        title: "Speed Trials",
        description: "Read at lightning speed with clarity",
        lessonType: "speed_reader",
        lessons: [
          { id: "l_2_4_1", title: "Warm-Up Sprint", subtitle: "Get your voice ready", lessonType: "speed_reader", status: "locked", xp: 15, durationSec: 45, stars: 0 },
          { id: "l_2_4_2", title: "Speed Demon", subtitle: "Push your limits", lessonType: "speed_reader", status: "locked", xp: 20, durationSec: 50, stars: 0 },
          { id: "l_2_4_3", title: "Lightning Read", subtitle: "Maximum speed, zero errors", lessonType: "speed_reader", status: "locked", xp: 25, durationSec: 55, stars: 0 },
        ],
      },
    ],
  },
  {
    id: "unit_3",
    number: 3,
    title: "Own the Stage",
    subtitle: "Perform with confidence",
    color: "#f59e0b",
    status: "locked",
    quests: [
      {
        id: "q3_1",
        title: "Script Studio",
        description: "Read comics and scripts aloud",
        lessonType: "comic_reader",
        lessons: [
          { id: "l_3_1_1", title: "Panel One", subtitle: "Read the first scene", lessonType: "comic_reader", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_3_1_2", title: "Voice Acting 101", subtitle: "Bring characters to life", lessonType: "comic_reader", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_3_1_3", title: "Full Script Run", subtitle: "Perform the whole scene", lessonType: "comic_reader", status: "locked", xp: 25, durationSec: 65, stars: 0 },
        ],
      },
      {
        id: "q3_2",
        title: "Picture This",
        description: "Describe scenes with vivid speech",
        lessonType: "scene_speak",
        lessons: [
          { id: "l_3_2_1", title: "What Do You See?", subtitle: "Describe the image", lessonType: "scene_speak", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_3_2_2", title: "Paint With Words", subtitle: "More detail, more color", lessonType: "scene_speak", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_3_2_3", title: "Scene Master", subtitle: "Full scene narration", lessonType: "scene_speak", status: "locked", xp: 25, durationSec: 60, stars: 0 },
        ],
      },
      {
        id: "q3_3",
        title: "Refresh & Review",
        description: "Revisit and sharpen past skills",
        lessonType: "refresher",
        lessons: [
          { id: "l_3_3_1", title: "Quick Review", subtitle: "Brush up on basics", lessonType: "refresher", status: "locked", xp: 15, durationSec: 40, stars: 0 },
          { id: "l_3_3_2", title: "Skill Check", subtitle: "How much do you remember?", lessonType: "refresher", status: "locked", xp: 18, durationSec: 45, stars: 0 },
          { id: "l_3_3_3", title: "Mastery Run", subtitle: "Prove your skills", lessonType: "refresher", status: "locked", xp: 20, durationSec: 50, stars: 0 },
        ],
      },
      {
        id: "q3_4",
        title: "Topic Explorer",
        description: "Read and speak about real topics",
        lessonType: "topic_read",
        lessons: [
          { id: "l_3_4_1", title: "Space Frontiers", subtitle: "Read about the cosmos", lessonType: "topic_read", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_3_4_2", title: "Ocean Deep", subtitle: "Dive into marine science", lessonType: "topic_read", status: "locked", xp: 20, durationSec: 55, stars: 0 },
          { id: "l_3_4_3", title: "History Makers", subtitle: "Tell stories of the past", lessonType: "topic_read", status: "locked", xp: 25, durationSec: 60, stars: 0 },
        ],
      },
    ],
  },
];

// ==========================================
// Playable lesson data (full content for lessons that have been built)
// ==========================================

export const PLAYABLE_LESSONS: AnyLesson[] = [
  {
    type: "character_read",
    id: "l_1_1_1",
    title: "On Air — First Broadcast",
    subtitle: "Your first time on the mic",
    domain: "speaking",
    domainLabel: "Speaking First",
    domainColor: "#2563eb",
    domainIcon: "🎤",
    bucket: "Builder · Grades 3–5",
    bucketColor: "#3b82f6",
    durationSec: 45,
    xp: 15,
    skill: "Vocal Variety and Delivery",
    instruction: "Read this breaking news headline as two different anchors!",
    sentence: "Breaking news — a cat has been elected mayor of a small town in Oregon!",
    characters: [
      { name: "Serious Anchor", emoji: "🎙️", badge: "🎙️ Serious Anchor", hint: "Professional. Steady. Like you're on CNN.", color: "#2563eb" },
      { name: "Silly Reporter", emoji: "🤪", badge: "🤪 Silly Reporter", hint: "Over the top! You think this is hilarious!", color: "#f59e0b" },
    ],
  },
  {
    type: "character_read",
    id: "l_1_1_2",
    title: "On Air — Two Ways",
    subtitle: "Read like you mean it",
    domain: "speaking",
    domainLabel: "Speaking First",
    domainColor: "#2563eb",
    domainIcon: "🎤",
    bucket: "Builder · Grades 3–5",
    bucketColor: "#3b82f6",
    durationSec: 50,
    xp: 15,
    skill: "Vocal Variety and Delivery",
    instruction: "Same sentence. Two totally different characters. You play both!",
    sentence: "And that is the final whistle — the game is over!",
    characters: [
      { name: "Bored Referee", emoji: "😐", badge: "😐 Bored Referee", hint: "Flat. Monotone. Like you've seen this a thousand times.", color: "#6b7280" },
      { name: "Excited Commentator", emoji: "🏟️", badge: "🏟️ Sports Commentator", hint: "LOUD! Fast! The crowd is going wild!", color: "#2563eb" },
    ],
  },
  {
    type: "character_read",
    id: "l_1_1_3",
    title: "On Air — Three Roles",
    subtitle: "Reporter, anchor, and commentator",
    domain: "speaking",
    domainLabel: "Speaking First",
    domainColor: "#2563eb",
    domainIcon: "🎤",
    bucket: "Builder · Grades 3–5",
    bucketColor: "#3b82f6",
    durationSec: 60,
    xp: 20,
    skill: "Vocal Variety and Delivery",
    instruction: "Three characters, one story. Switch voices like a pro!",
    sentence: "The volcano erupted at exactly midnight, sending ash clouds across three counties.",
    characters: [
      { name: "Field Reporter", emoji: "📡", badge: "📡 Field Reporter", hint: "Urgent. You're standing near the volcano. It's intense!", color: "#ef4444" },
      { name: "Studio Anchor", emoji: "🎙️", badge: "🎙️ Studio Anchor", hint: "Calm and controlled. You're the voice of authority.", color: "#2563eb" },
      { name: "Excited Viewer", emoji: "😱", badge: "😱 Excited Viewer", hint: "OMG! You can't believe what you're seeing on TV!", color: "#f59e0b" },
    ],
  },
  {
    type: "listen_and_echo",
    id: "l_2_1_1",
    title: "Did You Catch That?",
    subtitle: "Listen, remember, repeat",
    domain: "listening",
    domainLabel: "Listening → Speaking",
    domainColor: "#7c3aed",
    domainIcon: "🎧",
    bucket: "Builder · Grades 3–5",
    bucketColor: "#7c3aed",
    durationSec: 60,
    xp: 20,
    skill: "Active Listening & Recall",
    instruction: "Listen to the sentence carefully, then say it back from memory!",
    rounds: [
      { sentence: "Scientists believe the signal came from somewhere outside our solar system.", difficulty: "medium" },
      { sentence: "She looked back once, took a breath, and walked through the door.", difficulty: "medium" },
      { sentence: "By the time anyone realized what had happened, he was already gone.", difficulty: "hard" },
    ],
  },
  {
    type: "emotion_difference",
    id: "l_1_2_2",
    title: "Three Ways to Feel It",
    subtitle: "Same words, different feelings",
    domain: "speaking",
    domainLabel: "Speaking First",
    domainColor: "#2563eb",
    domainIcon: "🎤",
    bucket: "Builder · Grades 3–5",
    bucketColor: "#3b82f6",
    durationSec: 55,
    xp: 18,
    skill: "Emotional Expression",
    instruction: "Say the same sentence three different ways — sad, angry, and happy!",
    sentence: "I can't believe that just happened.",
    emotions: [
      { name: "SAD", emoji: "😢", hint: "Slow, quiet, heavy. Like the weight of the world is on you.", color: "#3b82f6" },
      { name: "ANGRY", emoji: "😡", hint: "Sharp, loud, intense. You can't believe someone did this!", color: "#ef4444" },
      { name: "HAPPY", emoji: "😄", hint: "Bright, fast, excited! This is the best thing ever!", color: "#f59e0b" },
    ],
  },
  {
    type: "pace_difference",
    id: "l_1_3_1",
    title: "Slow Down, Speed Up",
    subtitle: "Master your speaking pace",
    domain: "speaking",
    domainLabel: "Speaking First",
    domainColor: "#2563eb",
    domainIcon: "🎤",
    bucket: "Builder · Grades 3–5",
    bucketColor: "#3b82f6",
    durationSec: 45,
    xp: 15,
    skill: "Pace Control",
    instruction: "Read the same sentence at two different speeds — slow and deliberate, then fast and energetic!",
    sentence: "The explorer crossed the river just before the sun went down.",
    speeds: [
      { name: "Slow", emoji: "🐢", wpm: 80, color: "#22c55e" },
      { name: "Fast", emoji: "🐇", wpm: 165, color: "#ef4444" },
    ],
  },
  {
    type: "tongue_twister",
    id: "l_1_4_1",
    title: "The S Train",
    subtitle: "Crisp sounds at any speed",
    domain: "speaking",
    domainLabel: "Speaking First",
    domainColor: "#2563eb",
    domainIcon: "🎤",
    bucket: "Builder · Grades 3–5",
    bucketColor: "#3b82f6",
    durationSec: 50,
    xp: 20,
    skill: "Articulation & Diction",
    instruction: "Master this tongue twister at three speeds. Keep those S sounds crisp!",
    text: "She sells seashells by the seashore, and the shells she sells are surely seashells.",
    focusSound: "s",
    focusColor: "#2563eb",
    speeds: [
      { label: "⭐ Slow", stars: 1 },
      { label: "⭐⭐ Medium", stars: 2 },
      { label: "⭐⭐⭐ Fast", stars: 3 },
    ],
  },
];

// Helper: get all lesson nodes flattened for a unit
export const getUnitLessons = (unit: Unit): LessonNode[] =>
  unit.quests.flatMap((q) => q.lessons);

// Helper: find playable lesson data by ID
export const getPlayableLesson = (id: string): AnyLesson | undefined =>
  PLAYABLE_LESSONS.find((l) => l.id === id);

// Helper: get unit progress
export const getUnitProgress = (unit: Unit) => {
  const lessons = getUnitLessons(unit);
  const completed = lessons.filter((l) => l.status === "completed").length;
  return { completed, total: lessons.length, percent: Math.round((completed / lessons.length) * 100) };
};
