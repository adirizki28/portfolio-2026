import { useEffect, useState } from 'react';

interface TextTypeProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
  cursorClassName?: string;
}

export default function TextType({
  texts,
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseDuration = 1800,
  loop = true,
  showCursor = true,
  className = '',
  cursorClassName = '',
}: TextTypeProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentFullText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Proses mengetik maju
          if (displayedText.length < currentFullText.length) {
            setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
          } else {
            // Selesai mengetik 1 kalimat -> jeda sebelum menghapus
            if (!loop && textIndex === texts.length - 1) return;
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Proses menghapus mundur
          if (displayedText.length > 0) {
            setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {showCursor && (
        <span className={`font-normal ${cursorClassName}`}>
        </span>
      )}
    </span>
  );
}