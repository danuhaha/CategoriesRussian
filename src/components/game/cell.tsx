'use client';

import { ANIMATION_GUESS_DURATION } from 'config';

import s from './cell.module.scss';
import cx from 'classnames';

interface CellProps {
  readonly selected: boolean;
  readonly content: string;
  readonly onClick: () => void;
  readonly animateGuessDelay: number;
  readonly animateGuess: boolean;
  readonly animateWrongGuess: boolean;
}

export default function Cell(props: CellProps) {
  const { selected, content, onClick, animateGuess, animateWrongGuess, animateGuessDelay } = props;

  const bgColor = selected ? 'bg-stone-500' : 'bg-stone-200';
  const textColor = selected ? 'text-stone-100' : 'text-black';

  const guessAnimation = cx({ [s.bounceAnimation]: animateGuess && selected });
  const wrongGuessAnimation = selected && animateWrongGuess ? 'animate-horizontal-shake' : '';

  // Count characters in the word
  const charCount = content.length;
  let size = 'text-sm xxs:text-sm xs:text-sm md:text-lg';

  if (charCount > 5 && charCount < 8) {
    size = 'text-xs xxs:text-sm xs:text-sm md:text-lg';
  }
  if (charCount === 8) {
    size = 'text-xxs xxs:text-xs xs:text-sm md:text-lg';
  }
  if (charCount > 8 && charCount < 11) {
    size = 'text-xxxs xxs:text-xxs xs:text-xs md:text-lg';
  }
  if (charCount >= 11) {
    size = 'text-xxxs xxs:text-xxxs xs:text-xxs md:text-base xl:text-lg';
  }

  return (
    <button
      className={`${bgColor} py-6 rounded-md break-all px-1 transition ease-in-out min-h-[5rem] ${guessAnimation} ${wrongGuessAnimation}`}
      style={{
        animationDelay: animateGuess ? `${animateGuessDelay}s` : undefined,
        animationDuration: animateGuess ? `${ANIMATION_GUESS_DURATION}s` : undefined,
      }}
      onClick={onClick}
    >
      <h2 className={`${textColor} ${size} text-center font-bold`}>{content.toUpperCase()}</h2>
    </button>
  );
}
