import { type Category, GameStatus, type Word } from 'types';
import Cell from './cell';
import OpenedCategory from './opened-category';
import { ANIMATION_GUESS_DELAY } from 'config';
import CellSkeleton from './cell-skeleton';

interface GridProps {
  readonly status: GameStatus;
  readonly words: Word[];
  readonly selectedWords: Word[];
  readonly onCellClick: (word: Word) => void;
  readonly shownCategories: Category[];
  readonly guessAnimationState: boolean;
  readonly wrongGuessAnimationState: boolean;
}

export default function Grid(props: GridProps) {
  const { status, words, selectedWords, onCellClick, shownCategories, guessAnimationState, wrongGuessAnimationState } = props;

  return (
    <div className='grid grid-cols-4 gap-2 w-full'>
      {status === GameStatus.Error && <div className='text-red-500 font-bold text-center col-span-4 py-16'>Произошла ошибка. Попробуйте еще раз.</div>}
      {status === GameStatus.Loading && Array.from({ length: 16 }).map((_, index) => <CellSkeleton key={index} />)}
      {shownCategories.map((category) => (
        <OpenedCategory
          key={category.categoryTitle}
          category={category}
        />
      ))}
      {words.map((item) => {
        const isSelected = selectedWords.includes(item);
        const selectedIndex = selectedWords.indexOf(item); // Find its position in the selectedWords array
        const animateGuessDelay = selectedIndex * ANIMATION_GUESS_DELAY; // Ensure sequential delay based on actual selected order

        return (
          <Cell
            key={item.word}
            content={item.word}
            selected={isSelected}
            onClick={() => onCellClick(item)}
            animateGuess={guessAnimationState}
            animateGuessDelay={animateGuessDelay}
            animateWrongGuess={wrongGuessAnimationState}
          />
        );
      })}
    </div>
  );
}
