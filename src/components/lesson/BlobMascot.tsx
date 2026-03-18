import blobBlue from "@/assets/blob-blue.png";
import blobGreen from "@/assets/blob-green.png";
import blobPurple from "@/assets/blob-purple.png";
import blobOrange from "@/assets/blob-orange.png";
import blobRed from "@/assets/blob-red.png";
import type { LessonType } from "@/data/lessons";

const BLOB_MAP: Record<string, string> = {
  character_read: blobBlue,
  listen_and_echo: blobGreen,
  emotion_difference: blobPurple,
  pace_difference: blobOrange,
  tongue_twister: blobRed,
};

interface Props {
  lessonType: LessonType;
  size?: number;
  className?: string;
}

const BlobMascot = ({ lessonType, size = 64, className = "" }: Props) => {
  const src = BLOB_MAP[lessonType] || blobBlue;
  return (
    <img
      src={src}
      alt="Lesson mascot"
      className={`object-contain drop-shadow-lg ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default BlobMascot;
